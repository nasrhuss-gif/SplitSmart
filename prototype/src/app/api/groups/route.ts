import { NextResponse } from "next/server";
import { db } from "../../db";

const error = (message: string) => NextResponse.json({ message }, { status: 400 });
const validId = (id: unknown): id is number =>
  typeof id === "number" && Number.isInteger(id) && id > 0 && id <= 2147483647;

export async function GET() {
  const groups = await db.group.findMany({
    orderBy: { id: "asc" },
    include: {
      members: { orderBy: { id: "asc" } },
      expenses: { orderBy: { id: "desc" }, include: { shares: true } },
    },
  });

  return NextResponse.json(groups);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return error("Enter valid form data.");

  if (body.action === "group" || body.action === "member") {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name || name.length > 80) return error("Enter a name between 1 and 80 characters.");

    if (body.action === "group") {
      const group = await db.group.create({ data: { name } });
      return NextResponse.json({ groupId: group.id }, { status: 201 });
    }

    const groupId = body.groupId;
    if (!validId(groupId) || !(await db.group.findUnique({ where: { id: groupId } }))) {
      return error("Choose an existing group.");
    }

    await db.member.create({ data: { name, groupId } });
    return NextResponse.json({ groupId }, { status: 201 });
  }

  if (body.action !== "expense") return error("Choose a valid action.");
  const { groupId, payerId, participantIds } = body;
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const amount = typeof body.amount === "string" ? body.amount.trim() : "";
  if (!description || description.length > 120) return error("Enter an expense description up to 120 characters.");
  if (!/^\d{1,8}(?:\.\d{1,2})?$/.test(amount)) return error("Enter a dollar amount with up to two decimal places.");

  const [dollars, cents = ""] = amount.split(".");
  const amountCents = Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
  if (amountCents < 1 || amountCents > 2147483647) return error("Enter an amount from $0.01 to $21,474,836.47.");
  if (!validId(groupId) || !validId(payerId) || !Array.isArray(participantIds) ||
      !participantIds.length || !participantIds.every(validId)) {
    return error("Choose a payer and at least one participant from this group.");
  }

  const participants = [...new Set<number>(participantIds)].sort((a, b) => a - b);
  const requiredMembers = [...new Set([payerId, ...participants])];
  const count = await db.member.count({ where: { groupId, id: { in: requiredMembers } } });
  if (count !== requiredMembers.length) return error("The payer and all participants must belong to this group.");

  const base = Math.floor(amountCents / participants.length);
  const remainder = amountCents % participants.length;
  await db.expense.create({
    data: {
      description, amountCents, groupId, payerId,
      shares: {
        create: participants.map((memberId, index) => ({
          memberId,
          amountCents: base + Number(index < remainder),
        })),
      },
    },
  });

  return NextResponse.json({ groupId }, { status: 201 });
}

"use client";

import { useEffect, useState, type FormEvent } from "react";

type Member = { id: number; name: string };
type Expense = {
  id: number;
  description: string;
  amountCents: number;
  payerId: number;
  createdAt: string;
  shares: { memberId: number; amountCents: number }[];
};
type Group = { id: number; name: string; members: Member[]; expenses: Expense[] };

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const money = (cents: number) => dollars.format(cents / 100);
const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

async function loadGroups(): Promise<Group[]> {
  const response = await fetch("/api/groups", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load groups. Refresh to try again.");
  return response.json();
}

export default function Home() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    loadGroups()
      .then((data) => {
        if (!active) return;
        const requested = Number(new URLSearchParams(location.search).get("group"));
        setGroups(data);
        setSelected(data.find((group) => group.id === requested)?.id ?? data[0]?.id ?? null);
      })
      .catch((failure: Error) => { if (active) setError(failure.message); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  const group = groups.find(({ id }) => id === selected);
  const members = group?.members ?? [];
  const expenses = group?.expenses ?? [];
  const names = new Map(members.map(({ id, name }) => [id, name]));
  const balances = new Map(members.map(({ id }) => [id, 0]));
  let total = 0;

  for (const expense of expenses) {
    total += expense.amountCents;
    balances.set(expense.payerId, (balances.get(expense.payerId) ?? 0) + expense.amountCents);
    for (const share of expense.shares) {
      balances.set(share.memberId, (balances.get(share.memberId) ?? 0) - share.amountCents);
    }
  }

  function selectGroup(id: number) {
    setSelected(id);
    history.replaceState(null, "", "?group=" + id);
  }

  async function save(event: FormEvent<HTMLFormElement>, action: "group" | "member" | "expense") {
    event.preventDefault();
    if (busy) return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = action === "expense"
      ? {
          action, groupId: selected, description: values.get("description"),
          amount: values.get("amount"), payerId: Number(values.get("payer")),
          participantIds: values.getAll("participants").map(Number),
        }
      : { action, groupId: selected, name: values.get("name") };

    setError("");
    setNotice("");
    setBusy(true);

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not save. Try again.");

      form.reset();
      try {
        setGroups(await loadGroups());
        selectGroup(result.groupId);
        setNotice({ group: "Group created.", member: "Member added.", expense: "Expense recorded." }[action]);
      } catch {
        setError("Saved successfully. Refresh to see the latest data.");
      }
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Could not save. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <header className="topbar">
        <div className="brand"><span aria-hidden="true">⇄</span>SplitSmart</div>
      </header>
      <main className="workspace">
        <aside className="sidebar">
          <h2>Groups</h2>
          <nav aria-label="Groups">
            {groups.map((item) => (
              <button key={item.id} className="group-button" type="button"
                disabled={busy} aria-current={selected === item.id ? "true" : undefined}
                onClick={() => { selectGroup(item.id); setNotice(""); setError(""); }}>
                {item.name}
              </button>
            ))}
          </nav>
          <form onSubmit={(event) => save(event, "group")} className="create-group">
            <label htmlFor="group-name">New group</label>
            <input id="group-name" name="name" placeholder="e.g. Weekend trip" maxLength={80} required />
            <button disabled={busy || loading}>Create group</button>
          </form>
        </aside>

        <div className="content">
          {error && <p className="message error" role="alert">{error}</p>}
          {notice && <p className="message" role="status">{notice}</p>}
          {busy && <p className="message" role="status">Saving…</p>}
          {loading && <p role="status">Loading groups…</p>}

          {!group && !loading && <section className="empty">
            <h1>Your shared expenses</h1>
            <p>Create a group to add members and start splitting expenses.</p>
          </section>}

          {group && <div key={group.id}>
            <section className="hero">
              <div><p>Group overview</p><h1>{group.name}</h1></div>
              <div className="total"><span>Total expenses</span><strong>{money(total)}</strong></div>
            </section>

            <div className="columns">
              <section className="card">
                <h2>Members and balances</h2>
                <p className="muted">Positive balances are owed to members. Negative balances are owed by members.</p>
                {members.length === 0 && <p className="muted">Add your first group member below.</p>}
                <ul className="member-list">
                  {members.map(({ id, name }) => {
                    const balance = balances.get(id) ?? 0;
                    return <li key={id}>
                      <span>{name}</span>
                      <strong className={balance < 0 ? "owes" : balance > 0 ? "receives" : ""}>
                        {balance > 0 ? "+" : ""}{money(balance)}
                      </strong>
                    </li>;
                  })}
                </ul>
                <form className="add-member" onSubmit={(event) => save(event, "member")}>
                  <label htmlFor="member-name">New member</label>
                  <input id="member-name" name="name" placeholder="e.g. Alice" required maxLength={80} />
                  <button disabled={busy}>Add member</button>
                </form>
              </section>

              <section className="card">
                <h2>Record an expense</h2>
                {members.length === 0 ? <p className="muted">Add a member before recording an expense.</p> :
                  <form className="expense-form" onSubmit={(event) => save(event, "expense")}>
                    <label>Description<input name="description" placeholder="e.g. Dinner" required maxLength={120} /></label>
                    <div className="fields">
                      <label>Amount (USD)<input name="amount" placeholder="0.00" inputMode="decimal" required /></label>
                      <label>Paid by<select name="payer" required defaultValue="">
                        <option value="" disabled>Select payer</option>
                        {members.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                      </select></label>
                    </div>
                    <fieldset>
                      <legend>Split equally among</legend>
                      <div className="participants">
                        {members.map(({ id, name }) => <label key={id}>
                          <input type="checkbox" name="participants" value={id} defaultChecked />{name}
                        </label>)}
                      </div>
                    </fieldset>
                    <button disabled={busy}>Record expense</button>
                  </form>}
              </section>
            </div>

            <section className="card history">
              <h2>Expense history</h2>
              {expenses.length === 0 && <p className="muted">No expenses recorded yet.</p>}
              <ul className="expense-list">
                {expenses.map((expense) => <li key={expense.id}>
                  <div>
                    <h3>{expense.description}</h3>
                    <p className="muted">{date.format(new Date(expense.createdAt))} · Paid by {names.get(expense.payerId)}</p>
                    <details>
                      <summary>View shares</summary>
                      <ul>
                        {expense.shares.map((share) => <li key={share.memberId}>
                          <span>{names.get(share.memberId)}</span><span>{money(share.amountCents)}</span>
                        </li>)}
                      </ul>
                    </details>
                  </div>
                  <strong>{money(expense.amountCents)}</strong>
                </li>)}
              </ul>
            </section>
          </div>}
        </div>
      </main>
    </>
  );
}

# SplitSmart Lab 9

Create groups, add members, and record expenses with an equal split among selected participants. The group shows each member’s balance, the expense history, and the share charged to each participant. When a split has leftover cents, participants with the lowest member IDs receive one extra cent each.

## Run the prototype

From the repository root, run these commands in a Codespace or local terminal with Node.js and npm.

```sh
cd prototype
npm ci
export DATABASE_URL="file:$PWD/prisma/dev.db"
npx prisma db push
npm run dev
```

In a Codespace with dependencies already installed, skip `npm ci`. If your environment already uses a SQLite database, set `DATABASE_URL` to its existing path before running `prisma db push`. The schema changes add the SplitSmart tables and retain the Lab 8 environment check table.

Open the forwarded port 3000 in the Codespace, or visit http://localhost:3000 locally. Start by creating a group and adding its members.

Run `npm run lint` and `npm run build` from `prototype/` with the same database configuration.

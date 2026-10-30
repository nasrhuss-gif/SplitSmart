# Feature Specification: SplitSmart Expense Sharing

**Feature Directory**: `specs/001-splitsmart`
**Created / Clarified / Reviewed**: 2026-10-29
**Status**: Approved lab documentation baseline; D1–D23 confirmed and incorporated. Implementation is not claimed.
**Authority**: [Original customer request](../../UserRequirement.md)
**Engineering constraints**: [Constitution](../../.specify/memory/constitution.md)
**Decision record**: [D1–D23](clarification-decisions.md)

Customer capabilities and requested platforms are preserved separately from subsequent lab decisions. Priority labels organize review; delivery scope is governed by D22. No Java code is part of this documentation phase.

## Clarifications

### Session 2026-10-29
- The user confirmed the initial expense, money, membership, notification, approval, and payment rules D1–D9.
- Q: Which sign-in method? → A: Email/password with email verification and password recovery (D10).
- Q: Approve the complete remaining-decisions proposal D11–D23? → A: “Approve D11–D23.”
- Q: After reviewing the constitution, specification, and checklist, approve them subject to incorporating the confirmed decisions? → A: “I reviewed and approve them.”
- The approved D11–D23 policies are integrated below. UserRequirement.md is unchanged.

## User Scenarios & Testing

### Actors
- Account holder: registers, verifies email, signs in, recovers access, and reads authorized information.
- Group member/participant: shares expenses and receives in-app notifications.
- Group manager: manages membership and reviews another creator's expenses/reversals.
- Expense creator: submits an expense and explicitly selects its payer and participants.
- Payer: the one member who funded the full expense; may be different from creator or excluded from participants.
- Debtor/payment recorder: records a payment made outside SplitSmart.
- Payment recipient: confirms receipt; both parties confirm any reversal.

### User Story 1 — Accounts and groups (P1)
**Scenario**: A person registers, verifies email, signs in, and creates a group or private pair.
**Independent test**: Exercise registration/verification/recovery, permitted group access, and denied unrelated-group access.

1. Given an unverified email or unauthenticated session, when account access is requested, then deny access.
2. Given a valid single-use verification/reset link, when consumed within 30 minutes, then perform its intended action once; reject expired or reused links.
3. Given a manager adding/removing a registered member, when removal is requested with a nonzero balance or pending item, then reject removal and preserve history.
4. Given two individuals sharing directly, when a private pair is created, then both are members/managers and the same expense/approval/payment rules apply.

### User Story 2 — Expense creation and splitting (P1)
**Scenario**: A member submits a USD expense, optionally with a receipt, choosing payer and participants.
**Independent test**: Compare recorded fields and equal/percentage allocations against D11–D15/D20.

1. Given current members A, B, and C, when A creates an expense paid by B for participants A and C, then accept the roles and do not charge B a participant share.
2. Given USD 10.00 and equal participants with ascending immutable IDs A, B, C, when allocated, then shares are 3.34, 3.33, 3.33 and total 10.00.
3. Given USD 0.05 split 50/50 between IDs A and B, when allocated, then shares are 0.03 and 0.02 under the floor/residual rule.
4. Given zero/negative/malformed amount, more than two amount decimals, invalid date, blank/overlength description, or percentages not exactly totaling 100.00%, when submitted, then reject with a field-specific message and no posting.
5. Given no receipt or a valid JPEG/PNG up to 5 MiB, when submitted, then accept; reject unsupported/oversized/mismatched-content files.

### User Story 3 — Notification and review (P1)
**Scenario**: Submission creates notices; a different manager approves before financial posting.
**Independent test**: Check recipients, persistent read state, review transitions, and one posting per operation ID.

1. Given a group expense submitted by A, when submission succeeds, then every other current member receives one unread notice atomically with the pending expense.
2. Given a pending/rejected expense, when balances are read, then it has no financial effect.
3. Given the creator attempting self-approval, when approval is requested, then reject. Without another manager the expense stays pending.
4. Given another manager's valid approval, when the same operation is submitted twice, then post once.
5. Given an approved expense needing correction, when another manager approves its reversal, then undo its ledger entries once, preserve the original, and require ordinary approval for any replacement expense.

### User Story 4 — Balances and payments (P1)
**Scenario**: A debtor records an actual external payment and the recipient confirms it.
**Independent test**: Reconcile pairwise balances from the approved ledger, confirmed payments, and reversals.

1. Given A owes B USD 20.00, when A records USD 5.00, then balance stays 20.00 until B confirms; after confirmation it is 15.00.
2. Given debt 20.00, when a payment of 25.00 is submitted, then reject. Recheck at confirmation if intervening activity reduces the debt.
3. Given a duplicate confirmation operation ID, when retried, then the financial effect occurs once.
4. Given a confirmed payment reversal requested by one party, when the other has not confirmed, then do not reverse; after both confirm, reverse once and retain history.

### User Story 5 — Reports (P2)
**Scenario**: A user views authorized summaries, filters dates, and exports CSV.
**Independent test**: Compare report entries/totals with authorized source records at the stated dates and statuses.

1. Given inclusive start/end date filters, when expenses are reported, then include records whose entered calendar date is within both boundaries.
2. Given payment filters, when reporting confirmed payments, then use the confirmation date in UTC.
3. Given pending/rejected records, when financial totals are calculated, then exclude them; optional separate status displays must not change totals.
4. Given current balances, when displayed or exported, then label them current rather than as-of the report date range.

### User Story 6 — Delivery platforms (P1 full product)
**Scenario**: Use the desktop lab MVP now as the planned first increment; retain primary web and Android/iOS delivery for subsequent increments.
**Independent test**: Verify the same core workflows on the D22 matrix when each platform is implemented. Documentation approval does not pass platform execution tests.

1. Given a Swing implementation, when assessing full customer platform compliance, then it cannot by itself satisfy web, Android, or iOS requirements.
2. Given later web/mobile builds, when platform acceptance runs, then verify all core functional capabilities on the D22 supported matrix.

### Edge cases
- Allocation residual cents, exact percentage totals, empty/malformed fields, and unsupported receipts: D13–D15/D20.
- Membership removal with debts/pending records and former-member history: D12/D16.
- Self-approval, no eligible manager, rejection, edits, cancellation, resubmission, and approved reversals: D18.
- Duplicate submission/delivery/confirmation, concurrent debt changes, partial payments, overpayment, and reversals: D17/D19.
- Expired/reused verification or reset links and attempts to access unrelated groups: D16.

## Requirements

### Functional requirements and source inventory
Every row retains a customer capability. The decision column traces clarified behavior to approved lab decisions; it does not rewrite the original request.

| ID | Customer capability | Testable requirement / acceptance criterion | Confirmed decisions |
|---|---|---|---|
| FR-001 | User accounts and login | Email/password login, verified email before account access, and password recovery. Verification/reset links are single use and expire after 30 minutes; reset responses do not reveal whether an email exists. Enforce D16 access boundaries. | D6, D10, D16 |
| FR-002 | Group management | Authenticated users create groups and become managers. Managers manage registered membership and additional managers. Removal requires zero group balances and no pending expense/payment involving the member; preserve history. Direct individual sharing uses a private two-person group with both users as managers. | D2, D12 |
| FR-003 | Expense creation | Store positive USD amount with at most two decimal places, valid YYYY-MM-DD calendar date, nonblank description up to 500 characters, split manner, one payer, and selected participants. Creator/payer may differ; both are current group members. Reject invalid fields without posting. | D1, D4, D11, D14 |
| FR-004 | Equal split | Divide the amount equally using BigDecimal, round each share down to whole cents, then assign residual cents one at a time by ascending immutable user ID until the shares equal the total. USD only. | D3, D13 |
| FR-005 | Percentage split | Each selected participant has a percentage greater than zero and at most 100, with at most two decimal places. The exact sum is 100.00%; otherwise reject without normalization. Floor each exact share to cents and distribute residual cents by D13. | D5, D13, D15 |
| FR-006 | Optional receipt image | Allow no receipt or one JPEG/PNG image of at most 5 MiB. Validate actual content and extension. Restrict access to associated expense/group permissions and retain history for the account/group lifetime in the lab. | D20 |
| FR-007 | Involved users | Require selected expense participants to be current group members. Explicitly select the single payer, who is a current member and may be included in or excluded from participants. Creator and payer may differ. | D1, D2, D11 |
| FR-008 | Notifications | On submission, atomically persist pending expense and unread in-app notifications for every other current group member. Repeated delivery with the same notification ID creates no duplicate; read state persists. No email/push requirement for the lab. | D7, D17 |
| FR-009 | Approval workflow | Require one manager other than the creator to approve before posting, exactly once. Without an eligible reviewer, remain pending. Creator may edit/cancel pending expenses or revise/resubmit rejected expenses. Approved expenses require another-manager-reviewed reversal and replacement, with history retained. | D8, D14, D18 |
| FR-010 | Pairwise balances | Calculate each pairwise debt from approved expense allocations, confirmed payments, and confirmed reversals. Pending/rejected/canceled items do not post. Posting/reversal conserves value and each operation ID has one financial effect. Preserve historical records. | D3, D8, D13, D18, D19 |
| FR-011 | Settlement payment records | Debtor records a positive pairwise payment; recipient confirms before posting. Permit partial payment, check against debt at submission and confirmation, and reject overpayment. Recorder can cancel pending payment. Confirmed payment reversal requires both parties. Repeated operation IDs do not double-post. Recording does not transfer funds. | D9, D19 |
| FR-012 | Reporting and summaries | Summarize authorized expenses, current balances, and payments. Financial totals include approved expenses and confirmed payments; pending/rejected items may be separately displayed by status and never enter financial totals. Label balances as current, not historical as-of values. | D16, D21 |
| FR-013 | Custom reports (tentative in original request) | Confirmed lab subset: inclusive optional start/end calendar-date filters and CSV export. Expense filtering uses entered expense date; confirmed-payment filtering uses confirmation date in UTC. Defer arbitrary report builders while retaining them in the full feature inventory. | D21 |
| FR-014 | Primarily web-based product | Retain primary web delivery for the later full product, with the same core functional capabilities as the desktop MVP and latest two stable Chrome/Edge/Firefox/Safari versions at release acceptance. Swing alone does not fulfill this platform requirement. | D22 |
| FR-015 | Android application | Retain Android delivery for a later increment with the same core functional capabilities and Android 12+ support. Verify on the agreed supported matrix before claiming delivery. | D22 |
| FR-016 | iOS application | Retain iOS delivery for a later increment with the same core functional capabilities and iOS 17+ support. Verify on the agreed supported matrix before claiming delivery. | D22 |

### Non-functional requirements
| ID | Origin | Requirement / verification |
|---|---|---|
| NFR-001 | Lab engineering | Java 21 and Maven, declared release/dependency versions; verify the future Maven build under JDK 21. |
| NFR-002 | Lab engineering | Swing presentation delegates to business logic without Swing dependencies; future business tests run without GUI startup. |
| NFR-003 | Lab engineering / D13 | BigDecimal for money/percentages; test floor/residual allocation, conservation, approval exclusion, and exactly-one financial effect using JUnit 5. |
| NFR-004 | Lab engineering | Stable requirement IDs and design/test traceability; reviewed, requirement-linked PlantUML diagrams when design starts. |
| NFR-005 | D16 | Salted password hashes, secure transport for web/mobile, persistent authorized records, no sensitive credentials in logs/source; verify allowed/denied access and link expiry/reuse cases. |
| NFR-006 | D23 | On an 8 GB RAM reference machine with 100 users, 10 groups, 10,000 expenses, 95% of local submission/balance/report operations finish within 2 seconds over 100 representative requests per operation. Keyboard-reachable controls, accessible labels, and non-color-only errors. Daily backup, demonstrated restore, RPO ≤24 hours and RTO ≤1 hour. Desktop has no hosted SLA; later web target is 99.5% monthly availability. These are acceptance targets, not results. |
| NFR-007 | Lab engineering | Record actual human review identity, date, findings, and disposition; maintain distinction between documentation approval and software acceptance. |

### Approved Java Swing MVP and retained full-product scope (D22)
The approved lab MVP includes FR-001–FR-012 plus the date-filter/CSV subset of FR-013: real accounts, groups/private pairs, both split methods, optional receipts, in-app notifications, review/reversals, pairwise balances, confirmed settlements, and reports. Arbitrary custom report builders remain in the inventory for later consideration.

Desktop matrix: Windows 11, macOS 14+, Ubuntu 24.04 LTS with Java 21. Primary web, Android, and iOS remain full-product requirements for later increments, with core functional parity. Web supports the latest two stable Chrome/Edge/Firefox/Safari releases at acceptance; Android supports 12+ and iOS 17+. These are approved scope/support targets, not implemented or verified builds.

### Key entities
Account; group/private pair and membership/manager roles; expense with one payer and participant allocations; optional receipt; approval/rejection/revision/reversal record; persistent in-app notification/read state; external-payment record and recipient confirmation; immutable operation ID; authorized report/CSV. Preserve original ledger and history when reversing records.

## Success criteria
- **SC-001**: Preserve all FR-001–FR-016 customer capabilities with approved decision traceability; original customer wording remains unchanged.
- **SC-002**: Every allocation test totals the exact expense amount at USD 0.01 precision and repeats deterministically for the same immutable participant IDs.
- **SC-003**: Unapproved/rejected/canceled expenses produce zero postings; valid approvals and approved reversals post once per operation ID.
- **SC-004**: Pairwise balances reconcile to confirmed ledger/payment history, including partial settlement, overpayment rejection, and both-party-approved reversals.
- **SC-005**: Reports/CSV match authorized records, inclusive date boundaries, UTC payment confirmation dates, and approved/confirmed financial totals.
- **SC-006**: Evaluate each implemented platform against D22; desktop alone cannot pass the retained full-product platform scope.
- **SC-007**: Execute D23 performance/accessibility/backup tests before claiming implementation acceptance. No implementation test results are claimed in this lab.

## Assumptions and limits
USD-only, single-payer, membership, authentication, notification, review, settlement, receipts, reports, and support/quality rules are explicit decisions D1–D23, not silent assumptions. The original custom-report request was tentative; the user subsequently approved date filters and CSV under D21. Negative-refund entry is outside the lab MVP; reviewed correction/reversal is supported. Production retention policy, detailed security implementation, and future arbitrary-report design are later engineering/product work, not unresolved lab questions. No Java implementation is generated here.

## Question resolution inventory
All recorded lab questions are resolved for this documentation baseline. Preserve the IDs for traceability.

| Question | Resolution | Affected requirements |
|---|---|---|
| Q1: creator / payer | D1, D11 | FR-003, FR-007, FR-010 |
| Q2: membership / individual sharing | D2, D12 | FR-002, FR-007, FR-010 |
| Q3: currency / rounding | D3, D13 | FR-003–FR-005, FR-010–FR-011 |
| Q4: invalid input / corrections | D4, D14 | FR-003, FR-009 |
| Q5: percentage precision / totals | D5, D13, D15 | FR-005 |
| Q6: authentication / access | D6, D10, D16 | FR-001–FR-002, FR-012 |
| Q7: notification behavior | D7, D17 | FR-008 |
| Q8: approval / edits / reversal | D8, D14, D18 | FR-009–FR-010 |
| Q9: settlement confirmation / reversal / duplication | D9, D19 | FR-010–FR-011 |
| Q10: receipt limits / access / retention | D20 | FR-006 |
| Q11: report scope / dates / exports | D21 | FR-012–FR-013 |
| Q12: MVP / platform scope | D22 | FR-001–FR-016 |
| Q13: measurable quality targets | D23 | NFR-006 |

## Decision log and review
D1–D23 are confirmed in clarification-decisions.md. The user of this chat explicitly approved D11–D23 and confirmed review/approval of the constitution, specification, and checklist subject to incorporating them, on 2026-10-29. Those changes are now incorporated. Review findings addressed: creator/payer ambiguity, monetary rounding, membership, self-approval and workflow transitions, settlement confirmation/reversal, receipt/report scope, MVP/platform distinction, and measurable quality targets. Disposition: approved lab documentation baseline. No claim of software implementation or course submission.

## Acceptance-case inventory

- **AC-D1**: Exactly one payer; the payer may also be a participant. Multiple payers are rejected.

- **AC-D2**: A participant outside the current group is rejected; current members may be selected.

- **AC-D3**: USD 10.00 split equally among ascending IDs A/B/C yields 3.34/3.33/3.33.

- **AC-D4**: Reject zero, negative, and malformed amounts without financial posting.

- **AC-D5**: USD 10.00 split 60/40 yields 6.00/4.00; reject totals of 90% and 110%.

- **AC-D6**: Unauthenticated access and mock identity selection cannot access account information; use real login under D10/D16.

- **AC-D7**: Submission triggers unread in-app notifications under D17.

- **AC-D8**: No posting before one eligible other-manager approval; retrying the same approval operation posts once.

- **AC-D9**: A owes B 20.00; a recorded 5.00 payment leaves 20.00 pending and 15.00 after B confirms. Reject 25.00 against the original 20.00 debt.

- **AC-D10**: Exercise email/password sign-in, email verification, and password recovery under D16.

- **AC-D11**: A creates an expense funded by B for participants A/C; B has no participant share and is recorded as the single payer.

- **AC-D12**: A manager cannot remove a member with nonzero group balances or pending items. After eligibility, removal preserves historical records. A private pair has both users as managers.

- **AC-D13**: USD 0.05 split 50/50 with ascending IDs A/B yields 0.03/0.02; repeated allocation is identical. Reject 0.001 USD.

- **AC-D14**: Reject blank/501-character descriptions, invalid dates, and missing required fields; accept valid future dates. Correct approved expenses by reviewed reversal and approved replacement, never overwrite.

- **AC-D15**: Reject zero/negative participant percentages, more than two decimal places, or an exact sum other than 100.00; do not normalize.

- **AC-D16**: Reject expired or reused 30-minute links and unverified account access. Unknown/known reset requests receive the same generic response. Deny unrelated-group access; preserve authorized own-history access.

- **AC-D17**: One notification per other current member; duplicate notification ID produces no duplicate; marking read survives reopening. A failed atomic submission leaves neither expense nor notice records.

- **AC-D18**: Reject self-approval; no eligible manager means pending. Pending edits/rejected resubmissions require approval; approved reversal posts inverse entries once and retains history.

- **AC-D19**: Recipient confirmation is required to post a payment; recheck current debt at confirmation. One-party reversal approval does not reverse a confirmed payment; both-party approval reverses once. Duplicate operation IDs have one effect.

- **AC-D20**: Accept one valid JPEG/PNG of exactly 5 MiB and no-receipt submission; reject larger or mismatched-content files and unauthorized access.

- **AC-D21**: Include both expense date endpoints, filter payments by UTC confirmation date, exclude pending/rejected records from financial totals, label balances current, and verify CSV matches displayed authorized records.

- **AC-D22**: Apply D22 desktop matrix to a future Swing MVP, and retain web/Android/iOS core-parity acceptance separately. Do not report desktop acceptance as mobile/web completion.

- **AC-D23**: Measure D23 workload/latency, keyboard/label/error accessibility, daily backup and timed restore. Record measured results when implemented; no benchmark or availability pass is asserted by this document.

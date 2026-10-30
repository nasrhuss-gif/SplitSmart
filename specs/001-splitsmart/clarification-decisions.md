# Confirmed lab clarification decisions

Confirmed by the user in this chat on 2026-10-29 in response to the proposed rules. These are subsequent lab decisions, not text from the original customer request. UserRequirement.md remains unchanged.

| Decision | Confirmed behavior | Traceability |
|---|---|---|
| D1 | One payer per expense. The payer may also be a participant. | Q1; FR-003, FR-007, FR-010 |
| D2 | Expense participants must be current group members. | Q2; FR-002, FR-007 |
| D3 | USD with two decimal places. Allocate leftover cents by stable participant order. | Q3; FR-004–005, FR-010–011 |
| D4 | Reject nonpositive or malformed amounts. | Q4; FR-003 |
| D5 | Reject percentage inputs whose total is not 100%. | Q5; FR-005 |
| D6 | Real user login is required. | Q6; FR-001 |
| D7 | Send in-app notifications when expenses are submitted. | Q7; FR-008 |
| D8 | One group-manager approval is required before an expense posts to balances. | Q8; FR-009–010 |
| D9 | Record pairwise settlement payments. Partial payments are allowed; reject overpayments. | Q9; FR-010–011 |
| D10 | Use email/password sign-in with email verification and password recovery. | Q6; FR-001 |

## Remaining details
Confirmation of the rules above does not resolve creator/payer identity restrictions, the exact stable ordering key or rounding mode, group-management permissions/history on removal, data persistence protections and shared-data permissions, notification recipients/retry behavior, reviewer self-approval/rejection/edit rules, payment confirmation/reversals/idempotency, receipt limits, report filters, platform versions, or quality targets. Ask about these details before implementing affected behavior. The proposed Swing MVP/deferral list is not approved by this confirmation.

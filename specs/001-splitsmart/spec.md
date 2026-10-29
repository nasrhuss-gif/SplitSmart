# SplitSmart feature specification

Status: DRAFT — clarification and human review pending
Date: 2026-10-29
Authority: ../../UserRequirement.md
Engineering constraints: ../../.specify/memory/constitution.md

## Actors
- Account holder: logs in, views their expenses and balances, records shared expenses and payments, and accesses reports.
- Group member: participates in group expenses and receives notifications.
- Group manager: creates and manages groups; exact privileges are unresolved (Q2).
- Expense reviewer: reviews expenses before financial posting; eligibility and approval levels are unresolved (Q8).

These role names describe capabilities, not confirmed separate account types. Payer, participant, and creator may be different people; their relationship remains unresolved (Q1).

## Customer requirements and acceptance criteria
All rows remain in the full product inventory regardless of MVP disposition. “Shall” formalizes the source capability; unresolved details are not approved behavior.

| ID | Customer capability | Observable acceptance criterion | Open questions |
|---|---|---|---|
| FR-001 | Individual user accounts and login | Given two registered users, each can log into their own account and access their own expense and balance information; authentication and shared-data visibility follow the confirmed access policy. | Q6 |
| FR-002 | Create and manage groups | A user can create a group and manage its membership according to confirmed permissions; group expenses and balances can be viewed in that group. | Q2 |
| FR-003 | Create an expense | A submitted expense retains its amount, date, description, and selected split manner and displays those values on retrieval. Invalid input is handled according to Q4. | Q1, Q3, Q4 |
| FR-004 | Equal splitting | For confirmed participants and a valid amount, an equal split produces shares whose sum exactly equals the expense amount, using the confirmed residual rule. | Q1, Q3 |
| FR-005 | Percentage splitting | For valid confirmed percentage inputs, each participant's allocation follows the entered percentage and approved rounding rule; allocated amounts sum exactly to the expense amount. | Q3, Q5 |
| FR-006 | Optional receipt image | An expense can be created without a receipt and can retain an allowed receipt image when supplied. Allowed formats, limits, and access are defined by Q10. | Q10 |
| FR-007 | Select involved users | The creator can select the involved users; only the confirmed financial parties are used for allocation and resulting balance adjustments. | Q1, Q2 |
| FR-008 | New-expense notifications | When a group member creates an expense, recipients selected by the confirmed policy receive a notification through the confirmed channel at the confirmed workflow stage. | Q7, Q8 |
| FR-009 | Review and approve before balance adjustment | A submitted but unapproved expense does not affect balances. Completion of the confirmed approval process posts its financial effect exactly once. Rejection and revision follow Q8. | Q8 |
| FR-010 | Pairwise balance tracking | For a reviewed example ledger, each user's amount owed to each other user matches the confirmed approved expenses and recorded settlements. Pending/rejected expenses have no balance effect. | Q1, Q3, Q8, Q9 |
| FR-011 | Record settlement payments | A recorded valid payment retains its parties and amount and updates balances once according to the confirmed settlement rules. | Q9 |
| FR-012 | Reports and summaries | Users can obtain summaries of expenses, balances, and payments consistent with the same authorized ledger used for balance tracking. | Q6, Q11 |
| FR-013 | Possible custom reports | Candidate scope: date-range and other report parameters; if confirmed, a filtered report contains exactly the eligible records under the confirmed boundary rules. The source says “possibly”; commitment awaits Q11. | Q11 |
| FR-014 | Primarily web-based product | The agreed core user scenarios can be completed through a web browser on the confirmed browser matrix. | Q12 |
| FR-015 | Android app | An Android application supports the confirmed mobile feature set on the agreed OS versions. | Q12 |
| FR-016 | iOS app | An iOS application supports the confirmed mobile feature set on the agreed OS versions. | Q12 |

## User scenarios
1. **Accounts and groups (FR-001–002):** An account holder logs in, creates a trip group, and manages membership. Verify access and membership behavior against Q2/Q6 once confirmed.
2. **Expense capture (FR-003–007):** A member records an amount, date, description, involved users, an equal or percentage split, and optionally a receipt. The stored record preserves these values; invalid cases follow confirmed validation.
3. **Review and notification (FR-008–009):** A member submits an expense. It has no balance effect until approval. Eligible reviewers act under Q8, and notifications occur under Q7. Repeated approval must not double-post.
4. **Balances and settlement (FR-010–011):** Users inspect pairwise balances, record an actual payment, and verify the resulting balance using the confirmed settlement policy.
5. **Reporting (FR-012–013):** A user views expense, balance, and payment summaries and, if confirmed, applies supported report filters.
6. **Platform access (FR-014–016):** Users complete the agreed scenarios on the web and mobile platforms. A Swing demonstration alone does not pass these requirements.

## Non-functional requirements
| ID | Origin | Requirement and verification |
|---|---|---|
| NFR-001 | Lab engineering | Java 21 and Maven: inspect the eventual build configuration and run the documented Maven build with JDK 21. |
| NFR-002 | Lab engineering | Swing GUI separated from business rules: inspect dependencies and run business-rule tests without GUI startup. |
| NFR-003 | Lab engineering | BigDecimal monetary arithmetic: inspect money paths and verify conservation, approved scale, and deterministic residual allocation using JUnit 5. |
| NFR-004 | Lab engineering | Maintain requirement-to-design/test traceability and reviewed PlantUML diagrams when implementation planning begins. |
| NFR-005 | Derived, pending confirmation | Account access must enforce the confirmed ownership/group permissions; verify with allowed and denied access cases. Authentication mechanism and persistence protections await Q6. |
| NFR-006 | Unspecified customer quality targets | Response-time, capacity, accessibility, availability, retention, backup, and browser/OS support targets require Q12/Q13; no numeric targets are invented. |
| NFR-007 | Lab engineering | Human review must identify reviewer, date, findings, and disposition before documents are accepted. |

## Proposed Java Swing MVP subset — implementation decision, not customer-approved scope
Candidate inclusion: account access (FR-001), basic groups (FR-002), expense fields and both split methods (FR-003–005), participant selection (FR-007), a review workflow (FR-009), pairwise balances (FR-010), payment recording (FR-011), and basic summaries (FR-012).

Proposed deferral: receipt images (FR-006), notifications (FR-008), optional custom reports (FR-013), web (FR-014), Android (FR-015), and iOS (FR-016). These remain customer inventory items, not deleted features. The MVP scope and every simplifying choice require human confirmation. Q1–Q9 block final behavioral acceptance criteria for affected MVP features. Local persistence, mock login, single-review approval, in-app notification, single payer, and a specific currency are not approved defaults.

## Clarification questions — no answers confirmed
| ID | Question | Affected requirements |
|---|---|---|
| Q1 | Is there one payer or multiple payers? Can the payer be excluded from participants? Can creator and payer differ? How are payer contributions recorded? | FR-003–005, FR-007, FR-010 |
| Q2 | Who may create/manage groups or add/remove members? Must all expense parties be current members? What happens to prior debts when membership changes? Are direct non-group expenses supported? | FR-002, FR-007, FR-010 |
| Q3 | Which currencies and decimal scales are supported? Which rounding mode and deterministic residual allocation apply? Are cross-currency expenses allowed? | FR-003–005, FR-010–011 |
| Q4 | How should zero, negative, excessive, missing, or malformed amounts, dates, and descriptions be handled? Are refunds supported? | FR-003 |
| Q5 | Must percentages total exactly 100? What precision/tolerance is allowed? Reject or request correction when totals differ? | FR-005 |
| Q6 | What registration/login mechanism, account recovery, persistence, and shared-data permissions are required? Is any local demo authentication acceptable for the MVP? | FR-001–002, FR-012 |
| Q7 | Which channels and recipients receive notifications, at creation or approval, with what retry/read behavior? | FR-008 |
| Q8 | Who reviews, how many levels, can creators self-approve, and what happens on rejection, edits, cancellation, or resubmission? | FR-009–010 |
| Q9 | Who records/confirms payments? Are partial payments, overpayments, reversals, and duplicate submissions allowed? Is settlement pairwise or may debts be simplified? Recording payments is requested; transferring funds is not specified. | FR-010–011 |
| Q10 | Which image types/sizes, storage duration, and receipt access permissions are required? | FR-006 |
| Q11 | Are custom reports required? Which filters, date boundaries/timezone, exports, and pending/approved expense treatment apply? | FR-012–013 |
| Q12 | What web/mobile feature parity and browser/OS versions are required? Is the proposed Swing MVP and deferral list approved? | FR-014–016, MVP |
| Q13 | What measurable performance, capacity, accessibility, availability, retention, and recovery targets apply? | NFR-006 |

## Decision log and readiness
No clarification answers have been confirmed. Ask the customer, record the exact answer with date and approver, then update affected requirements and acceptance cases. Do not turn proposed options into decisions. This draft is suitable for review, not an implementation baseline or a claim of completed clarification.

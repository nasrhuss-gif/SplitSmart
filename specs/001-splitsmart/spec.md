# Feature Specification: SplitSmart Expense Sharing

**Feature Directory**: `specs/001-splitsmart`
**Created**: 2026-10-29
**Status**: Draft; confirmed lab decisions D1-D10 incorporated, remaining questions and human review pending
**Input**: Authoritative customer request in [UserRequirement.md](../../UserRequirement.md)
**Engineering Constraints**: [Project constitution](../../.specify/memory/constitution.md)

This specification preserves the complete customer feature inventory. P-labels below
organize review and do not establish customer-approved launch priority or MVP scope.

## Clarifications

### Session 2026-10-29
- Q: Which sign-in method should account holders use to create accounts and access SplitSmart? → A: Email/password with email verification and password recovery.

## User Scenarios & Testing *(mandatory)*

### Actors
- **Account holder**: authenticates and accesses their own expense and balance information.
- **Group member**: participates in group expenses and receives applicable notifications.
- **Group manager**: creates or manages a group; detailed membership permissions remain open (Q2).
- **Expense creator**: submits an expense; whether the creator may differ from its payer remains unresolved (Q1).
- **Payer**: the single person recorded as paying an expense; may also be a participant (D1).
- **Participant**: a current group member included in an expense allocation (D2).
- **Approving group manager**: approves a submitted expense once before it affects balances (D8).
- **Payment recorder**: records pairwise settlement payments; identity and confirmation rules remain open (Q9).

These are capabilities and do not imply separate account types or settle any open
permissions questions.

### User Story 1 - Access accounts and groups (Priority: P1)
An account holder signs in, accesses their own expense and balance information, and uses
groups to organize shared expenses.

**Why this priority**: Account access and groups provide the context for the product's
shared expense workflows.

**Independent Test**: Verify email/password sign-in, email verification, password recovery,
and access to an account holder's own information, then create a group and verify group
expenses can be associated with it.

**Acceptance Scenarios**:
1. **Given** a registered account holder and an unauthenticated session, **When** the
	 person requests their expense or balance information, **Then** access is denied.
2. **Given** an account holder who has authenticated, **When** they access their account,
	 **Then** their own expense and balance information is available.
3. **Given** a person setting up an account, **When** they register and sign in, **Then**
	 email/password sign-in, email verification, and password recovery are supported (D10).
4. **Given** an account holder, **When** they create a group, **Then** the group is
	 available for organizing shared expenses; membership permissions follow Q2.

### User Story 2 - Submit a shared expense (Priority: P1)
A group member records an expense with its amount, date, description, payer, participants,
and equal or percentage allocation, with an optional receipt image.

**Why this priority**: Expense capture is the source of shared obligations and balances.

**Independent Test**: Submit one equal-split expense and one percentage-split expense;
verify the recorded details, payer, participants, and calculated allocations against D1-D5.

**Acceptance Scenarios**:
1. **Given** a group with current members, **When** a member submits an expense with one
	 payer and selected participants, **Then** the expense retains its required details and
	 has no balance effect before approval.
2. **Given** a USD 10.00 expense split equally among three participants in stable order
	 A, B, C, **When** it is allocated, **Then** the shares are USD 3.34, USD 3.33, and
	 USD 3.33, and total USD 10.00 (AC-D3).
3. **Given** a USD 10.00 expense split 60/40, **When** it is allocated, **Then** the
	 shares are USD 6.00 and USD 4.00; totals other than 100% are rejected (AC-D5).
4. **Given** an expense with a zero, negative, or malformed amount, **When** it is
	 submitted, **Then** it is rejected and creates no posted financial effect (AC-D4).
5. **Given** an expense with no receipt or an allowed receipt image, **When** it is
	 submitted, **Then** the expense can be recorded; image limits and access follow Q10.

### User Story 3 - Review expenses and receive notifications (Priority: P1)
A group member submits an expense, applicable members receive an in-app notification, and
a group manager approves it before it changes balances.

**Why this priority**: Review-before-posting is an explicit customer capability and
prevents unapproved expenses from changing what users owe.

**Independent Test**: Submit an expense, verify its in-app notification and zero balance
effect, approve it once as a group manager, and verify one posting.

**Acceptance Scenarios**:
1. **Given** a submitted expense, **When** submission completes, **Then** an in-app
	 expense notification is triggered (AC-D7); exact recipients remain open (Q7).
2. **Given** a submitted expense not yet approved, **When** a user views balances,
	 **Then** the expense has no balance effect.
3. **Given** a submitted expense, **When** a group manager approves it, **Then** its
	 financial effect is posted once; another approval does not post it again (AC-D8).
4. **Given** a reviewer rejects or edits an expense, **When** the workflow continues,
	 **Then** its behavior follows the decisions still open in Q8.

### User Story 4 - Track balances and settlements (Priority: P1)
Users inspect the amount owed between each pair and record payments made to settle those
amounts.

**Why this priority**: Accurate balances and payments are the central outcome of expense
sharing.

**Independent Test**: Use a known approved expense ledger to verify pairwise debts, record
a partial payment, and compare the resulting balance with the expected amount.

**Acceptance Scenarios**:
1. **Given** approved expenses and recorded payments, **When** a user views pairwise
	 balances, **Then** each amount owed reflects those records and excludes pending or
	 rejected expenses.
2. **Given** A owes B USD 20.00, **When** A records a USD 5.00 payment to B, **Then**
	 USD 15.00 remains owed (AC-D9).
3. **Given** the same USD 20.00 debt, **When** A attempts to record a USD 25.00 payment,
	 **Then** the overpayment is rejected (AC-D9).

### User Story 5 - Review reports (Priority: P2)
An account holder reviews summaries of expenses, balances, and payments and may use
customized report filters if that optional capability is confirmed.

**Why this priority**: Summaries help users understand shared spending and settlement
status; custom reports remain tentative in the customer request.

**Independent Test**: Compare a user's report with the authorized source expenses,
balances, and payments for the same reporting scope.

**Acceptance Scenarios**:
1. **Given** authorized expense, balance, and payment records, **When** a user requests
	 summaries, **Then** the summaries agree with those records.
2. **Given** custom reporting is confirmed, **When** a user requests a report with
	 confirmed filters, **Then** only records matching those filters are included.

### User Story 6 - Use the product on requested platforms (Priority: P1)
Users complete the agreed product workflows through the primary web product and the
Android and iOS apps.

**Why this priority**: The customer explicitly requests all three delivery platforms.

**Independent Test**: Verify the agreed user workflows separately on web, Android, and
iOS against the customer-approved browser and OS support matrix.

**Acceptance Scenarios**:
1. **Given** the agreed web support environment, **When** a user completes an agreed
	 workflow, **Then** the primary web product supports it.
2. **Given** supported Android and iOS environments, **When** users complete agreed
	 mobile workflows, **Then** the corresponding app supports them.
3. **Given** a Java Swing demonstration, **When** platform acceptance is assessed,
	 **Then** the demonstration alone does not satisfy the web, Android, or iOS requirement.

### Edge Cases
- An expense has a zero, negative, or malformed amount; D4 requires rejection without a
	posted financial effect.
- A participant is not a current member of the expense group; reject that participant
	selection under D2.
- Equal splitting leaves residual cents; allocate by stable participant order, while the
	ordering key remains open (D3, Q3).
- Percentage inputs total less than or greater than 100%; reject them under D5. Fractional
	cent handling remains open (Q5).
- An expense is pending approval, rejected, approved twice, or resubmitted; pending and
	rejected expenses do not affect balances, and approval posts once (D8, Q8).
- A payment is partial or greater than the current pairwise debt; allow the partial payment
	and reject the overpayment (D9). Duplicate and reversal rules remain open (Q9).
- An expense has no receipt; receipt omission is allowed. Format, size, retention, and
	access limits remain open (Q10).
- An account requests another user's information or group data; enforce confirmed access
	permissions, which remain incomplete (Q6).

## Requirements *(mandatory)*

### Functional Requirements

All rows remain in the full customer feature inventory regardless of proposed MVP
disposition. “MUST” formalizes a source capability or confirmed D1-D10 decision. It does
not resolve linked open questions or approve the proposed MVP.

| ID | Customer capability | Observable acceptance criterion | Open questions |
|---|---|---|---|
| FR-001 | Individual user accounts and login | Account access uses email and password; email verification and password recovery are supported. An account holder must authenticate before accessing their own expense and balance information; an unauthenticated person cannot access that information. Persistence protections and shared-data permissions remain open. | Q6 |
| FR-002 | Create and manage groups | A user can create and manage groups and view group expenses and balances; group-management permissions and the effects of membership changes remain open. | Q2 |
| FR-003 | Create an expense | A submitted expense retains its amount, date, description, split manner, selected participants, and exactly one payer. The payer may also be a participant. Reject zero, negative, or malformed amounts. | Q1, Q4 |
| FR-004 | Equal splitting | For USD expenses with two decimal places, allocate equal shares among selected participants and distribute any remaining cents in stable participant order; shares must total the expense amount. The stable ordering key remains open. | Q1, Q3 |
| FR-005 | Percentage splitting | Reject percentage inputs that do not total 100%. For valid inputs, allocations must total the USD expense amount and follow the entered percentages; precision and fractional-cent rounding remain open. | Q3, Q5 |
| FR-006 | Optional receipt image | An expense can be submitted without a receipt or with an allowed receipt image. Supported formats, size limits, retention, and access rules remain open. | Q10 |
| FR-007 | Select involved users | The creator can select expense participants only from current members of the expense group. The payer may be a participant (D1); creator/payer identity restrictions remain open (Q1). | Q1, Q2 |
| FR-008 | New-expense notifications | Submitting an expense triggers an in-app notification. Exact recipients and delivery, retry, and read behavior remain open. | Q7 |
| FR-009 | Review and approve before balance adjustment | A group manager must approve a submitted expense once before it affects balances. Approval posts its financial effect exactly once; rejection, edits, resubmission, and self-approval rules remain open. | Q8 |
| FR-010 | Pairwise balance tracking | Each user's amount owed to each other user reflects approved expenses and recorded pairwise settlements. Submitted or rejected expenses have no balance effect; an approved expense is posted once. | Q1, Q3, Q8, Q9 |
| FR-011 | Record settlement payments | Users can record pairwise payments, including partial payments. Reject a payment greater than the recorded debt; confirmation, reversal, and duplicate-submission rules remain open. | Q9 |
| FR-012 | Reports and summaries | Users can obtain expense, balance, and payment summaries consistent with the records they are authorized to access. Access boundaries and report treatment of pending items remain open. | Q6, Q11 |
| FR-013 | Possible custom reports | Candidate scope: custom reports with date ranges and other parameters. This capability remains tentative because the source says “possibly”; filters, boundaries, and inclusion rules await confirmation. | Q11 |
| FR-014 | Primarily web-based product | Users can complete the agreed product scenarios through the primary web product. Browser support and feature parity remain open. | Q12 |
| FR-015 | Android app | The product includes an Android app for the confirmed mobile feature set. Supported OS versions and feature parity remain open. | Q12 |
| FR-016 | iOS app | The product includes an iOS app for the confirmed mobile feature set. Supported OS versions and feature parity remain open. | Q12 |

### Non-Functional Requirements

These lab engineering constraints are not original customer requirements.

| ID | Origin | Requirement and verification |
|---|---|---|
| NFR-001 | Lab engineering | Use Java 21 and Maven; verify the declared Java release and dependency versions and run the documented Maven build with JDK 21. |
| NFR-002 | Lab engineering | Keep Swing presentation separate from business rules; verify business-rule tests can run without starting the GUI. |
| NFR-003 | Lab engineering | Use BigDecimal for monetary arithmetic; verify confirmed allocation and ledger invariants with JUnit 5 without assuming unresolved rounding rules. |
| NFR-004 | Lab engineering | Maintain requirement-to-design/test traceability and use reviewed, requirement-linked PlantUML diagrams when design diagrams are created. |
| NFR-005 | Derived, pending confirmation | Enforce account ownership and confirmed group permissions; verify allowed and denied access cases. Data persistence protections and shared-data permissions remain open (Q6). |
| NFR-006 | Customer quality targets unspecified | Performance, capacity, accessibility, availability, retention, recovery, and browser/OS targets remain open (Q12-Q13); no numeric customer target is invented. |
| NFR-007 | Lab engineering | Record a human reviewer's identity, date, findings, and disposition before AI-generated project artifacts are accepted. |

### Proposed Java Swing MVP *(implementation decision; not customer-approved scope)*

Candidate inclusion: account access (FR-001), basic groups (FR-002), expense fields and
both split methods (FR-003-FR-005), participant selection (FR-007), review (FR-009),
pairwise balances (FR-010), payment recording (FR-011), and basic summaries (FR-012).

Proposed deferral: receipt images (FR-006), notifications (FR-008), optional custom
reports (FR-013), web (FR-014), Android (FR-015), and iOS (FR-016). These remain customer
inventory items and are not deleted or waived. Neither this MVP boundary nor its deferrals
are customer-approved. A Swing demonstration does not fulfill the web and mobile platform
requirements. Mock login, local-only persistence, additional approval rules, or unresolved monetary
behavior are not approved defaults. The authentication method is confirmed by D10.

### Key Entities
- **Account**: a person's authenticated identity and access to their own information.
- **Group**: a set of people organizing shared expenses, with membership and management
	rules still subject to Q2.
- **Expense**: amount, date, description, split manner, optional receipt, one payer,
	participants, and review state.
- **Allocation**: an expense share assigned to a participant, including its amount or
	percentage and the applicable confirmed split rule.
- **Approval**: a group manager's review action and its effect on whether the expense is
	posted to balances; unresolved transitions are listed in Q8.
- **Notification**: an in-app notice triggered by expense submission, with recipients and
	delivery details subject to Q7.
- **Payment**: a pairwise settlement record between users, including amount and its effect
	on the debt; remaining rules are listed in Q9.
- **Report**: a summary of authorized expense, balance, and payment information, with
	optional custom filters subject to Q11.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: All 16 customer capabilities, FR-001 through FR-016, retain an explicit
	acceptance criterion and a recorded status before any customer-compliance claim.
- **SC-002**: Every approved expense allocation in confirmed-rule test cases sums exactly
	to the expense total at USD 0.01 precision; unresolved percentage rounding cases remain
	blocked pending Q3/Q5.
- **SC-003**: In all approval workflow acceptance cases, pending and rejected expenses
	change balances zero times, and an approved expense changes balances exactly once.
- **SC-004**: In all settlement acceptance cases, pairwise balances equal the expected
	amount after partial payment and reject payment above the debt.
- **SC-005**: In all report acceptance cases, expense, balance, and payment summaries
	match the authorized source records in the same scope.
- **SC-006**: Web, Android, and iOS are each verified against their confirmed support
	matrix before any claim that the requested platform scope is met.
- **SC-007**: Human review records workflow completion and findings for representative
	account, expense, approval, settlement, and reporting scenarios; the customer has not
	specified a numeric satisfaction target.

## Assumptions
- USD and two decimal places apply to lab expense and payment examples because D3
	explicitly confirmed them; no additional currencies are assumed.
- One payer, group-member participants, email/password sign-in with email verification and
  password recovery, an in-app submission notification,
	one group-manager approval, pairwise settlement, partial payments, and rejection of
	overpayments apply only as confirmed in D1-D10.
- The customer-requested platform list remains web, Android, and iOS. The Java Swing MVP
	is a lab proposal and is not assumed to be an accepted substitute.
- Custom reporting remains tentative because the customer said “possibly”; it is not
	silently converted into a committed release requirement.
- Unanswered behaviors remain open rather than receiving industry-standard defaults where
	those defaults would decide money, permissions, approval, or customer scope.

## Open Questions

Confirmed answers D1-D10 are recorded in [clarification-decisions.md](clarification-decisions.md).
The questions below retain the original stable IDs and list only details not settled by
those decisions.

| ID | Remaining question | Affected requirements |
|---|---|---|
| Q1 | May the expense creator differ from the payer, and are any restrictions on that relationship required? | FR-003, FR-007, FR-010 |
| Q2 | Who may create groups or add/remove members? What happens to prior debts after membership changes? Are direct non-group expenses supported? | FR-002, FR-007, FR-010 |
| Q3 | What stable participant ordering key applies to residual cents? What rounding mode applies to fractional-cent percentage allocations? Are cross-currency expenses supported beyond confirmed USD examples? | FR-003-FR-005, FR-010-FR-011 |
| Q4 | How should missing, excessive, or malformed dates and descriptions be handled? Are refunds supported? | FR-003 |
| Q5 | What percentage precision or tolerance is accepted, and how are fractional-cent shares rounded while preserving the total? | FR-005 |
| Q6 | What data persistence protections and shared-data permissions are required? | FR-001-FR-002, FR-012 |
| Q7 | Which members receive in-app notifications, and what delivery, retry, and read behavior is required? | FR-008 |
| Q8 | Can a creator approve their own expense? What happens on rejection, edits, cancellation, or resubmission? | FR-009-FR-010 |
| Q9 | Who confirms payments, and what are the reversal and duplicate-submission rules? Payment transfer is not specified by the customer. | FR-010-FR-011 |
| Q10 | Which receipt image types and sizes, storage duration, and access permissions are required? | FR-006 |
| Q11 | Are custom reports required? Which filters, date boundaries/time zone, exports, and pending/approved expense treatment apply? | FR-012-FR-013 |
| Q12 | What web/mobile feature parity and browser/OS versions are required? Is the proposed Swing MVP and deferral list approved? | FR-014-FR-016, MVP |
| Q13 | What measurable performance, capacity, accessibility, availability, retention, backup, and recovery targets apply? | NFR-006 |

## Decision Log and Readiness

The user confirmed D1-D10 on 2026-10-29, as recorded in clarification-decisions.md.
Those decisions supersede unanswered portions of Q1-Q9 only as explicitly stated.
Remaining details require confirmation. The MVP deferral list remains unapproved, and
this draft remains subject to human review. `UserRequirement.md` remains unchanged.

### Acceptance Cases for Confirmed Decisions
- **AC-D1 (FR-003/007/010)**: An expense has exactly one recorded payer. That payer may
	also occur in the participant list. Multiple payers are outside the confirmed lab rule.
- **AC-D2 (FR-007)**: Reject selection of a user who is not a current member of the
	expense group.
- **AC-D3 (FR-004)**: Given USD 10.00 and three equal participants whose confirmed stable
	order is A, B, C, allocate 3.34, 3.33, and 3.33. Shares total 10.00. The ordering key
	still needs definition.
- **AC-D4 (FR-003)**: Reject 0, negative, and malformed expense amounts; do not create a
	posted financial effect.
- **AC-D5 (FR-005)**: For USD 10.00 and valid percentages 60/40, allocate 6.00/4.00.
	Reject totals of 90% or 110%. Percentage precision and fractional rounding remain open.
- **AC-D6 (FR-001)**: Account holders must authenticate through real login before
	accessing their own information. Mock identity selection does not meet D6. Authentication and recovery
	follow D10; persistence protections and shared-data permissions remain open.
- **AC-D7 (FR-008)**: Submission triggers an in-app expense notification. Exact recipients
	and delivery details still require confirmation.
- **AC-D8 (FR-009/010)**: A submitted expense has no balance effect until one group-manager
	approval. Approval posts the expense once; additional approval levels are not required
	by D8.
- **AC-D9 (FR-011)**: Given A owes B USD 20.00, recording A's USD 5.00 payment to B leaves
	USD 15.00 owed. Reject a USD 25.00 payment against that original USD 20.00 debt.
	Confirmation, reversals, and duplicate detection remain open.
- **AC-D10 (FR-001)**: Account access uses email and password; email verification and
	password recovery are supported. Data persistence protections and shared-data permissions
	remain open under Q6.

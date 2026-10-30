# SplitSmart Constitution

## Core Principles

### I. Java 21
The Java lab implementation MUST target Java 21. Java 21 is an implementation constraint
for this lab, not a requirement stated by the customer.

### II. Maven
The Java lab implementation MUST use Maven. The build MUST declare dependency versions and
the Java 21 release target so that builds are reproducible. Maven is an implementation
choice, not a customer requirement.

### III. Java Swing
The lab desktop interface MUST use Java Swing. Swing is a lab implementation decision and
MUST NOT be represented as satisfying the customer's primary web and Android/iOS platform
requirements.

### IV. Object-Oriented Design
Java code MUST use cohesive types with explicit responsibilities and encapsulated state.
New abstractions MUST address a documented requirement or a demonstrated design need.

### V. GUI and Business Logic Separation
Swing views and event handlers MUST delegate expense, approval, allocation, balance,
payment, and reporting rules to business logic. Business logic MUST NOT depend on Swing
classes, so those rules can be tested without constructing a GUI.

### VI. BigDecimal Monetary Correctness
Money and percentage-based allocation arithmetic MUST use `BigDecimal`, never binary
floating-point types. Currency, scale, rounding, residual allocation, percentage precision,
and payment semantics MUST remain open until confirmed; this constitution does not decide
them. Once confirmed, allocation and ledger rules MUST be deterministic and testable.
Allocated shares MUST sum exactly to the expense amount, ledger entries MUST conserve
value, and unapproved expenses MUST NOT affect balances.

### VII. JUnit 5 Verification
Automated Java tests MUST use JUnit 5 and trace to confirmed acceptance criteria. Tests
MUST cover applicable monetary boundaries, approval transitions, invalid input, settlement,
and balance conservation without assuming unresolved business rules.

### VIII. PlantUML Design Artifacts
When design diagrams are created, they MUST use PlantUML and be reviewed for consistency
with the current specification. Diagrams MUST identify the requirements they represent;
they MUST NOT imply decisions that remain open.

### IX. Requirement Traceability
Maintain stable requirement IDs, source references, acceptance criteria, implementation
disposition, open questions, and a dated decision log. Trace design elements and meaningful
tests to the requirements they address. Preserve all customer capabilities in the
requirements inventory, including capabilities deferred from a lab MVP.

### X. Human Review of Generated Output
Generated requirements, decisions, diagrams, tests, and code MUST receive human review
before acceptance. Reviewers MUST check for omissions, invented behavior, contradictions,
and scope drift. A review is complete only when an actual reviewer and review date are
recorded; Generated output is not customer confirmation.

## Customer Requirements and Implementation Decisions
`UserRequirement.md` is the unchanged authoritative customer request and MUST NOT be
rewritten as part of this workflow. The customer's requested capabilities include user
accounts, groups, expenses, notifications, approval, balance and payment tracking,
reporting, and a primary web product with Android and iOS apps. These requirements MUST
remain distinct from lab constraints, proposed implementation choices, and confirmed
customer decisions. The Java 21, Maven, Java Swing, JUnit 5, and PlantUML choices in this
constitution are engineering decisions for the lab, not original customer requirements.
The Swing lab MVP does not fulfill or replace the customer's requested platforms. Open
questions remain unresolved until confirmed; no implementation choice or Generated output may be
presented as customer confirmation.

## Development Workflow and Quality Gates
No Java implementation is authorized by this documentation workflow alone. Before a
change is accepted, review its requirement traceability, affected tests and diagrams, and
consistency with confirmed decisions. A release MUST NOT claim customer compliance while
required platforms or unresolved acceptance rules remain outstanding.

## Governance
This constitution is approved by the user of this chat following explicit review on 2026-10-29. Confirmed product/lab decisions are recorded as D1–D23 in specs/001-splitsmart/clarification-decisions.md. Amendments MUST include a rationale and
impact assessment, update the version and amendment date, and receive human approval.
Recheck affected requirements, diagrams, and tests after each amendment. Use semantic
versioning: MAJOR for backward-incompatible governance or principle changes, MINOR for
added principles or materially expanded guidance, and PATCH for clarifications and
non-semantic refinements. Reviewers MUST verify compliance with this constitution during
specification, design, implementation, and release reviews.

**Version**: 1.2.1 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29


Review record: the user of this chat explicitly stated “I reviewed and approve them”
on 2026-10-29 for the constitution, specification, and checklist, subject to
incorporating approved decisions D11–D23. Those decisions are now incorporated.
Version 1.2.0 records ratification and the confirmed decision baseline. Version 1.2.1
clarifies the generated-output review wording without changing its required human review.
Documentation approval does not assert implementation, executed tests, or platform delivery.

# SplitSmart Constitution

Version: 1.0.0 | Adopted: 2026-10-29 | Status: proposed for human review

## I. Authority and scope
UserRequirement.md is the unchanged authoritative customer request. Every customer capability must remain in the requirements inventory. Customer requirements, lab constraints, proposed implementation choices, and confirmed decisions must be separately labeled. The Swing MVP does not fulfill or replace the customer's primary web and Android/iOS delivery requirements. Unanswered questions remain unresolved; AI output cannot constitute customer confirmation.

## II. Java and build discipline
The lab implementation shall use Java 21 and Maven with declared, reproducible dependency versions. These are lab engineering decisions, not original customer requirements. No Java implementation is authorized in this documentation phase.

## III. Object-oriented boundaries
Use cohesive domain objects and explicit application services. Java Swing views and event handlers shall delegate expense, approval, allocation, balance, payment, and reporting rules to business logic without Swing dependencies. Persistence and notification mechanisms shall be replaceable through interfaces. Avoid introducing architecture without a requirement or justified design need.

## IV. Monetary correctness
Represent money and percentage arithmetic with BigDecimal, never binary floating-point. Currency, allowed scale, rounding mode, residual allocation, percentage precision, and payment semantics require confirmed decisions. Allocation totals must equal the expense amount; ledger entries must conserve value; unapproved expenses must not affect balances. Rules shall be deterministic and testable once confirmed.

## V. Evidence and testing
Use JUnit 5 to verify confirmed acceptance criteria, monetary boundaries, approval transitions, invalid input, settlement, and balance conservation. Use PlantUML for reviewed domain, sequence, and state diagrams when design begins. Trace each design element and meaningful test to requirement IDs. Generated diagrams and tests must agree with the specification.

## VI. Traceability and review
Maintain requirement IDs, source references, acceptance criteria, MVP disposition, open questions, and a dated decision log. Human reviewers must inspect AI output for omissions, invented behavior, contradictions, and scope drift before accepting it. Do not label a review complete without an actual reviewer and date.

## Governance
Changes require a rationale, impact assessment, version update, and human approval. Recheck affected requirements, diagrams, and tests. UserRequirement.md must not be edited by these workflows. A release must not claim customer compliance while required platforms or unresolved acceptance rules remain outstanding.

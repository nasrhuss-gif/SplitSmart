# Lab 6 document review

Date: 2026-10-29
Reviewer: Codex, AI-assisted document review. This is not human approval or customer confirmation.

## Scope and results
Reviewed UserRequirement.md, .specify/memory/constitution.md, specs/001-splitsmart/spec.md, and specs/001-splitsmart/checklists/requirements.md against the supplied lab instructions.

1. All original customer capabilities remain in the feature inventory, including optional receipts, notifications, approval, payments, reporting, and web/Android/iOS support.
2. FR-001 through FR-016 are unique and sequential. Actors, scenarios, acceptance criteria, non-functional requirements, and Q1 through Q13 are present.
3. The constitution addresses Java 21, Maven, Swing, JUnit 5, PlantUML, object-oriented design, GUI/business separation, BigDecimal, traceability, and human review. These are identified as lab engineering choices.
4. The Swing MVP is clearly proposed and does not replace customer platform requirements. Approval precedes balance posting; allocations must conserve the expense amount.
5. The source request matches the original local committed UserRequirement.md byte for byte. No Java code was generated.
6. The complete initialized project archive passed ZIP integrity validation; its 34 source files matched the current local project when checked before this report was added.
7. The public GitHub repository is named SplitSmart. Core requirements documents are browsable; the full generated Spec Kit infrastructure is provided in SplitSmart-SpecKit.zip. Extract that archive before continuing the initialized project in VS Code.

## Remaining work
- Update: the user confirmed initial clarification decisions D1–D9 on 2026-10-29. Acceptance cases AC-D1–AC-D9 are now recorded. Remaining details are explicitly open in clarification-decisions.md.
- Acceptance criteria that reference unresolved policies cannot be finalized until answers are confirmed. Record confirmed answers with date and approver, then revise the affected criteria.
- The documents were created in Codex. The prescribed `/speckit-constitution` and `/speckit-specify` workflows completed in VS Code 1.144.0 Copilot Agent mode on the Mac. `/speckit-clarify` also ran and asked a follow-up login-method question. The user confirmed email/password with email verification and password recovery; D10 records this answer and Q6 retains only unresolved details.
- A human still needs to review the documents. Do not mark customer clarification or human approval complete solely because this AI review exists.

## Submission
The assignment's stated submission deliverable is the GitHub project URL:

https://github.com/nasrhuss-gif/SplitSmart

Publication is complete. This report does not claim that the unresolved clarification and required editor workflow are complete.

## Follow-up review after Copilot commands
- Restored explicit allocation conservation, ledger conservation, and exclusion of unapproved expenses in constitution v1.1.1. These appeared in the original constitution and are preserved engineering invariants.
- Corrected the constitution metadata to show human ratification pending; an AI-generated date does not establish human ratification.
- Corrected the actor wording about creator/payer identity to say Q1 is unresolved, rather than imply a customer decision.
- Confirmed that the 16 FR IDs and nine confirmed acceptance cases remain present after Copilot revisions.
- Spec Kit's current prerequisite script uses SPECIFY_FEATURE_DIRECTORY=specs/001-splitsmart for explicit feature selection; a direct check with that setting resolved the existing feature successfully. No new feature or branch was created.

Software checks were repeated through Copilot terminal tools in VS Code: python and py unavailable; python3 3.9.6; uv 0.13.6; specify --help available.

## Confirmed authentication follow-up
On 2026-10-29 the user confirmed email/password with email verification and password recovery. Copilot recorded D10, updated FR-001 and the account-access journey, and added AC-D10 and a dated clarification session. Other unanswered questions and human review remain pending.

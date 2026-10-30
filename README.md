# SplitSmart — Lab 6

Requirements and engineering principles for an expense-sharing product. No Java code has been generated.

## Complete initialized project
Download [SplitSmart-SpecKit.zip](SplitSmart-SpecKit.zip) and extract it into a project folder to obtain all generated Copilot commands, Spec Kit templates, scripts, and documents. The main lab documents are also browsable in this repository.

## Documents
- [Confirmed clarification decisions](specs/001-splitsmart/clarification-decisions.md)
- [Final document review and submission status](REVIEW.md)
- [Original customer request](UserRequirement.md)
- [Project constitution](.specify/memory/constitution.md)
- [Approved feature specification and question resolutions](specs/001-splitsmart/spec.md)
- [Requirements review checklist](specs/001-splitsmart/checklists/requirements.md)

## Completed lab work
Spec Kit 1.2.5 initialized the Copilot integration. `/speckit-constitution`, `/speckit-specify`, and `/speckit-clarify` were performed in VS Code 1.144.0 Copilot Agent mode. User-confirmed D1–D23 are incorporated into the final specification, decision log, and acceptance cases. On 2026-10-29 the user explicitly confirmed review/approval of the constitution, specification, and checklist subject to incorporating D11–D23; incorporation is complete. See [final review](REVIEW.md) and [approved policy set](APPROVED-DECISIONS.md).

The approved Java Swing lab MVP includes accounts, groups/private pairs, both split methods, receipts, in-app notifications, manager review/reversals, balances, confirmed settlement records, and date-filtered reports/CSV. The full customer requirement for primary web plus Android/iOS remains in scope for later increments. No application is implemented in this specification lab.

**Submission URL**: https://github.com/nasrhuss-gif/SplitSmart

Only course submission remains: paste that URL into the Lab 6 assignment. The course submission page has not been supplied.

## Environment check on 2026-10-29
The execution terminal reported Python 3.9.6 through `python3`; `python` and `py` were unavailable. Git 2.50.1 is available. `uv`, `specify`, `code`, and `gh` were initially absent from PATH. These checks were initially run in the project execution terminal, then repeated through Copilot terminal tools in VS Code 1.144.0: `python` and `py` were unavailable, `python3` reported 3.9.6, project-local `uv` reported 0.13.6, and `specify --help` displayed successfully.

A workspace-local uv 0.13.6 and managed Python 3.11.18 were installed outside this deliverable under `work/`. Spec Kit 1.2.5 required a compatible binary dependency here: `uv tool install specify-cli --with 'cryptography<46'` installed cryptography 45.0.7 after the default dependency attempted an unavailable Rust build. This is an environment workaround, not a customer requirement or application dependency.

## Continue in VS Code
Install VS Code and GitHub Copilot, sign in, and open this directory. Install uv following https://docs.astral.sh/uv/getting-started/installation/ if needed. Use normal ASCII hyphens in terminal commands:

```sh
python --version
# Windows launcher, if available:
py --version
# macOS alternative:
python3 --version
uv --version
git --version
uv tool install specify-cli
specify --help
specify version
# Select this existing feature for subsequent Spec Kit helper commands:
export SPECIFY_FEATURE_DIRECTORY="specs/001-splitsmart"
```

This project is already initialized; do not overwrite the reviewed files by reinitializing unnecessarily. For a new project, the lab command is `specify init . --integration copilot`. Official instructions: https://github.com/github/spec-kit/blob/main/docs/installation.md

In Copilot Chat Agent mode, use the following prompts. Preserve existing drafts and review proposed changes before accepting them.

```text
/speckit-constitution
Read UserRequirement.md as the original SplitSmart customer request.
Create principles for Java 21, Maven, Java Swing, JUnit 5,
PlantUML, object-oriented design, separation of GUI and business
logic, BigDecimal for money, requirement traceability, and
human review of generated output. Do not change UserRequirement.md.
Distinguish customer requirements from implementation decisions.
```

```text
/speckit-specify
Read UserRequirement.md in this workspace as the authoritative
customer requirements. Write a testable SplitSmart feature
specification: actors, user scenarios, functional and
non-functional requirements, acceptance criteria, requirement
IDs (FR-001, etc.), and open questions. Preserve all original
customer features in the requirements inventory; label the
Java Swing MVP subset separately. Do not write Java code.
Do not edit UserRequirement.md.
```

```text
/speckit-clarify
Review the SplitSmart specification against UserRequirement.md.
Ask about missing or ambiguous behavior: payer versus
participants, group membership, rounding, invalid amounts,
percentage totals, authentication, notifications, and balance
settlement. Do not silently invent answers. Record decisions
and update the specification only after confirmation.
```

The three prompts above have been run. Clarification decisions and human document approval are recorded, the final documents are committed/published, and the repository is public. The remaining step is submitting the repository URL to the course assignment page.

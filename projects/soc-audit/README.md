# SOC Audit 2026 — Project Hub

## Audit overview

| Field | Value |
|---|---|
| Audit firm | The Moore Group CPA, LLC (Nashua, NH) |
| Audit types | SOC 1 Type 2 AND SOC 2 Type 2 (Security, Availability, Confidentiality) |
| Review period | June 1, 2025 – May 31, 2026 |
| Client | Revolution Group, Inc. |

## Project timeline

| Milestone | Date | Status |
|---|---|---|
| Moore Group provides control descriptions for review | Completed | ✅ |
| Revolution Group returns control revisions | Completed | ✅ |
| Moore Group sends Information Requests | April 22, 2026 | ✅ |
| **Information Requests returned to Moore Group** | **June 16, 2026** | 🔴 Open |
| Matrix 1 Sampling Requests provided to Revolution Group | June 23, 2026 | — |
| Matrix 1 Sampling Requests returned to Moore Group | June 30, 2026 | — |
| Remote testing via Webex | July (TBD) | — |
| Draft SOC reports provided for review | August 10, 2026 | — |
| Revolution Group approves SOC reports | August 12, 2026 | — |
| Final SOC reports delivered | August 14, 2026 | — |

## Folder structure

| Folder / File | Purpose |
|---|---|
| `soc1/evidence-log.md` | SOC 1 deliverables tracker — document requests by matrix |
| `soc2/controls.md` | SOC 2 policy cross-reference (23 controls across Security, Availability, Confidentiality) |
| `soc2/evidence-log.md` | SOC 2 policy tracker — which Revolution Group policy addresses each control |
| `gaps.md` | All open items across both audits. Work from this each session. |
| `prior-audit/` | 2024 SOC 1 and SOC 2 final draft reports |

## Source files (OneDrive)

All source files: `C:\Users\rsnide\OneDrive - Revolution Group\Revolution Group - SOC Audit - 2026 - SOC Audit\`

| File | Purpose |
|---|---|
| `Revolution Group - 2026 SOC 1 Type 2 Report - Information Requests sent 4-20-26.docx` | SOC 1 full report template with all information requests |
| `UPDATED PROJECT TIMELINE - SOC AUDIT 2026 - 4.23.26.docx` | Official project timeline |
| `2026 SOC 2 Policy Cross-Reference (Sec, Avail, Conf).csv` | SOC 2 control cross-reference worksheet |
| `SOC 2 - Sample of Policies - Security Common Criteria 2026.docx` | Auditor sample policies (Security) |
| `SOC 2 - Sample of Policies - Availability 2026.docx` | Auditor sample policies (Availability) |
| `SOC 2 - Sample of Policies - Confidentiality 2026.docx` | Auditor sample policies (Confidentiality) |
| `Software Table Template 2026.docx` | Software inventory template |
| `Risk Assessment Template 2026.docx` | Risk assessment template |
| `Revolution Group - 2024 SOC 1 Type 2 Report - Final draft for review sent 6-28-24.pdf` | Prior year SOC 1 |
| `Revolution Group - 2024 SOC 2 Type 2 Report - Final draft for review - sent 7-08-24.pdf` | Prior year SOC 2 |

## How to work this project

- **Each session:** ask "what's open on the SOC audit?" — AIOS reads gaps.md and returns prioritized open items.
- **When a document is collected:** update status in soc1/evidence-log.md → `collected`, add the file path or system location.
- **When something is blocked:** move it to gaps.md with a note.
- **Decisions made:** log in `decisions/log.md`.

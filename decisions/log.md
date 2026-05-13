# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-05-12 — SOC audit project lives inside AIS-OS

**Decision:** Built `projects/soc-audit/` inside the AIS-OS workspace rather than managing the audit in a standalone folder or purely in OneDrive.

**Why:** The AIOS holds context between sessions. `gaps.md` and `evidence-log.md` replace manual tracking and can restore full audit state in one sentence at the start of any session.

**Alternatives considered:** Separate VS Code workspace; managing entirely in OneDrive with no AIOS integration.

**Owner:** Rick Snide

---

## 2026-05-12 — SOC audit split into soc1/ and soc2/ subfolders

**Decision:** Structured the audit project with separate `soc1/` and `soc2/` subfolders rather than one flat evidence log.

**Why:** Discovered mid-session that Revolution Group is running a dual audit — SOC 1 Type 2 AND SOC 2 Type 2 simultaneously with The Moore Group. The two audits have fundamentally different evidence structures (SOC 1 = testing matrices with document submissions; SOC 2 = policy cross-reference worksheet). Merging them would obscure what's due when.

**Alternatives considered:** Single flat evidence-log.md covering both audits.

**Owner:** Rick Snide

---

## 2026-05-12 — One AIS-OS workspace, not separate windows per project

**Decision:** All projects run inside the single AIS-OS workspace using the `projects/` folder for isolation. No separate VS Code windows or workspaces per project.

**Why:** The files are the memory, not the conversation. CLAUDE.md loads in every session; project files (gaps.md, evidence-log.md) restore context instantly. Splitting into separate windows fragments the operating system and duplicates business context.

**Alternatives considered:** Separate Claude Code window per project; sub-OS folder per project.

**Owner:** Rick Snide

---

## 2026-05-12 — AIOS baseline audit score: 52/100 (Stage 1: Built)

**Decision:** Accepted 52/100 as the baseline score to track improvement against. Top gaps identified: connections.md was stale (partially closed — M365 and HaloPSA now marked live), zero user-built skills, no recurring cadence trigger.

**Why:** First `/audit` run establishes the benchmark. Score climbs as connections are documented, skills are built, and cadence is added. Next audit target: close the user-built skills gap via `/level-up`.

**Alternatives considered:** N/A — record of state.

**Owner:** Rick Snide

---

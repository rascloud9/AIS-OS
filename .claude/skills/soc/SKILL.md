---
name: soc
description: SOC 2026 audit tracker for Revolution Group. Subcommands — done, complete, update, status, archive, next, list controls. Use to mark controls collected, check what's missing, find reusable 2024 docs, get prioritized next steps, or print a full control list with associated files. Trigger on "/soc", "/soc done 6.1", "mark X complete", "I added X to deliverables", "what's still missing for the audit", "what should I work on next for the audit", "list all controls", "show me all controls and files".
---

## What this skill does

Manages the Revolution Group SOC 2026 audit evidence tracking. All updates touch three files in sync plus regenerate the Excel tracker. Never update one file without updating the others.

## Key paths

- **Evidence log:** `projects/soc-audit/soc1/evidence-log.md`
- **Gaps list:** `projects/soc-audit/gaps.md`
- **Tracker script:** `projects/soc-audit/build_tracker.py`
- **Deliverables folder:** `c:/Users/rsnide/OneDrive - Revolution Group/Revolution Group - SOC Audit - 2026 - SOC Audit/Deliverables/`
- **Excel output:** `c:/Users/rsnide/OneDrive - Revolution Group/Revolution Group - SOC Audit - 2026 - SOC Audit/SOC 2026 Audit Tracker.xlsx`
- **Deadline:** June 16, 2026 — 50 "provide" documents due

## Subcommands

Parse `args` to determine which subcommand to run. If no args, run **dashboard**.

---

### `/soc` — Dashboard (no args)

Read `projects/soc-audit/soc1/evidence-log.md`. Compute days remaining to June 16, 2026 from today's date.

Print:

```
# SOC Audit — {date}
{N} days to deadline (June 16, 2026)

## Progress: {collected}/{provide_total} provide items collected ({pct}%)

## Still missing — by priority

### Quick wins (single doc, multiple controls)
{list any missing items that satisfy 2+ controls}

### Data pulls needed (HaloPSA)
{controls 5.5, 5.6, 8.6, 8.7 if still missing}

### Screenshots needed
{controls 6.22, 6.23, 6.29, 5.11, 5.12, 5.19 if still missing}

### Policies / documents
{all other missing provide items}

### In progress (assigned)
{in-progress items with assignee}

### TBD — confirm with auditor
{tbd items}
```

Show only non-empty sections. Keep it under 40 lines.

---

### `/soc done <control>` — Quick mark collected (shorthand)

**Args format:** `done 6.1`

Shorthand for `complete`. Automatically finds the matching file in the Deliverables folder — no filename required.

1. Run `ls` on the Deliverables folder.
2. Find any file whose name contains the control number (e.g., `6.1`) or clearly matches the control description.
3. If exactly one match: proceed with the full 7-step `complete` flow using that filename.
4. If multiple matches: list them and ask Rick to confirm which one.
5. If no match: tell Rick "No file found for {control} in Deliverables — drop the file in and run `/soc done {control}` again."

---

### `/soc complete <control> ["<filename>"]` — Mark a control collected

**Args format:** `complete 5.4` or `complete 5.4 "Infrastructure Change Management Policy.docx"`

**Step 1 — Determine filename.**
If filename is provided in args, use it. If not, check the Deliverables folder:
```bash
ls "c:/Users/rsnide/OneDrive - Revolution Group/Revolution Group - SOC Audit - 2026 - SOC Audit/Deliverables/"
```
Look for a file that matches the control number (e.g., "5.4" in the filename) or matches the control description. If found, use it. If multiple candidates exist, list them and ask Rick to confirm.

**Step 2 — Update `evidence-log.md`.**
Find the row matching the control number (format: `| {control} |`). Change the status field from `missing` or `in-progress` to `collected`. Set evidence location to `Deliverables\{filename}`.

**Step 3 — Update summary counts in `evidence-log.md`.**
Determine the matrix number from the control (e.g., control 5.4 → Matrix 5). Find the matrix row in the Summary table. Increment the Collected column by 1. Also increment the **Total** row's Collected column by 1.

**Step 4 — Update `build_tracker.py`.**
Find the tuple containing `"{control}"` (e.g., `"5.4"`). Change the status field (6th element) from `"missing"` or `"in-progress"` to `"collected"`. Set the evidence field (8th element) to `"Deliverables\\{filename}"`.

**Step 5 — Update `gaps.md`.**
Search for the control number in gaps.md. If found in a table row, wrap the item name in `~~strikethrough~~` and replace the Action with `✅ Collected — {filename} in Deliverables`.

**Step 6 — Regenerate the Excel tracker.**
```bash
cd "c:/Users/rsnide/OneDrive - Revolution Group/VS Workspace/AIS-OS/projects/soc-audit" && python build_tracker.py
```

**Step 7 — Confirm.**
Print: `✓ {control} marked collected. {collected}/{total} provide items done. {N} days to deadline.`

---

### `/soc update <control> <status> ["<filename>"]` — Update to any status

Same as `complete` but status can be: `missing`, `in-progress`, `collected`, `n/a`, `tbd`.

For `in-progress`, optionally accept an assignee after the filename: `/soc update 1.2 in-progress "" "Amy"`.

Follow the same 7-step process as `complete`, substituting the given status. For statuses other than `collected`, leave evidence location blank unless filename provided.

---

### `/soc status [matrix_num]` — Show status for all controls or one matrix

Read `evidence-log.md`. If a matrix number is given (e.g., `/soc status 6`), show only that matrix's controls. If no matrix given, show all matrices.

For each control show: control #, description (truncated to 45 chars), type, status. Color-code in output using emoji:
- 🔴 missing
- 🟡 in-progress
- 🟢 collected
- 🔵 remote (July visit)
- ⚪ tbd / n/a

End with the matrix summary line: `Matrix {N}: {collected}/{provide} collected`.

---

### `/soc archive` — Show reusable 2024 documents

Check the local Deliverables folder first for anything already collected. Then cross-reference with the known 2024 archive document inventory below. For each missing "provide" control, show whether a 2024 document exists that could satisfy it.

**Known 2024 archive documents** (from `Old Archive/2024 - SOC Audit/` on SharePoint):

| 2024 Document | Controls it can satisfy | Notes |
|---|---|---|
| 5.2-Business Continuity and Disaster Recovery Plan.docx | 5.2 | Last updated 2023-08-01. Needs annual review date for 2026. |
| Policies/ (folder with multiple policy docs) | 6.1, 6.17, 5.4, 5.10 | Check for InfoSec policy, data retention, change mgmt, SLA/RTO/RPO |
| Job descriptions (if present) | 1.7, 1.9 | Standing docs — check for vendor oversight language in 1.9 |
| Coding standards (if present) | 8.1 | May be N/A if no custom dev |
| Trade show / membership records | 1.17 | Year-specific — needs 2025-2026 dates |
| Performance review records | 1.22 | Year-specific — needs 2025-2026 data |
| SLA documentation | 5.10 | May exist as standing policy |
| Vendor agreements | 5.16 | Likely need current 2026 contract copies |

Print output as:

```
## Reusable 2024 archive documents

Still missing controls that may have 2024 versions:

| Control | Needed | 2024 Doc Available? | Action |
|---|---|---|---|
...

Controls with no known 2024 equivalent (need fresh docs):
...
```

**SharePoint archive path for browsing:**
`https://revgroup.sharepoint.com/sites/RevolutionGroup-SOCAudit/Shared%20Documents/SOC%20Audit/Old%20Archive/2024%20-%20SOC%20Audit/`

---

### `/soc list controls` — Full control list with associated files

Read `projects/soc-audit/soc1/evidence-log.md`. Print every **provide** control grouped by matrix. For each control show status emoji, control number, description, and file(s) on record. Skip remote and tbd controls except to note them as a group count at the end of each matrix section.

Output format per matrix:

```
## Matrix {N} — {Name}

| Control | Description | Status | File(s) |
|---|---|---|---|
| {emoji} {ctrl} | {description} | {status} | {filename(s) or "—"} |
...

_{N} remote items tested at July visit. {N} TBD — confirm with auditor._
```

Status emoji:
- 🟢 collected
- 🟡 in-progress (show assignee if set)
- 🔴 missing
- ⚪ tbd

End with a one-line summary: `**{collected}/{provide_total} provide items collected ({pct}%). {N} days to June 16.**`

Rules:
- For "Same as X.X" evidence entries, show `Same as {ctrl}` as the file reference.
- For long multi-file evidence strings, truncate filenames to basename only (strip path prefix).
- Remote-only matrices (Matrix 4) show only the footer line, no table.

---

### `/soc next` — Prioritized next steps

Read current status from `evidence-log.md`. Compute days remaining. Generate a prioritized action list based on:

1. **Effort vs. impact** — single docs that satisfy multiple controls go first
2. **Who can do it** — items Rick can do alone vs. items waiting on others
3. **Time sensitivity** — harder items that take more calendar time go earlier

Print:

```
## Next steps — {N} days to June 16

### Do today (quick, Rick alone)
{2-3 specific actions with exact control numbers}

### This week (moderate effort)
{3-5 actions, owner noted}

### Waiting on others
{items blocked on Amy or others}

### Screenshot sprint (30 min block)
{all screenshot items if not yet done}

### Lowest priority / confirm with auditor
{tbd items}
```

---

## Update rules — always follow these

1. **Never update one file without updating all three** (evidence-log, gaps, build_tracker.py).
2. **Always regenerate the Excel** after any status change.
3. **Summary counts in evidence-log.md must stay accurate.** When marking collected: increment matrix row Collected +1 and Total row Collected +1.
4. **Filenames are exact.** Use `ls` on the Deliverables folder to get the exact filename before writing it to any file. Do not guess.
5. **Evidence path format** in evidence-log.md: `Deliverables\{filename}` (backslash, no leading path).
6. **Evidence path format** in build_tracker.py: `"Deliverables\\{filename}"` (escaped backslash in Python string).
7. If the Excel save fails because the file is open, tell Rick: "Close the Excel file and I'll regenerate it."

## Context

- Revolution Group is an MSP. The SOC 1 Type 2 audit covers June 1, 2025 – May 31, 2026.
- Auditor: The Moore Group CPA, LLC. Audit manager: Jackson Moore.
- 50 "provide" documents due June 16, 2026. 57 "remote" items tested during Webex visit in July.
- Amy (internal) is handling controls 1.2 (staff list) and 1.4 (contractor list).
- HaloPSA is the ticketing system — controls 5.5, 5.6, 8.6, 8.7 need exported change ticket data from it.
- Screenshot items: 6.22, 6.23 (AD Group Policy), 6.29 (production AD/Azure AD), 5.11, 5.12 (NinjaOne monitoring), 5.19 (AV console).
- Controls 1.8, 1.10–1.13, 1.15, 1.18, 1.20 are type "tbd" — confirm with Jackson Moore before collecting.
- The security policy doc at `projects/policies/security-policy.md` satisfies control 6.1.

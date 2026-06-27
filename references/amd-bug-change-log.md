# AMD — Bug / Change-Request Log (live tracker)

**What:** The canonical bug/change/enhancement tracker for the **AMD (Account Management Dashboard)** — Vince's development project under RevonDB / Automation. Built collaboratively with Claude; ships in versioned releases tied to PRs.

**Live file (system of record — don't duplicate here):**
- **URL:** https://revgroup.sharepoint.com/:x:/r/sites/TSD/Shared%20Documents/General/Automation/RevonDB/amd-bug-change-log.xlsx?d=wfed83e9782b442e5b3a21ce21e15469e&csf=1&web=1&e=ekulM8
- **Path:** TSD site → Shared Documents → General → Automation → RevonDB → `amd-bug-change-log.xlsx`
- **Reach it via:** Microsoft 365 MCP (`sharepoint_search` for `amd-bug-change-log`, then `read_resource` on the file URI).

## How the sheet works

- **GREEN columns** (submitter fills): ID · Submitted Date · Submitted By · Type · Severity · Location/Feature · Description · Repro Steps/Context
- **BLUE columns** (engineering triage fills): Status · Assigned To · Target Release · Resolution Date · Resolved In · Notes
- **Types:** Bug · Change Request · Enhancement · Question · User Error
- **Submitters seen:** [Vince McCullum](../people/vincent-mccullum.md), [Erik Koval](../people/erik-koval.md), Joel (Skon), Zachary See, Sarah Chen (AM), Mike (AM), Claude

## Snapshot (read 2026-06-26)

- ~40 logged items (BUG-001, CR-002 … CR-039+); the large majority marked **Completed / Verified / Shipped**.
- Releases: **V1 SHIPPED** through **v1.4.0** (latest entries 2026-06-24, PRs to ~#120).
- Resolutions cite PR numbers, Key Vault overrides, and `.docx`/dashboard fixes — the sheet doubles as a release/audit trail.
- The dashboard pulls from HaloPSA, CIPP (M365 tenant data), and NinjaOne; many items are tenant-matching and reporting fixes.

> This snapshot ages fast — the sheet is live. Re-read it for current state rather than trusting the counts above.

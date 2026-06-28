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

## 2026-06-25 — Reply sent to auditor on the 10 outstanding requests

**Decision:** Sent reply to Jackson Moore (cc Matthew Brown) addressing all 10 outstanding information requests from his 6/23 list. Provided 6.27 (DB/app server list — "no servers" attestation) and 7.5 (Todyl IPS config screenshot). Requested two scope rulings: 7.9 marked **Not Applicable** (same basis as 6.27 — no app/DB servers, no internal DB admins) and **Matrix 8** (8.1, 8.2, 8.5, 8.6, 8.7, 8.8, 8.12) carved out as Not Applicable (no custom application development).

**Why:** Of the 10 outstanding, 7 (Matrix 8) and 7.9 rest on scope assumptions only the auditor can ratify. Self-certifying N/A risks inconsistency; better to state the position and let Jackson rule. The 3 type-mismatch items (6.27, 7.5, 7.9) were originally marked "remote" but Jackson wanted documents up front — 6.27 and 7.5 delivered, 7.9 pending his call.

**Status:** Awaiting Jackson's response on 7.9 + Matrix 8. All 50 "provide" documents now collected (100%). Field Visit draft due from auditor 7/09; audit 7/16; Matrix 1/Policies testing from auditor by 6/30.

**Owner:** Rick Snide

---

## 2026-06-26 — Added inbox/ and people/ to the AIOS (Karpathy LLM-Wiki gaps)

**Decision:** Added an `inbox/` drop zone with an ingestion rule in `CLAUDE.md`, and a `people/` folder of cross-project entity pages. Seeded `people/` with Polly Clavijo, Carlos Clavijo, Jackson Moore, Michael Sweet, Vincent McCullum.

**Why:** Audited the AIOS against the Karpathy "LLM Wiki" second-brain pattern. The AIOS already covers the pattern (CLAUDE.md schema, decisions log, connections registry, auto-memory hot cache). Only two gaps changed daily behavior: no capture-without-filing inbox, and people buried inside project files instead of being cross-project hubs. Used real markdown links (not `[[wikilinks]]`) since the repo has no wikilink renderer and Rick works in VS Code. Skipped the Obsidian-style graph viewer as not worth it at this repo size.

**Alternatives considered:** Build a local graph viewer; install Obsidian; adopt `[[wikilinks]]`; do nothing (already running the pattern).

**Owner:** Rick Snide

---

## 2026-06-26 — Evaluating Atakama as a Cisco Umbrella replacement (decision pending pilot)

**Decision:** Move forward with an internal pilot of **Atakama Browser Security** as a replacement for the Cisco Umbrella content-filtering line. Not a committed swap yet — pilot first, decide after. Full analysis: [projects/vince-projects/atakama-umbrella.md](../projects/vince-projects/atakama-umbrella.md) (source: Vince's 2026-06-26 comparison from Pax8 Beyond).

**Why:** Atakama does Umbrella's job (DNS + web content filtering) for **$0.35–$0.50 more per endpoint** and adds in-browser DLP, credential hygiene, SaaS/shadow-IT visibility, browser lock-down, MS-identity per-user management, and — the key hook — **GenAI data controls** that answer the "what are our people pasting into ChatGPT" risk clients are raising. SIEM integration would feed our Todyl MXDR stack. Timing fits: Umbrella term runs to ~November and Atakama gives a 3-month post-trial ramp, so no double-pay. Proposed GTM: hold $2.50 for existing clients (margin $1.50 → ~$1.00–1.15) for retention + upsell footprint; price the richer set higher for new clients.

**Risks / what would change the decision:** Atakama is a newer entrant to browser security (file-encryption heritage) — reference check pending; several headline features are roadmap not shipped (SIEM, AI controls, PSA/billing API in Q3); migrating the base off embedded Cisco is real work. A failed pilot on rollout friction or browser-enforcement impact kills it.

**Open next steps:** (1) run the pilot, (2) confirm exact current Umbrella SKU + ~Nov end date, (3) reference-check Atakama, (4) model existing-vs-new client pricing.

**Alternatives considered:** Stay on Cisco Umbrella; move up to Umbrella SIG Essentials/Advantage tiers for DLP (costs more than the Atakama delta).

**Owner:** Rick Snide (initiative driven by Vince McCullum)

---

## 2026-06-26 — One vault + two-tier memory (keep auto-memory outside the vault)

**Decision:** Keep a **single work vault** (AIS-OS), not separate vaults per topic. Keep the Claude **auto-memory** (`~/.claude/.../memory/`) where it is — outside the vault — as a derived hot cache, with the vault as the source of truth. Personal/medical stays out of the system entirely (unchanged).

**Why:** A second brain earns its value at the cross-links (TSD buyout ↔ payroll roster ↔ top-grading; Vince ↔ AMD ↔ Atakama). Splitting into multiple vaults severs those links and fragments context — the same reasoning as the 2026-05-12 "one workspace, not separate windows" call, one level up. The two-tier memory is sound: the vault is canonical/git-tracked/synced; the auto-memory is a fast-start cache that's machine-local and can drift stale, but is always reconstructable from the vault (confirmed when we refreshed stale BDM/TSD entries this session). `CLAUDE.md` already lives in the vault and stays there.

**What would change the decision:** A hard **sharing boundary** — wanting managers/team to co-own a slice (e.g. helpdesk playbooks, the AMD project) would justify spinning that shareable subset into its own repo. Audience, not subject matter, is the trigger.

**Alternatives considered:** Separate vaults per domain (MSP / TSD / EO); mirroring a session-summary `hot.md` into the vault for visibility (rejected as redundant with existing vault files).

**Owner:** Rick Snide

---

# Atakama vs. Cisco Umbrella

> 🔒 **Confidential — internal Revolution Group use only.** Atakama roadmap items are vendor-confidential; do not distribute externally.

**Owner:** [Vince McCullum](../../people/vincent-mccullum.md)
**Status:** Evaluation — trial accepted, pilot recommended
**Source:** `documents/atakama-vs-umbrella-comparison-2026-06-26.docx` (Vince, 2026-06-26; follow-up from Pax8 Beyond)

## The decision on the table

Replace our **Cisco Umbrella** content-filtering line with **Atakama Browser Security** (an MSP-built browser-security platform). Atakama does what Umbrella does for us today (DNS + web content filtering) and folds in browser control, in-browser DLP, credential hygiene, SaaS visibility, and a GenAI-data-control story.

## What Atakama is

Two components, both deployed via our RMM (straightforward install):
- **Agent** — DNS + web content filtering (network/endpoint, = today's Umbrella job) + controls which browsers may run (Edge, Chrome, Firefox).
- **Browser extension** — in-browser policy enforcement and page-level controls.
- Policy follows the user via **Microsoft sign-in**. Users not already signed into M365 in Chrome/Firefox sign in once (Atakama provides rollout collateral).

## Capability comparison (current Umbrella DNS-Security tier)

| Capability | Umbrella (current tier) | Atakama |
|---|---|---|
| DNS-layer threat blocking | Yes (Talos) | Yes |
| Category web content filtering | Yes (85+) | Yes |
| On/off-network installed agent | Yes (roaming) | Yes |
| Filters all device/app traffic | Yes (DNS layer) | Yes at DNS; deep controls browser-only |
| Deploys via RMM | Yes | Yes (agent + extension) |
| Lock which browsers can run | No | **Yes** |
| In-browser DLP (up/download block, PII mask, clipboard, watermark) | No | **Yes** |
| Credential hygiene (weak/reused/breached) | No | **Yes** |
| SaaS / shadow-IT visibility | No | **Yes** |
| Browser hardening | No | **Yes** |
| Per-user management | Cumbersome (known pain) | **Yes — MS identity-based** |
| GenAI data controls | No | Roadmap |
| SIEM integration | Yes (Cisco XDR) | Roadmap |
| Remote Browser Isolation | No | No |
| Threat-intel maturity | Strong (Talos, 30k+ orgs) | Newer entrant |
| PSA billing integration | Yes (via distributor) | Roadmap (API Q3) |

> Note: Umbrella's DLP/visibility features exist only on its pricier SIG Essentials/Advantage tiers — which cost more than the Atakama price delta. **Confirm our exact current Umbrella SKU.**

## Pricing & margin (per endpoint / month)

| Product | Our cost | We charge | Margin |
|---|---|---|---|
| Umbrella (today) | $1.00 | $2.50 | $1.50 |
| Atakama (1,000–5,000 endpoints) | $1.50 | $2.50* | $1.00 |
| Atakama (3-yr, 1,000-seat commit) | $1.35 | $2.50* | $1.15 |

Atakama costs **$0.35–$0.50 more per endpoint** than Umbrella.

## Proposed go-to-market

- **Existing clients:** migrate to Atakama, include the new features (DLP, credential hygiene, SaaS visibility, browser hardening) at **no extra charge**, hold $2.50. Margin drops $1.50 → ~$1.00–1.15. Trade margin for retention + a pre-deployed footprint to upsell later (GenAI data controls).
- **New clients:** price the richer set higher than today's Umbrella line to restore/expand margin. (Team to set exact number.)

## Risks / watch items

- Atakama is **newer to browser security** (file-encryption heritage) — do a reference check.
- Roadmap-not-shipped: SIEM, open APIs, parts of AI controls; **PSA/billing API is Q3**.
- Migrating the base off embedded Cisco is **real work**, not a flip-a-switch.
- One-time MS sign-in per non-MS browser is a minor user hurdle (collateral helps).

## Why it's compelling

The **GenAI data controls** directly answer the "what are our people pasting into ChatGPT" risk clients are raising — block risky AI apps, detect/block PII in AI chats, prevent company data from training models. Plus SIEM integration would feed our **Todyl SIEM / MXDR** stack. Roadmap also: macOS, Google Workspace identity, block personal accounts on managed devices, Click-Fix protection.

## Recommendation & next steps

Value is there; **not a blind swap.** Trial is accepted and contract timing lines up (Umbrella term runs to ~November — confirming; Atakama gives a 3-month ramp after trial, so no double-pay).

- [ ] Run an internal **pilot** — prove rollout friction + browser-enforcement impact
- [ ] Confirm exact current **Umbrella SKU/tier** and **end date (~Nov)**
- [ ] **Reference check** Atakama's browser-security product
- [ ] Model **existing-vs-new client pricing** split; set new-client price point

# Connections

Registry of every system your AIOS can reach. Filled by `/onboard` from Q4-Q7 answers; expanded over time as you wire new tools. `/audit` checks this file for domain coverage and freshness.

| # | Domain | Tool | Mechanism | Auth | Last checked |
|---|---|---|---|---|---|
| 1 | Revenue / Financials | HaloPSA + QuickBooks | mcp (StackJack) | claude.ai | 2026-05-12 |
| 2 | Customer interactions | HaloPSA (ticketing + email) | mcp (StackJack) | claude.ai | 2026-05-12 |
| 3 | Calendar | Outlook Calendar (Microsoft 365) | mcp (Microsoft 365) | claude.ai | 2026-05-12 |
| 4 | Communication | Outlook (external) + Microsoft Teams (internal) | mcp (Microsoft 365) | claude.ai | 2026-05-12 |
| 5 | CRM / Marketing | HubSpot | mcp (HubSpot) | claude.ai | 2026-05-24 |
| 6 | Project / task tracking | Microsoft Planner + OneNote (sporadic) | not yet connected | — | — |
| 7 | Meeting intelligence | Microsoft Teams built-in recordings | mcp (Microsoft 365) | claude.ai | 2026-05-12 |
| 8 | Knowledge / files | OneDrive / SharePoint (Microsoft 365) | mcp (Microsoft 365) | claude.ai | 2026-05-12 |

**Mechanism options:** `mcp` (MCP server), `script` (Python/Bash hitting an API, in `scripts/`), `export` (CSV/JSON dump pipeline), `key+ref` (`.env` key + `references/{tool}-api.md` guide), `not yet connected`.

When you wire a new tool, also save `references/{tool}-api.md` capturing endpoints, auth flow, and common queries — researched-once-saved-forever.

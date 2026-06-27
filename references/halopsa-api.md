# HaloPSA / StackJack API Reference

MCP provider: **StackJack** (`mcp__claude_ai_StackJack__*`)
Auth: claude.ai session (OAuth). Re-auth if tools return 401 or empty results unexpectedly.

---

## Ticket types

**Always resolve MSP type IDs before filtering tickets.**

```
Tool: halo_list_ticket_types  (no parameters)
Returns: array of { id, name, ... }
MSP types: any name starting with "MSP"
```

Extract the `id` values for MSP types and store them. Use as a post-filter on ticket results — the API itself doesn't accept a type filter on most list tools.

**Silent-zero failure mode:** if the call returns empty or fails, skip the filter and show all types. Note "(MSP filter unavailable)" inline. Never show 0 tickets because of a failed pre-flight.

---

## Overdue tickets

```
Tool: halo_list_overdue_sla_tickets  (no parameters)
Post-filter: tickettype_id in [MSP IDs]
```

Results include all teams TSD-wide. Filter to MSP after retrieval.

---

## SLA at-risk tickets

```
Tool: halo_sla_breach_alerts
Parameters: scope all teams, window next 4 hours
Post-filter: tickettype_id in [MSP IDs]
```

---

## Closed ticket leaderboard

```
Tool: halo_run_report
Parameters: reportId: 452  ("Closed Tickets - MSP - Past 32 days")
```

Report 452 is already MSP-filtered at the report level — no post-filter needed.

Each row has:
- `Date Closed` — ISO datetime string (e.g. `2026-06-13T14:22:00`)
- `Closed by Agent` — agent name string

**Always exclude "Aaron Bridges"** from leaderboard counts (manager account, inflates numbers).

Time windows are calculated manually from today's date — the report doesn't accept date range parameters:
- Yesterday: `Date Closed` starts with (today − 1 day) as `YYYY-MM-DD`
- Last 7 days: `[today − 7, yesterday]` inclusive
- MTD: `[first of current month, yesterday]` inclusive

---

## Known gotchas

- **No native MSP filter on ticket list tools.** Always use the Step 0 type-ID pre-flight pattern for overdue/SLA calls.
- **Report 451** (earlier attempt) — replaced by report 452 for the leaderboard. Don't use 451.
- **Empty agent names in report rows** — skip rows where `Closed by Agent` is blank.
- **Auth failures** return empty arrays, not errors — if results look implausibly empty, suspect auth first.

---

## SaneBox folder names (Outlook / M365)

Confirmed exact names in Rick's mailbox:
- `@SaneLater`
- `@SaneEO`

Use these directly in `outlook_email_search` folder parameter. No enumeration needed.

---

*Last updated: 2026-06-14. Source: daily-brief skill + scheduled task debugging (2026-05-14).*

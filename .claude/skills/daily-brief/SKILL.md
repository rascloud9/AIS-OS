---
name: daily-brief
description: Use every morning to get Rick's daily operating brief. Pulls today's calendar, team ticket health (overdue + SLA at-risk), agent closed-ticket leaderboard, priority inbox emails (Inbox + SaneBox folders), yesterday's decisions, and a top-priority anchor. Trigger on "morning brief", "daily brief", "what's on my plate today", or as a morning ritual.
---

## What this skill does

Opens Rick's day with a structured brief — calendar, ticket health, inbox, and priority anchor. Pulls live data from M365 and HaloPSA in parallel. Target: under 60 seconds, under 30 lines of output.

## Today's context

- **Date:** !`date +%Y-%m-%d`
- **User:** Rick Snide, CEO + Director of TSD, Revolution Group

## Execution

### Step 0: Resolve MSP ticket type IDs (do this first, before the main data pull)

Call `mcp__claude_ai_StackJack__halo_list_ticket_types` (no parameters needed). From the results, collect the `id` values for every ticket type whose name starts with "MSP". Store these as the **MSP type ID list**. Used in Step 1 to filter the overdue and SLA at-risk sections only — the leaderboard uses report 451 which is already MSP-filtered.

### Step 1: Read local files and pull live data — ALL IN PARALLEL

Do not wait for one source before starting the next. Fire everything at once.

**Local reads:**
- `context/priorities.md` — extract the #1 priority (first bullet)
- `decisions/log.md` — find entries dated yesterday. If none, note "None logged."

**M365 calendar:**
- Tool: `mcp__claude_ai_Microsoft_365__outlook_calendar_search`
- Scope: today's full day. Use `afterDateTime: "{today}T00:00:00"` and `beforeDateTime: "{today}T23:59:59"` (ISO format, today's date).
- Extract: time (ET, convert from UTC by subtracting 4h EDT or 5h EST), title, attendees (if any).
- Sort events by start time ascending. Skip events where `showAs` is "free" unless they look significant.

**Inbox emails:**
- Tool: `mcp__claude_ai_Microsoft_365__outlook_email_search`
- Scope: last 24 hours, main inbox, top 5 by importance
- Flag anything from clients, execs, or with urgent/action subject lines

**@SaneLater folder:**
- Tool: `mcp__claude_ai_Microsoft_365__outlook_email_search`
- Folder: `@SaneLater` (exact name, confirmed)
- Scope: last 24 hours, top 5

**@SaneEO folder:**
- Tool: `mcp__claude_ai_Microsoft_365__outlook_email_search`
- Folder: `@SaneEO` (exact name, confirmed)
- Scope: last 24 hours, top 7

**Overdue tickets:**
- Tool: `mcp__claude_ai_StackJack__halo_list_overdue_sla_tickets`
- Scope: all teams (TSD-wide)
- Post-filter: keep only tickets where `tickettype_id` is in the MSP type ID list from Step 0. **If the MSP type ID list is empty or Step 0 failed, skip the filter entirely and show all ticket types — note "(MSP filter unavailable)" inline.**

**SLA at-risk tickets:**
- Tool: `mcp__claude_ai_StackJack__halo_sla_breach_alerts`
- Scope: all teams, next 4 hours
- Post-filter: keep only tickets where `tickettype_id` is in the MSP type ID list from Step 0. **If the MSP type ID list is empty or Step 0 failed, skip the filter entirely and show all ticket types — note "(MSP filter unavailable)" inline.**

**Agent leaderboard — three time windows:**
- Tool: `mcp__claude_ai_StackJack__halo_run_report` with `reportId: 452` ("Closed Tickets - MSP - Past 32 days"). Each row has `Date Closed` (ISO datetime) and `Closed by Agent` (name string).
- Calculate the following date boundaries from today:
  - **Yesterday:** Date Closed starts with (today − 1 day)
  - **Last 7 days:** Date Closed in [today − 7 days, yesterday] inclusive
  - **Month to date:** Date Closed in [first day of current month, yesterday] inclusive
- Exclude any row where `Closed by Agent` is "Aaron Bridges".
- For each window, count tickets per agent (skip blank/empty agent names), rank descending. Take top 5 per window.
- Merge into a single combined table: collect every agent that appears in any top-5 window. For each agent, show their count in each window (show `—` if outside top 5 for that window). Sort rows by MTD descending.

**SaneBox folders — confirmed folder names:**
- `@SaneLater` and `@SaneEO` are confirmed exact names. Use these directly. No enumeration needed.

### Step 2: Compose and print the brief

Print exactly this structure. Tight. No commentary before or after.

---

```
# Morning Brief — {Day, Month D}

## Priority anchor
{#1 priority from priorities.md — one line, verbatim}

## Calendar
{HH:MM AM/PM — Event title (attendees if relevant), one line each}
{If clear: "Clear calendar today."}

## Ticket health
Overdue ({n}): {ticket ID + one-line summary + assignee. If >5, show top 5 + "and N more." Skip pure auto-alerts (Defender, Axcient, etc.) unless no human tickets exist.}
SLA at-risk next 4h ({n}): {ticket ID + one-line summary + time remaining}
{If both zero: "No overdue or at-risk tickets."}

## Agent leaderboard (Aaron Bridges excluded)
Agent                Yesterday   Last 7d   MTD
-------------------  ---------   -------   ---
{Name padded to 19}  {N or —}    {N or —}  {N or —}
{one row per agent, sorted by MTD desc; include all agents appearing in any top-5 window}

## Inbox
Priority ({n} new):
  {Sender — Subject}  [one line each, top 5]

@SaneLater ({n}):
  {Sender — Subject}  [top 5, or "Nothing new."]

@SaneEO ({n}):
  {Sender — Subject}  [top 5, or "Nothing new."]

## Yesterday's decisions
{Title of each entry dated yesterday, one line each. Or: "None logged."}
```

---

### Step 3: Surface one action

After the brief block, print a single line:

**→ First focus:** {the single most time-sensitive item — earliest meeting, most overdue ticket, or a client email needing a reply. One sentence, no hedging.}

---

## Rules

- If an MCP call fails, show "(unavailable)" in that section and continue. Partial brief > no brief.
- Keep total output under 40 lines.
- Don't narrate what you're doing. Print the brief.
- Ticket count of 0 in both overdue and at-risk = green flag, say so.
- SaneBox folder names vary by mailbox setup. Try with and without the `@` prefix.
- Overdue and SLA at-risk sections show MSP-type tickets only (filtered via Step 0 IDs). If Step 0 fails, note "(MSP filter unavailable — showing all types)" and continue. Leaderboard is always MSP-only via report 452.

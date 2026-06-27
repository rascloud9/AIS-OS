---
name: daily-brief
description: Use every morning to get Rick's daily operating brief. Pulls today's calendar, agent closed-ticket leaderboard, priority inbox emails (Inbox + SaneBox folders), yesterday's decisions, and a top-priority anchor. Trigger on "morning brief", "daily brief", "what's on my plate today", or as a morning ritual.
---

## What this skill does

Opens Rick's day with a structured brief — calendar, agent leaderboard, inbox, and priority anchor. Pulls live data from M365 and HaloPSA in parallel. Target: under 60 seconds, under 30 lines of output.

## Today's context

- **Date:** !`date +%Y-%m-%d`
- **User:** Rick Snide, CEO + Director of TSD, Revolution Group

## Execution

### Step 1: Read local files and pull live data — ALL IN PARALLEL

Do not wait for one source before starting the next. Fire everything at once.

**Local reads:**
- `context/priorities.md` — extract ALL numbered priorities (every line), preserve numbering
- `projects/todos/todos.md` — extract the full **Today** section. For each category (Business, Personal, EO, Follow-ups), collect all items and their markers. Marker key: `[ ]` = open, `[!]` = priority, `[x]` = done, `[>]` = migrated, `[o]` = event, `[-]` = note.
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

## Priorities (Q2/Q3)
{Each numbered priority from priorities.md, one line each. Mark any with a hard deadline in bold.}

## Today's to-dos
{For each category that has open items, show category name + items. Use ★ for [!] priority items, • for open, ✓ for done. Skip empty categories. Skip [x] done items unless all items in a category are done (then show "All done ✓"). Show Follow-ups only if ≤ 3 items; if more, summarize count.}

## Calendar
{HH:MM AM/PM — Event title (attendees if relevant), one line each}
{If clear: "Clear calendar today."}

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

**→ First focus:** {the single most time-sensitive item — a ★ priority to-do, earliest meeting, most overdue ticket, or a client email needing a reply. One sentence, no hedging.}

---

## Rules

- If an MCP call fails, show "(unavailable)" in that section and continue. Partial brief > no brief.
- Keep total output under 40 lines.
- Don't narrate what you're doing. Print the brief.
- SaneBox folder names vary by mailbox setup. Try with and without the `@` prefix.
- Leaderboard is always MSP-only via report 452.

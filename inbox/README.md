# Inbox

The single drop zone for anything unprocessed. The point is to **capture without filing** — paste a Teams thread, drop a meeting note, save a board packet, jot a decision you just made. Don't decide where it goes. That's the AIOS's job.

## How it works

1. **Drop.** Put anything here — a `.md` note, a pasted email, a screenshot, a file. No naming convention required.
2. **Process.** Say "process my inbox" (or the AIOS flags it at the start of a session when this folder isn't empty).
3. **File.** The AIOS extracts the durable parts — decisions, people, action items, project material — updates the right pages, then moves the raw original to `archives/inbox-processed/`.

Inbox-zero is the signal: if this folder is empty, everything's been absorbed into the system.

## What gets extracted to where

| Found in an item | Goes to |
|---|---|
| A decision + the why | `decisions/log.md` (Decision / Why / Alternatives / Owner) |
| A person who recurs across projects | `people/{name}.md` (new page or update existing) |
| An action item / next step | `projects/todos/todos.md` |
| Project-specific material | the matching `projects/{name}/` file |
| A reusable fact about a tool/system | `references/{tool}-api.md` or `connections.md` |

## Guardrail

**Medical, health, and personal-appointment data is never ingested, filed, or linked.** If it shows up in an item, the AIOS flags it and leaves it in place — it does not get absorbed into the system. This vault is work / Revolution Group / TSD / EO scope only. Personal-life material belongs elsewhere.

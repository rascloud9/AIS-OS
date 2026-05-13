# AIS-OS Intake

This is the source-of-truth file for your AIOS. Fill it in by typing, voice-pasting (Wispr Flow / OS dictation), or running `/onboard` for a guided conversation. Whichever mode, this file is what `/onboard` reads to scaffold your Day-1 setup.

**Hard cap: 7 questions.** Each answerable in under 60 seconds. Don't overthink — you can edit and re-run `/onboard` any time.

---

## Q1 — Who are you, what do you sell, who do you sell it to?

Identity, offer, ICP. One paragraph each is fine.

```
Rick Snide — Founder and CEO of Revolution Group (Westerville, Ohio, founded 1995). Also serving as Director of TSD (Technical Services Division). Background in software development and business consulting; now focused on team leadership, technical strategy, and sales.

Revolution Group provides Managed IT Security and Support. SMB clients get fully-managed IT (we act as their IT department). Mid-market clients get co-managed services — their internal IT handles Level 1 helpdesk, we manage the network, hosted security, hosted servers, and services.

Ideal customers are SMB and mid-market companies in Central Ohio. Currently ~50 clients on monthly MSP subscriptions. TSD division is ~30 people, fully remote.
```

---

## Q2 — Paste 1-2 things you've written recently. Don't edit them.

An email, a LinkedIn post, a DM, a doc — anything that sounds like you when you're not trying. **Paste verbatim.** Do not type these mid-conversation with Claude — chat-shaped samples are worse than no samples (voice contamination).

```
Sample 1 — Internal team message (casual)

March TSD Performance — Claude

This TSD_SLA_Analysis-March-2026-Claude.xlsx is what Claude created with last month's ticket data (and my prompts.)

I have not validated the numbers, but wanted to share it with you anyway. I will compare it to the Copilot/ChatGPT version and see if there are inconsistencies. Some of the tabs have a nice grouping function so you can see the details behind the summary. Be sure to check out the analysis tabs — recommendations for Client Attention and Agent Performance.
```

```
Sample 2 — Sales / proposal response (confident, direct)

Matt,

Please find attached our response to your RFP, and a sample version of our MSA. I will ultimately resend these to you via Docusign if we sign a deal. I took a page or two at the bottom of our proposal to consolidate the answers in the same format as your RFP to hopefully make it an easier read for you.

An even shorter summary for you is that we are very much a good fit for each other. We do everything you need and more. I think you would be very happy with our process of a single account manager guiding the relationship and bringing in a technical account manager / vCIO or the other project team members as needed. Your day-to-day support would be handled by an assigned technical team who would know your account well. And as I said before, we have lots of experience helping companies like yours and have helped many with acquisitions.

Please let me know if you need any clarifications, or anything else. I'll look forward to next steps with you!

My best,

Rick Snide
```

---

## Q3 — What are your 2-3 biggest priorities for the next 90 days?

Quarterly priorities. Not yearly aspirations. Things that, if not done by July, would make you say "I wasted Q2."

```
1. Top-grade the technical team — remove underperformers and replace with high-quality people to build a strong bench
2. Implement tools to improve helpdesk productivity — more tickets per person, faster resolution, fewer total tickets, automate some resolutions
3. Expand consultative services — upsell to existing clients (vCIO, strategic advisory, etc.)
4. SOC Audit Phase 1 (data collection) — HARD DEADLINE: May 15, 2026
```

---

## Q4 — Where does revenue actually land, and where is it tracked?

Multiple answers OK. Stripe? Skool? GoHighLevel? QuickBooks? A spreadsheet?

```
Invoices generated in HaloPSA, integrated with QuickBooks. Payments received in QuickBooks. Financial reporting (P&L, A/R, A/P) lives in QuickBooks. Monthly rolling financial spreadsheet used for analysis.
```

---

## Q5 — Where do you talk to customers, your team, and the outside world day-to-day?

Email (which one — Gmail / Outlook)? Slack? Teams? DMs (Skool / Discord / iMessage)? Phone?

```
External (customers, vendors): Outlook email. Ticket-related customer communication originates in HaloPSA but is delivered via email. Customers can also reach support by phone or support chat.
Internal (team): Microsoft Teams.
Calendar: Outlook Calendar (inferred from Outlook).
```

---

## Q6 — Where do meeting recordings, notes, and important docs live?

Granola? Otter? Fireflies? Google Drive? Notion? Dropbox? A folder on your desktop you keep meaning to organize?

```
Meeting recordings: Teams built-in. Docs: not explicitly specified — likely OneDrive/SharePoint given Microsoft 365 stack.
```

---

## Q7 — What's the one task that eats your week, and where do you currently track work?

The single biggest time-suck or recurring drudgery. Plus where tasks/projects live (ClickUp / Asana / Linear / Notion / a notebook).

```
Biggest time-suck: managing other people — check-ins, status updates, keeping projects moving.
Task/project tracking: no solid system. Sporadic use of Microsoft Planner and OneNote.
```

---

When this file is filled, run `/onboard` (or re-run it) and the wizard will scaffold your Day-1 file set: `context/`, `references/voice.md`, populated `connections.md`, and a filled `CLAUDE.md`.

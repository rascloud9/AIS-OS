---
name: update-claude
description: Update the Claude Code CLI to the latest version via npm. Trigger on "/update-claude", "update Claude Code", "is there a newer version of Claude Code", "bump Claude Code".
---

## What this skill does

Updates the globally-installed Claude Code npm package to the latest version. Rick's install is a global npm package (`@anthropic-ai/claude-code` at `AppData\Roaming\npm`), which does NOT auto-update — only the VS Code Marketplace wrapper extension does. This skill does the manual bump.

## Execution

### Step 1: Check current vs. latest BEFORE doing anything

```
claude --version
npm view @anthropic-ai/claude-code version
```

Compare the two. **If they already match, stop here** — report "already on latest (X.Y.Z)" and skip the rest. There's nothing to update, and attempting it will only fail on the file lock (see Step 2).

### Step 2: Run the update (only if a newer version exists)

```
npm install -g @anthropic-ai/claude-code@latest
```

**Critical — the running-session file lock:** Because this skill runs *inside* an active Claude Code session, Windows locks `claude.exe`. Two outcomes:

- `EPERM ... cleanup` warning → harmless, the package still installed.
- `EBUSY: resource busy or locked, copyfile ... claude.exe` → **hard failure, the update did NOT install.** The binary is locked by the running session and npm couldn't replace it.

If you hit EBUSY, do not retry in-session — it will keep failing. Tell Rick the reliable path: **close all Claude Code sessions and run `npm install -g @anthropic-ai/claude-code@latest` from a plain terminal** (PowerShell/Git Bash) with no session open.

### Step 3: Confirm the result

```
npm ls -g @anthropic-ai/claude-code --depth=0
claude --version
```

Report the before → after version numbers honestly. If EBUSY hit, the version will be unchanged — say so plainly.

### Step 4: Remind Rick to restart (only if the version actually changed)

The currently running VS Code session keeps using the OLD version in memory until restarted. Tell Rick to **reload the window** (`Ctrl+Shift+P` → "Developer: Reload Window") or close/reopen the Claude Code panel to pick up the new version.

---
title: Codex Setup
---

# Codex Setup

## What This Page Is For

Show the Codex-first path for using Superpowers skills in local repositories.

## When To Use This

Use this page when Codex is your main coding agent and you want the shortest path to practical skill discovery and activation.

## If You Only Remember One Thing

Codex discovers skills locally from `~/.agents/skills`, so make the Superpowers repository visible there and restart Codex after setup.

## Goal

Get Codex into a state where Superpowers skills are discoverable, reloadable, and easy to trigger by name.

This is the default setup path for the rest of the handbook. The Claude Code and Copilot pages only cover the parts that differ from this baseline.

## Prerequisites

- Codex installed and working locally
- Git installed
- access to the `obra/superpowers` repository or a local clone of it

## Install Path Or Command

The upstream Codex guide documents the current local layout and install flow: [Superpowers for Codex](https://github.com/obra/superpowers/blob/main/docs/README.codex.md).

The quick-install prompt sets up the local clone and the skills link so Codex can discover Superpowers automatically:

```text
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

If you want to install it yourself, use the documented local layout:

```bash
git clone https://github.com/obra/superpowers.git ~/.codex/superpowers
mkdir -p ~/.agents/skills
ln -s ~/.codex/superpowers/skills ~/.agents/skills/superpowers
```

On Windows, use a junction instead of a symlink:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.codex\superpowers\skills"
```

Restart Codex after creating or updating the link.

If you use Codex subagent skills such as `dispatching-parallel-agents` or `subagent-driven-development`, enable multi-agent support in the Codex config:

```toml
[features]
multi_agent = true
```

## Typical Usage Pattern

- name the skill explicitly before action, for example `use brainstorming`
- keep prompts task-oriented and short
- let the skill shape the process when the workflow is rigid

## Verification

- confirm `~/.agents/skills/superpowers` points to `~/.codex/superpowers/skills`
- start a fresh Codex session and ask: `use brainstorming to help me plan this feature`
- verify that Codex names the `brainstorming` skill or the `using-superpowers` workflow before it starts acting
- if Codex does not mention a skill, re-check the link or junction target and restart Codex

## Common Failure Modes

- the link or junction points to the wrong folder, so Codex scans an empty directory
- skills were copied under `~/.agents/skills` instead of being exposed through `~/.agents/skills/superpowers`
- Codex was not restarted after the link changed, so discovery never reran
- the prompt describes the task but never names the skill, so the intended skill does not activate

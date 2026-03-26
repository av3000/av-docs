---
title: Claude Code Setup
---

# Claude Code Setup

## What This Page Is For

Explain the Claude Code-specific install and activation path relative to the Codex-first flow.

## When To Use This

Use this after the Codex page if Claude Code is your agent and you want the Superpowers plugin path instead of the local Codex layout.

## If You Only Remember One Thing

Claude Code uses the marketplace or plugin flow, so install Superpowers there and then start a fresh session before testing skill discovery.

## Goal

Get Claude Code configured so Superpowers skills activate predictably without duplicating the Codex-specific local setup.

## Prerequisites

- Claude Code installed and working
- access to the Superpowers marketplace or plugin entry

## Install Path Or Command

The current official Claude Code baseline is documented in the [Claude Code quickstart](https://code.claude.com/docs/en/quickstart).

The current Superpowers install path is the official marketplace install documented in the [Superpowers README](https://github.com/obra/superpowers/blob/main/README.md):

```bash
/plugin install superpowers@claude-plugins-official
```

If you need the alternate marketplace flow from the same README, use:

```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

Keep the official marketplace path as the default here because it is shorter and clearer for first-time setup.

## Where Claude Code Differs

- the plugin install step is the primary setup mechanism
- activation should happen in a new Claude Code session after installation
- update behavior is plugin-based, not a local symlink refresh
- skill prompts should still name the skill when you want deterministic activation

## Verification

- start a new Claude Code session after the plugin install completes
- ask for a task that should trigger a Superpowers skill, for example `use brainstorming to help me plan this feature`
- confirm Claude Code invokes the expected skill instead of just answering generically
- if it does not, re-check the plugin install and start a new session again

## Common Failure Modes

- installing Claude Code but never running `claude` in a fresh session after plugin changes
- using the marketplace-add path but never installing the `superpowers` plugin from that marketplace
- expecting Codex-style local skill discovery instead of Claude Code's plugin-based activation
- asking for a vague outcome instead of naming the relevant skill, so activation stays generic

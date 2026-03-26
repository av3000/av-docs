---
title: AI Skills
---

# AI Skills

## What This Page Is For

This is the orientation page for the AI Skills handbook. It tells you what each layer of the ecosystem does and where to start, with Codex as the default reference point and short notes for Claude Code and GitHub Copilot only where the workflow changes.

## When To Use This

Use this handbook when you want one coherent guide for setup, workflow, and daily-use prompts instead of piecing the model together from multiple upstream repos.

## If You Only Remember One Thing

Treat skills as reusable instruction units, Agent Skills and `skills.sh` as the portability layer, and `superpowers` as the workflow system that tells you how to sequence them.

## The Stack In One View

- **Agent Skills / `skills.sh`**: Portable skill format and ecosystem layer
- **`anthropics/skills`**: Reference examples for Claude-oriented skills
- **`obra/superpowers`**: Workflow system for brainstorming, planning, TDD, review, and verification
- **`vercel-labs/agent-skills`**: Focused high-value skills for specific engineering tasks
- **GitHub Copilot customization docs**: Official guidance for skills and custom instructions in Copilot workflows

## Start Here

- `Setup`: start with [Codex Setup](./setup/codex.md), then read [Claude Code Setup](./setup/claude-code.md) or [GitHub Copilot Setup](./setup/github-copilot.md) only if your tool differs from the Codex baseline.
- `Core Workflow`: read [Core Concepts](./concepts/core-concepts.md), [Superpowers vs. Agent Skills](./concepts/superpowers-vs-agent-skills.md), [Superpowers](./libraries/superpowers.md), [Agent Skills And skills.sh](./libraries/agent-skills-and-skills-sh.md), [anthropics/skills](./libraries/anthropic-skills.md), and [Vercel Agent Skills](./libraries/vercel-agent-skills.md) to understand the layers before you start applying them.
- `Daily Templates`: use [Daily Command Combos](./templates/daily-command-combos.md) when you already understand the model and just need copy-paste prompts fast.

## Source References

- Use these for fast-moving install details and product-specific updates.
- [skills.sh FAQ](https://skills.sh/docs/faq)
- [anthropics/skills](https://github.com/anthropics/skills)
- [obra/superpowers](https://github.com/obra/superpowers)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- [GitHub Copilot docs](https://docs.github.com/en/copilot)

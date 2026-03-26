---
title: GitHub Copilot Setup
---

# GitHub Copilot Setup

## What This Page Is For

Cover the GitHub Copilot path that matters to this handbook: skills, custom instructions, and coding-agent customization only.

## When To Use This

Use this page if you want Copilot to participate in the same skills-oriented workflow model without turning this section into a general Copilot guide.

## If You Only Remember One Thing

For this handbook, Copilot matters where it supports reusable skills, repository guidance, and agent instructions, not as a catch-all documentation target.

## Goal

Get Copilot configured so repository-level or personal customizations can support the same practical workflows.

## Prerequisites

- GitHub Copilot available in the target environment
- access to the repository where repo-scoped skills or custom instructions will live
- a place to store personal skills if you want cross-repo reuse

## Skills Location

- project skills live in `.github/skills` or `.claude/skills`
- personal skills live in `~/.copilot/skills` or `~/.claude/skills`
- use the repo path when the skill is project-specific and the home path when you want reuse across projects

## Custom Instructions

- repository-wide instructions live in `.github/copilot-instructions.md`
- path-specific instructions live in `.github/instructions/*.instructions.md`
- agent instructions live in `AGENTS.md`
- nearest `AGENTS.md` wins when multiple agent instruction files exist in the tree
- keep `AGENTS.md` for agent behavior, `copilot-instructions.md` for repo-wide guidance, and `.instructions.md` files for scoped paths

## Commands

- `/skills list` shows the skills Copilot can currently see
- `/skills info` shows the source and location for a skill
- `/skills reload` refreshes skills after you add or edit them during a session

## Install Path Or Command

- create the skill in the repo or home directory that matches its intended scope
- add repository instructions in `.github/copilot-instructions.md` when you want default behavior for the repo
- add path-specific instructions under `.github/instructions` when behavior should depend on file location
- use `AGENTS.md` only for agent-oriented instructions that should take precedence near the file being edited

## Focus Areas

- agent skills for Copilot CLI
- custom instructions
- repository versus personal configuration locations
- nearest-file precedence for agent instructions

## Verification

- run `/skills list` and confirm the intended skill appears
- run `/skills info <skill-name>` for that skill and confirm the path matches the repo or personal location you expected
- after adding or changing a skill during the session, run `/skills reload`
- open a file covered by `.github/instructions/*.instructions.md` and ask a prompt that should follow those instructions
- verify that a nearby `AGENTS.md` overrides broader agent instructions when both exist

## Common Failure Modes

- mixing generic Copilot features into a skills-specific workflow doc
- putting a project skill in the home directory or a personal skill in the repository
- using `.github/copilot-instructions.md` when the guidance only applies to one file subtree
- forgetting that the nearest `AGENTS.md` file wins, which can make higher-level instructions look ignored
- adding skills but never running `/skills reload`, so the current session keeps the old view

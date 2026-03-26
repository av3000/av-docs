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

This page only covers the customization surface that materially affects skills-oriented work. It is not meant to replace the general Copilot docs.

## Prerequisites

- GitHub Copilot available in the target environment
- access to the repository where repo-scoped skills or custom instructions will live
- a place to store personal skills if you want cross-repo reuse

## Install Path Or Command

The GitHub Docs pages that matter here are [Create skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills) and [Add repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions).

Use these concrete locations:

- project skills: `.github/skills` or `.claude/skills`
- personal skills: `~/.copilot/skills` or `~/.claude/skills`
- repository-wide custom instructions: `.github/copilot-instructions.md`
- path-specific instructions: `.github/instructions/*.instructions.md`
- agent instructions: `AGENTS.md`

Keep the scope boundary clear:

- this page covers skills, custom instructions, and coding-agent customization only
- use the repo path when the skill is project-specific and the home path when you want reuse across projects
- nearest `AGENTS.md` wins when multiple agent instruction files exist in the tree

The Copilot CLI commands documented by GitHub are:

- `/skills list`
- `/skills info`
- `/skills reload`

## Focus Areas

- agent skills for Copilot CLI
- custom instructions
- repository versus personal configuration locations
- nearest-file precedence for agent instructions

If you are not using Copilot skills, custom instructions, or `AGENTS.md`, you can skip this page.

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

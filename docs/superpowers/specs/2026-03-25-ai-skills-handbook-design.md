---
title: AI Skills Handbook Design
description: Design spec for a Codex-led documentation section covering skills, Superpowers, Vercel agent skills, Claude Code, and GitHub Copilot.
---

# AI Skills Handbook Design

## Goal

Add a new documentation section to this Docusaurus site that explains how to work with AI skills in practice, with a primary focus on Codex and secondary notes for Claude Code and GitHub Copilot where behavior differs.

The handbook should help a reader:

- understand what a skill is
- understand how `skills.sh` and Agent Skills relate to concrete skill libraries
- use the `superpowers` workflow intentionally instead of as a black box
- use Vercel's `agent-skills` as high-value applied examples
- copy practical daily-use prompt templates and command combinations

## Problem

The current site has no AI-skills documentation area. The user wants a practical handbook that combines several upstream sources into one coherent, task-oriented guide instead of forcing readers to assemble the model themselves from external repositories and FAQs.

## Audience

Primary audience:

- developers using Codex in local repositories
- developers using Claude Code in local repositories
- developers using GitHub Copilot where skills, custom instructions, or coding-agent workflows are relevant

Secondary audience:

- readers evaluating skills-based workflows conceptually before choosing a tool

The writing should be cross-agent in explanation, but examples and operational snippets should be Codex-first. Claude Code and GitHub Copilot should be called out only where installation, invocation, or workflow behavior actually differs.

## Scope

### In Scope

- a new top-level `AI Skills` documentation area
- conceptual pages for skills, Agent Skills, `skills.sh`, and `superpowers`
- setup and usage pages for Codex, Claude Code, and GitHub Copilot
- practical coverage of `superpowers` core workflow
- practical coverage of Vercel's `agent-skills`
- daily-use templates with prompt recipes first and short supporting command blocks second
- sidebar and navbar updates required to expose the new section

### Out of Scope

- Cursor, OpenCode, Gemini CLI, or other agents
- full GitHub Copilot coverage beyond skills, custom instructions, and coding-agent-related workflows
- exhaustive catalogs of every upstream skill
- automated sync with upstream repositories
- deep skill authoring or publishing guides
- implementing search, analytics, or other unrelated site features

## Source Model

The handbook should present the ecosystem in layers:

1. `skills.sh` / Agent Skills
   The portable skill format and broader ecosystem layer.
2. `anthropics/skills`
   A reference implementation and example repository for Claude-oriented skills.
3. `obra/superpowers`
   A workflow system built on top of composable skills, with strong methodology around brainstorming, planning, TDD, verification, and review.
4. `vercel-labs/agent-skills`
   A concrete skill pack that demonstrates targeted, high-value skill usage in real coding workflows.
5. GitHub Copilot customization and agent-skills docs
   The official reference for how skills, custom instructions, prompt files, and custom agents map into Copilot workflows.
6. `everything-claude-code`
   A supporting reference for practical workflow inspiration, but not a primary structural dependency for this first pass.

## Information Architecture

Create a new `AI Skills` section with the following first-pass pages:

- `docs/ai/index.md`
  Landing page. Defines the stack in one screen and routes readers toward setup, workflow, or daily templates.
- `docs/ai/concepts/core-concepts.md`
  Defines skill, skill library, workflow layer, trigger behavior, portable format, and agent-specific differences.
- `docs/ai/concepts/superpowers-vs-agent-skills.md`
  Explains the relationship between `superpowers`, Agent Skills, `skills.sh`, Anthropic examples, and Vercel's skill pack.
- `docs/ai/setup/codex.md`
  Codex-first setup, verification, and usage guidance.
- `docs/ai/setup/claude-code.md`
  Claude Code setup and delta notes relative to Codex.
- `docs/ai/setup/github-copilot.md`
  GitHub Copilot setup focused on skills, custom instructions, and coding-agent-relevant usage patterns, including the repository and personal skill locations that matter for day-to-day use.
- `docs/ai/libraries/superpowers.md`
  Core usage of the Superpowers library and its workflow sequence.
- `docs/ai/libraries/agent-skills-and-skills-sh.md`
  What the portable skill layer is, why it matters, and how the FAQ-level concepts map to daily use.
- `docs/ai/libraries/anthropic-skills.md`
  What the Anthropic repository is for and how to treat it as a reference/examples source.
- `docs/ai/libraries/vercel-agent-skills.md`
  Focused page on Vercel's `agent-skills`, especially when to use `react-best-practices` and similar targeted skills.
- `docs/ai/templates/daily-command-combos.md`
  Copy-paste daily recipes with prompt-first templates and short command/install blocks.

## Navigation Design

Add a new sidebar, for example `aiSkillsSidebar`, in `sidebars.ts`, with this shape:

- `AI Skills`
- `Concepts`
- `Setup`
- `Libraries`
- `Templates`

Add a matching navbar item in `docusaurus.config.ts` so the section is discoverable without knowing direct doc URLs.

No footer changes are required in the first pass.

## Page Responsibilities

### Landing Page

The landing page should answer three questions immediately:

- What is a skill?
- How do `superpowers`, Agent Skills, and Vercel's skills relate?
- Where should I start if I use Codex, Claude Code, or GitHub Copilot?

It should end with three clear paths:

- setup
- core workflow
- daily templates

### Concepts Pages

The concepts pages should establish the mental model once so setup and library pages do not need to redefine terms. They should stay short and avoid turning into historical or standards-heavy documentation.

### Setup Pages

The setup pages should be operational and concise. They should include:

- goal
- prerequisites
- install path or install command
- how to verify installation
- common failure modes

The Codex page should lead. The Claude Code page should emphasize differences such as marketplace and plugin flows instead of duplicating shared concepts. The GitHub Copilot page should stay narrowly focused on skills, custom instructions, and coding-agent customization relevant to this handbook instead of expanding into a full Copilot product guide.

### Library Pages

The library pages should answer:

- what this project is
- when to use it
- what it is not
- what the user should copy into a real session

The `superpowers` page should explain the workflow order and why that order matters. The Vercel page should treat Vercel skills as targeted augmentations, not as a full process replacement.

### Templates Page

The templates page should be the highest-utility page in the section. Each template should use this pattern:

1. what this template is for
2. copy-paste prompt
3. expected agent behavior
4. optional command support
5. Codex vs Claude Code vs GitHub Copilot difference note, only if needed

## Initial Template Set

The first pass should include a compact set of daily-use recipes:

- start a feature with `superpowers`
- turn a rough idea into a spec
- ask for an implementation plan
- review a patch or branch
- verify a fix before calling it complete
- apply Vercel React best practices to a component or page
- compare `superpowers` workflow guidance with a narrower targeted skill

Each recipe should be short enough to scan quickly. Prompt text is the primary artifact. Command snippets are supporting material.

## Content Standards

The entire section should follow these writing rules:

- Codex-first snippets, Claude Code notes where behavior differs
- GitHub Copilot notes only where skills, custom instructions, or coding-agent behavior differ materially
- local explanation for stable concepts, upstream links for fast-moving install details
- practical, opinionated guidance over neutral cataloging
- no long lists of rarely used skills
- no unsupported claims about agent behavior
- explicit labels for tool-specific commands

Each page should begin with:

- what this page is for
- when to use this
- if you only remember one thing

## File and Ownership Boundaries

The implementation should be broken into a small number of focused edits:

- new docs under `docs/ai/`
- sidebar changes in `sidebars.ts`
- navbar exposure in `docusaurus.config.ts`

No homepage redesign is required.

## Risk Management

The biggest risks in this work are stale instructions and unclear boundaries between layers of the ecosystem.

Mitigations:

- link directly to upstream sources for install details likely to change
- keep local docs focused on workflow guidance and practical usage
- mark Codex-only, Claude-only, or Copilot-only commands clearly
- avoid over-expanding into other agents in the first pass

## Verification Requirements

Before the work is considered complete:

- the Docusaurus docs build must pass
- the new sidebar must render correctly
- navbar navigation to `AI Skills` must work
- internal doc links must resolve
- external links included in the new pages must be spot-checked
- the pages must read coherently as a single handbook, not as disconnected notes

## Acceptance Criteria

This spec is successful when:

- the site has a visible `AI Skills` section
- a Codex user can start with the landing page and reach setup, workflow, and daily recipes without needing outside context
- a Claude Code user can find only the differences that matter
- a GitHub Copilot user can find the skills/customization path relevant to this handbook without being dropped into unrelated Copilot features
- the relationship between `skills.sh`, Agent Skills, `anthropics/skills`, `superpowers`, and Vercel's `agent-skills` is clear
- the template page provides immediately reusable prompts for daily workflows

## Open Questions

None for the first pass. The design intentionally keeps the scope narrow so future iterations can add other agents or deeper skill-authoring material without restructuring the section.

## Source References

- [skills.sh FAQ](https://skills.sh/docs/faq)
- [anthropics/skills](https://github.com/anthropics/skills)
- [obra/superpowers](https://github.com/obra/superpowers)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- [GitHub Docs: Creating agent skills for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)
- [GitHub Docs: Overview of customizing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/overview)
- [GitHub Docs: Configure custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions)
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

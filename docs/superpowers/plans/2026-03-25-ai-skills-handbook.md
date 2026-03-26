# AI Skills Handbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Before the final completion claim, use `@verification-before-completion`.

**Goal:** Build a new `AI Skills` handbook in the Docusaurus site, covering Codex, Claude Code, GitHub Copilot, Superpowers, Agent Skills, and Vercel agent skills with practical setup guides and daily-use templates.

**Architecture:** Add a new manual docs section under `docs/ai/` and expose it through a dedicated sidebar plus a navbar entry. Implement the section incrementally: first ship the landing page and navigation shell, then add concepts, setup guides, library pages, and finally the high-utility templates page, verifying each slice with `npm run typecheck` and `npm run build`.

**Tech Stack:** Docusaurus 3, Markdown docs, TypeScript config (`sidebars.ts`, `docusaurus.config.ts`), npm scripts (`build`, `typecheck`)

---

### Task 0: Preflight And Execution Guardrails

**Files:**
- Modify: none
- Test: `package.json` scripts, git availability, current workspace state

- [ ] **Step 1: Verify the available validation commands**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run typecheck` exits `0`
- `npm run build` exits `0`

- [ ] **Step 2: Verify git works in this workspace before relying on commit steps**

Run:

```bash
git status --short
```

Expected:
- Either normal short status output
- Or a `safe.directory` warning that must be addressed before commit steps

If git reports dubious ownership, use one of these patterns for the rest of the plan:

```bash
git -c safe.directory='C:/Users/alana/Documents/projects/av-docusaurus-classic' status --short
```

Or configure it once:

```bash
git config --global --add safe.directory C:/Users/alana/Documents/projects/av-docusaurus-classic
```

- [ ] **Step 3: Confirm the implementation scope from the spec**

Read:

```text
docs/superpowers/specs/2026-03-25-ai-skills-handbook-design.md
```

Expected:
- Scope remains limited to Codex, Claude Code, and GitHub Copilot
- No extra agent pages are added

- [ ] **Step 4: Commit if preflight changes were required**

Run only if you changed repository configuration files that belong in the repo:

```bash
git add <changed-files>
git commit -m "chore: prepare ai skills docs implementation"
```

Expected:
- Clean preflight state for the feature work

### Task 1: Add The AI Skills Landing Page And Navigation Shell

**Files:**
- Create: `docs/ai/index.md`
- Modify: `sidebars.ts`
- Modify: `docusaurus.config.ts`
- Test: `npm run typecheck`, `npm run build`

- [ ] **Step 1: Write the failing navigation change**

Add a new sidebar entry and navbar item before creating the landing page file.

Update `sidebars.ts` with this new block near the other top-level sidebars:

```ts
  aiSkillsSidebar: [
    {
      type: "category",
      label: "AI Skills",
      items: ["ai/index"],
    },
  ],
```

Update `docusaurus.config.ts` inside `themeConfig.navbar.items` with:

```ts
        {
          type: "docSidebar",
          sidebarId: "aiSkillsSidebar",
          position: "right",
          label: "AI Skills",
        },
```

- [ ] **Step 2: Run build to verify the doc is missing**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run typecheck` passes
- `npm run build` fails because doc id `ai/index` does not exist yet

- [ ] **Step 3: Write the landing page**

Create `docs/ai/index.md` with this structure:

```md
---
title: AI Skills
---

# AI Skills

## What This Page Is For

This section explains how to use skills-based AI workflows in practice, with Codex as the primary example and focused notes for Claude Code and GitHub Copilot where they differ.

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

- Read the setup guides for Codex, Claude Code, and GitHub Copilot
- Read the `superpowers` workflow guide if you want an opinionated end-to-end process
- Use the daily command combos page when you need copy-paste prompts fast

## Source References

- [skills.sh FAQ](https://skills.sh/docs/faq)
- [anthropics/skills](https://github.com/anthropics/skills)
- [obra/superpowers](https://github.com/obra/superpowers)
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
```

- [ ] **Step 4: Run validation again**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run typecheck` exits `0`
- `npm run build` exits `0`

- [ ] **Step 5: Commit**

Run:

```bash
git add docs/ai/index.md sidebars.ts docusaurus.config.ts
git commit -m "docs: add ai skills landing page"
```

Expected:
- Landing page and navigation shell are committed

### Task 2: Add The Concepts Section

**Files:**
- Create: `docs/ai/concepts/core-concepts.md`
- Create: `docs/ai/concepts/superpowers-vs-agent-skills.md`
- Modify: `docs/ai/index.md`
- Modify: `sidebars.ts`
- Test: `npm run typecheck`, `npm run build`

- [ ] **Step 1: Extend the sidebar before the docs exist**

Update `sidebars.ts` to expand the AI Skills sidebar:

```ts
  aiSkillsSidebar: [
    {
      type: "category",
      label: "AI Skills",
      items: [
        "ai/index",
        {
          type: "category",
          label: "Concepts",
          items: [
            "ai/concepts/core-concepts",
            "ai/concepts/superpowers-vs-agent-skills",
          ],
        },
      ],
    },
  ],
```

- [ ] **Step 2: Run build to verify the concepts docs are missing**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run build` fails because the new concept doc ids do not exist yet

- [ ] **Step 3: Create `docs/ai/concepts/core-concepts.md`**

Use this content skeleton:

```md
---
title: Core Concepts
---

# Core Concepts

## What This Page Is For

Define the small set of terms you need before the rest of the handbook starts making sense.

## When To Use This

Read this before setup if the difference between a skill, a skill library, and a workflow system is still fuzzy.

## If You Only Remember One Thing

A skill is a reusable instruction package; the rest of the ecosystem is about how those packages are installed, shared, triggered, and composed.

## Core Terms

### Skill

A reusable instruction package that gives an agent a focused capability or workflow.

### Skill Library

A collection of related skills, often organized around a tool, workflow, or domain.

### Workflow Layer

A higher-level system that sequences multiple skills into a development process.

### Agent-Specific Integration

The local install path, marketplace flow, or tool configuration that makes a skill available in a particular agent.

## Stable Concepts Versus Fast-Moving Details

- Keep local docs for the stable concepts
- Link upstream for install commands and platform-specific changes
```

- [ ] **Step 4: Create `docs/ai/concepts/superpowers-vs-agent-skills.md`**

Use this content skeleton:

```md
---
title: Superpowers Vs Agent Skills
---

# Superpowers Vs Agent Skills

## What This Page Is For

Explain how the main upstream sources fit together instead of treating them as competing products.

## When To Use This

Use this when you want to understand whether you need a portable skill, a skill library, or a full workflow system.

## If You Only Remember One Thing

`superpowers` tells you how to work; Agent Skills and `skills.sh` help define and distribute the reusable skill units that workflows build on top of.

## The Relationship

- **Agent Skills / `skills.sh`**: portability and packaging layer
- **`anthropics/skills`**: reference examples and conventions
- **`superpowers`**: opinionated process layer
- **Vercel agent skills**: practical, targeted skill pack

## How To Choose

- Use Agent Skills concepts when you care about portability
- Use `superpowers` when you want an end-to-end engineering workflow
- Use Vercel skills when you want narrow task-specific guidance
```

- [ ] **Step 5: Link the concepts from the landing page**

Update the `## Start Here` section in `docs/ai/index.md` to use real relative links:

```md
- Read [Core Concepts](./concepts/core-concepts.md) if you need the shared vocabulary first
- Read [Superpowers Vs Agent Skills](./concepts/superpowers-vs-agent-skills.md) to understand how the ecosystem fits together
```

- [ ] **Step 6: Run validation**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- both commands exit `0`

- [ ] **Step 7: Commit**

Run:

```bash
git add docs/ai/index.md docs/ai/concepts/core-concepts.md docs/ai/concepts/superpowers-vs-agent-skills.md sidebars.ts
git commit -m "docs: add ai skills concepts section"
```

Expected:
- Concepts section is committed and visible

### Task 3: Add Setup Guides For Codex, Claude Code, And GitHub Copilot

**Files:**
- Create: `docs/ai/setup/codex.md`
- Create: `docs/ai/setup/claude-code.md`
- Create: `docs/ai/setup/github-copilot.md`
- Modify: `docs/ai/index.md`
- Modify: `sidebars.ts`
- Test: `npm run typecheck`, `npm run build`

- [ ] **Step 1: Extend the sidebar with setup doc ids before the files exist**

Update `sidebars.ts`:

```ts
        {
          type: "category",
          label: "Setup",
          items: [
            "ai/setup/codex",
            "ai/setup/claude-code",
            "ai/setup/github-copilot",
          ],
        },
```

- [ ] **Step 2: Run build to verify the setup docs are missing**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run build` fails because the setup doc ids do not exist yet

- [ ] **Step 3: Create `docs/ai/setup/codex.md`**

Use this structure:

```md
---
title: Codex Setup
---

# Codex Setup

## What This Page Is For

Show the Codex-first path for using skills in local repositories.

## When To Use This

Use this page when Codex is your main coding agent and you want the shortest path to practical skill usage.

## If You Only Remember One Thing

Keep Codex examples first-class in this handbook and treat agent-specific differences as deltas, not parallel universes.

## Goal

Get Codex into a state where skill-driven workflows are predictable and repeatable.

## Prerequisites

- local Codex environment working
- access to the repository containing your skill files or installed skill libraries

## Install Path Or Command

- document the Codex-relevant local skill location used in your environment
- if installation is command-driven, show the exact command block and label it as environment-specific

## Typical Usage Pattern

- ask Codex to use a named skill before action
- keep prompts task-oriented
- let the skill drive the process when the skill is rigid

## Verification

- confirm the expected skill files are present
- run a small request that should trigger the installed skill

## Common Failure Modes

- skill files exist but are not loaded from the expected location
- prompts describe the task but never name the skill
```

- [ ] **Step 4: Create `docs/ai/setup/claude-code.md`**

Use this structure:

```md
---
title: Claude Code Setup
---

# Claude Code Setup

## What This Page Is For

Explain the Claude Code-specific differences relative to the Codex-first flow.

## When To Use This

Use this after reading the Codex page if you need the marketplace or plugin-specific path.

## If You Only Remember One Thing

The shared skill model matters more than the tool, but Claude Code installation and activation can differ from Codex.

## Goal

Get Claude Code configured for the same practical workflows without duplicating the whole handbook.

## Prerequisites

- Claude Code installed and working in the local environment
- access to the skill pack source, plugin entry, or marketplace listing you intend to use

## Install Path Or Command

- show the Claude Code marketplace or plugin flow when it differs from Codex
- include the exact install command only when it is stable enough to be worth localizing in the handbook

## Where Claude Code Differs

- marketplace and plugin flows
- explicit skill invocation conventions
- install and update flow for skill packs

## Verification

- confirm Claude Code can access the installed skill pack
- run one controlled prompt that should trigger a known skill

## Common Failure Modes

- relying on vague prompts instead of named skills
- installing a skill pack but never exposing it to the active workspace
```

- [ ] **Step 5: Create `docs/ai/setup/github-copilot.md`**

Use this structure:

```md
---
title: GitHub Copilot Setup
---

# GitHub Copilot Setup

## What This Page Is For

Cover the GitHub Copilot path that matters to this handbook: skills, custom instructions, and coding-agent customization.

## When To Use This

Use this page if you want Copilot to participate in the same skills-oriented workflow model without turning this section into a general Copilot guide.

## If You Only Remember One Thing

For this handbook, Copilot matters where it supports reusable skills and custom guidance, not as a catch-all documentation target.

## Goal

Get Copilot configured so repository-level or personal customizations can support the same practical workflows.

## Prerequisites

- GitHub Copilot available in the target environment
- access to the repository where repo-scoped skills or custom instructions will live

## Install Path Or Command

- show the Copilot-relevant repository and personal customization locations
- include the official command or file-based setup path only for the skills/customization features covered by this handbook

## Focus Areas

- agent skills for Copilot CLI
- custom instructions
- repository versus personal configuration locations

## Verification

- confirm Copilot sees the intended custom instructions or skills
- run a small prompt that depends on the installed customization

## Common Failure Modes

- mixing generic Copilot features into a skills-specific workflow doc
- writing repository guidance without clarifying whether it is repo-scoped or user-scoped
```

- [ ] **Step 6: Update the landing page setup links**

Update `docs/ai/index.md` so `## Start Here` includes:

```md
- Start with [Codex Setup](./setup/codex.md) if Codex is your main agent
- Read [Claude Code Setup](./setup/claude-code.md) for the marketplace and activation differences
- Read [GitHub Copilot Setup](./setup/github-copilot.md) for skills and custom-instruction customization paths
```

- [ ] **Step 7: Run validation**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- both commands exit `0`

- [ ] **Step 8: Commit**

Run:

```bash
git add docs/ai/index.md docs/ai/setup/codex.md docs/ai/setup/claude-code.md docs/ai/setup/github-copilot.md sidebars.ts
git commit -m "docs: add ai skills setup guides"
```

Expected:
- setup section is committed and linked from the landing page

### Task 4: Add The Core Library Pages

**Files:**
- Create: `docs/ai/libraries/superpowers.md`
- Create: `docs/ai/libraries/agent-skills-and-skills-sh.md`
- Create: `docs/ai/libraries/anthropic-skills.md`
- Modify: `docs/ai/index.md`
- Modify: `sidebars.ts`
- Test: `npm run typecheck`, `npm run build`

- [ ] **Step 1: Extend the sidebar with the first library pages before creating them**

Update `sidebars.ts`:

```ts
        {
          type: "category",
          label: "Libraries",
          items: [
            "ai/libraries/superpowers",
            "ai/libraries/agent-skills-and-skills-sh",
            "ai/libraries/anthropic-skills",
          ],
        },
```

- [ ] **Step 2: Run build to verify the library docs are missing**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run build` fails because the library doc ids do not exist yet

- [ ] **Step 3: Create `docs/ai/libraries/superpowers.md`**

Use this structure:

```md
---
title: Superpowers
---

# Superpowers

## What This Page Is For

Explain the core Superpowers workflow and why it should be used intentionally rather than as a bag of random skills.

## When To Use This

Use this page when you want the full sequence for feature work, debugging, planning, verification, and branch finishing.

## If You Only Remember One Thing

`superpowers` is valuable because it imposes process discipline: brainstorm first, write the spec, write the plan, implement with the right sub-skill, verify before claiming success.

## The Core Sequence

1. `using-superpowers`
2. `brainstorming`
3. `writing-plans`
4. implementation sub-skill such as `subagent-driven-development` or `executing-plans`
5. `verification-before-completion`
6. optional review and branch-finishing skills

## What Superpowers Is Not

- not just a bag of prompts
- not a replacement for understanding the codebase
- not the same thing as the portable skill format
```

- [ ] **Step 4: Create `docs/ai/libraries/agent-skills-and-skills-sh.md`**

Use this structure:

```md
---
title: Agent Skills And skills.sh
---

# Agent Skills And skills.sh

## What This Page Is For

Explain the portability layer and why it matters if you want reusable skills outside a single tool.

## When To Use This

Use this page when you care about how skills are packaged, installed, and shared.

## If You Only Remember One Thing

This layer is about portability and distribution, not about prescribing a full engineering workflow.

## Why It Matters

- skills can be reused across tools that support the same conventions
- installation and discovery stay more consistent
- libraries can be published and reused without rewriting the idea each time
```

- [ ] **Step 5: Create `docs/ai/libraries/anthropic-skills.md`**

Use this structure:

```md
---
title: anthropics/skills
---

# anthropics/skills

## What This Page Is For

Explain how to use the Anthropic repository as a reference source for conventions and examples.

## When To Use This

Use this page when you want examples of how skills are structured or how a reference library organizes them.

## If You Only Remember One Thing

Treat `anthropics/skills` as a reference implementation and example set, not as the whole ecosystem.

## Practical Takeaways

- study naming and organization patterns
- reuse ideas, not blind copies
- map the examples back to your actual agent and workflow
```

- [ ] **Step 6: Link the library pages from the landing page**

Update `docs/ai/index.md` with:

```md
- Read [Superpowers](./libraries/superpowers.md) for the opinionated workflow layer
- Read [Agent Skills And skills.sh](./libraries/agent-skills-and-skills-sh.md) for the portability layer
- Read [anthropics/skills](./libraries/anthropic-skills.md) as a reference/examples source
```

- [ ] **Step 7: Run validation**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- both commands exit `0`

- [ ] **Step 8: Commit**

Run:

```bash
git add docs/ai/index.md docs/ai/libraries/superpowers.md docs/ai/libraries/agent-skills-and-skills-sh.md docs/ai/libraries/anthropic-skills.md sidebars.ts
git commit -m "docs: add ai skills library foundations"
```

Expected:
- foundational library pages are committed

### Task 5: Add The Vercel Guide And Daily Command Combos

**Files:**
- Create: `docs/ai/libraries/vercel-agent-skills.md`
- Create: `docs/ai/templates/daily-command-combos.md`
- Modify: `docs/ai/index.md`
- Modify: `sidebars.ts`
- Test: `npm run typecheck`, `npm run build`

- [ ] **Step 1: Extend the sidebar with the final doc ids before creating them**

Update `sidebars.ts` so the `Libraries` and `Templates` categories become:

```ts
        {
          type: "category",
          label: "Libraries",
          items: [
            "ai/libraries/superpowers",
            "ai/libraries/agent-skills-and-skills-sh",
            "ai/libraries/anthropic-skills",
            "ai/libraries/vercel-agent-skills",
          ],
        },
        {
          type: "category",
          label: "Templates",
          items: ["ai/templates/daily-command-combos"],
        },
```

- [ ] **Step 2: Run build to verify the final docs are missing**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- `npm run build` fails because the new final doc ids do not exist yet

- [ ] **Step 3: Create `docs/ai/libraries/vercel-agent-skills.md`**

Use this structure:

```md
---
title: Vercel Agent Skills
---

# Vercel Agent Skills

## What This Page Is For

Show how Vercel's skill pack fits into a practical engineering workflow.

## When To Use This

Use this page when you want narrow, high-value guidance rather than a full methodology.

## If You Only Remember One Thing

Vercel skills are strong targeted augmentations; they complement broader workflows like `superpowers` instead of replacing them.

## Practical Uses

- `react-best-practices` and other framework-targeted checks
- focused performance guidance
- framework-specific guardrails for UI work

## How It Fits With Superpowers

- use `superpowers` to control process
- use Vercel skills when the task narrows to a framework-specific implementation concern
```

- [ ] **Step 4: Create `docs/ai/templates/daily-command-combos.md`**

Use this structure and keep the prompts copy-paste ready:

```md
---
title: Daily Command Combos
---

# Daily Command Combos

## What This Page Is For

Give readers high-utility prompt recipes they can paste into Codex, Claude Code, or GitHub Copilot-oriented workflows.

## When To Use This

Use this page when you already understand the ecosystem and just need the fastest way to start work.

## If You Only Remember One Thing

Use prompt recipes as the primary artifact and keep shell commands as short supporting blocks.

## Start A Feature With Superpowers

### Use This Prompt

```text
Use using-superpowers, then brainstorming, and help me turn this feature idea into an approved spec before implementation.
```

### Expected Agent Behavior

- identify the relevant skills first
- gather repo context
- ask clarifying questions
- propose approaches before implementation

### Optional Command Support

```bash
git status --short
npm run typecheck
```

## Ask For An Implementation Plan

### Use This Prompt

```text
Use writing-plans and turn the approved spec into a task-by-task implementation plan with exact files, commands, and verification steps.
```

### Optional Command Support

```bash
Get-Content -Raw .\docs\superpowers\specs\2026-03-25-ai-skills-handbook-design.md
```

## Review A Patch Or Branch

### Use This Prompt

```text
Review this change like a code reviewer. Focus on bugs, regressions, risks, and missing tests before summary.
```

### Optional Command Support

```bash
git diff --stat
git diff -- docs/ai sidebars.ts docusaurus.config.ts
```

## Verify A Fix Before Completion

### Use This Prompt

```text
Use verification-before-completion and confirm the fix with real commands before claiming success.
```

### Optional Command Support

```bash
npm run typecheck
npm run build
```

## Apply Vercel React Best Practices

### Use This Prompt

```text
Use the vercel react best-practices skill and review this component for rendering, data flow, and performance issues.
```

### Optional Command Support

```bash
rg -n "React|useEffect|useMemo|useCallback" docs src
```

## Notes On Agent Differences

- Codex examples lead this handbook
- Claude Code differences should only be called out when install or activation changes
- GitHub Copilot notes should stay focused on skills and custom instructions
```

- [ ] **Step 5: Link the final pages from the landing page**

Update `docs/ai/index.md` with:

```md
- Read [Vercel Agent Skills](./libraries/vercel-agent-skills.md) for targeted skill usage
- Use [Daily Command Combos](./templates/daily-command-combos.md) for copy-paste prompt recipes
```

- [ ] **Step 6: Run validation**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- both commands exit `0`

- [ ] **Step 7: Commit**

Run:

```bash
git add docs/ai/index.md docs/ai/libraries/vercel-agent-skills.md docs/ai/templates/daily-command-combos.md sidebars.ts
git commit -m "docs: add vercel skills guide and daily templates"
```

Expected:
- final content pages are committed

### Task 6: Final Handbook Polish And Verification

**Files:**
- Modify: `docs/ai/index.md`
- Modify: `docs/ai/concepts/core-concepts.md`
- Modify: `docs/ai/concepts/superpowers-vs-agent-skills.md`
- Modify: `docs/ai/setup/codex.md`
- Modify: `docs/ai/setup/claude-code.md`
- Modify: `docs/ai/setup/github-copilot.md`
- Modify: `docs/ai/libraries/superpowers.md`
- Modify: `docs/ai/libraries/agent-skills-and-skills-sh.md`
- Modify: `docs/ai/libraries/anthropic-skills.md`
- Modify: `docs/ai/libraries/vercel-agent-skills.md`
- Modify: `docs/ai/templates/daily-command-combos.md`
- Test: `npm run typecheck`, `npm run build`

- [ ] **Step 1: Do one focused editorial pass for consistency**

Check every page for:

- the three opening sections:
  - `What This Page Is For`
  - `When To Use This`
  - `If You Only Remember One Thing`
- Codex-first snippets
- Claude Code notes only when behavior differs
- GitHub Copilot notes only when skills or custom instructions differ materially
- upstream links for fast-moving details

- [ ] **Step 2: Tighten any page that reads like a link dump**

Apply these rules:

- replace generic link lists with short practical takeaways
- remove repeated definitions already covered in `core-concepts.md`
- keep the section opinionated and task-oriented

- [ ] **Step 3: Run the final validation commands**

Run:

```bash
npm run typecheck
npm run build
```

Expected:
- both commands exit `0`
- no new Docusaurus type or build errors

- [ ] **Step 4: Spot-check the final navigation structure**

Confirm:

- navbar contains `AI Skills`
- sidebar contains `Concepts`, `Setup`, `Libraries`, and `Templates`
- every sidebar item resolves to a real page

- [ ] **Step 5: Spot-check the external references added in the handbook**

Confirm:

- GitHub links resolve for `skills.sh`, `anthropics/skills`, `obra/superpowers`, and `vercel-labs/agent-skills`
- GitHub Docs links resolve for the Copilot pages

- [ ] **Step 6: Commit**

Run:

```bash
git add docs/ai sidebars.ts docusaurus.config.ts
git commit -m "docs: finalize ai skills handbook"
```

Expected:
- complete handbook committed with passing verification

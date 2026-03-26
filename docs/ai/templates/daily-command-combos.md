---
title: Daily Command Combos
---

# Daily Command Combos

## What This Page Is For

Give readers quick prompt recipes they can paste into Codex first, then adapt to Claude Code or GitHub Copilot when the loading path differs.

## When To Use This

Use this page when you already know the handbook shape and just want the fastest way to start a common task.

## If You Only Remember One Thing

Use the prompt text as the primary artifact, keep the shell commands short and supportive, and treat the Codex wording as the default version unless a tool-specific note says otherwise.

## Start A Feature With Superpowers

### What This Template Is For

Kick off a non-trivial feature using the `superpowers` workflow instead of jumping straight into implementation.

### Use This Prompt

```text
Use using-superpowers, then brainstorming, and help me turn this feature idea into an approved spec before implementation.
```

### Expected Agent Behavior

- identify the relevant skills first
- gather repo context
- ask one clarifying question at a time
- propose approaches before implementation

### Optional Command Support

```bash
git status --short
npm run typecheck
```

### Agent Difference Note

Use the same prompt text in Codex and Claude Code after the skill pack is installed. In GitHub Copilot, translate this into the equivalent repo skill or instruction flow if the exact `superpowers` skills are not available by name.

## Turn A Rough Idea Into A Spec

### What This Template Is For

Turn an unstructured idea into a bounded design before any code changes begin.

### Use This Prompt

```text
Use brainstorming and help me turn this rough idea into a short, approved design that stays focused on the smallest useful change.
```

### Expected Agent Behavior

- explore the current repo context
- propose a small number of approaches
- surface the trade-offs clearly
- stop before implementation until the design is agreed

### Optional Command Support

```bash
git diff --stat
```

### Agent Difference Note

In Codex, naming `brainstorming` directly is the clearest path. In Claude Code, use the same wording once the plugin is active. In GitHub Copilot, use the same intent but rely on the repo's installed skills or custom instructions if the exact skill name is unavailable.

## Ask For An Implementation Plan

### What This Template Is For

Convert an approved design into a task-by-task execution plan with explicit files, commands, and checks.

### Use This Prompt

```text
Use writing-plans and turn the approved spec into a task-by-task implementation plan with exact files, commands, and verification steps.
```

### Expected Agent Behavior

- break the work into small tasks
- name the exact files to change
- include commands and expected results
- keep the steps ready for execution

### Optional Command Support

```bash
rg --files . | rg "spec|design|plan"
```

### Agent Difference Note

Codex examples can name `writing-plans` directly. In Claude Code, the same prompt works after installation. In GitHub Copilot, use the same planning request only if your repo exposes an equivalent planning skill or instruction set.

## Review A Patch Or Branch

### What This Template Is For

Ask for a code-review pass that prioritizes bugs, regressions, and missing tests over summary.

### Use This Prompt

```text
Review this change like a code reviewer. Focus on bugs, regressions, risks, and missing tests before summary.
```

### Expected Agent Behavior

- lead with findings
- call out risk and behavior changes
- keep the summary secondary

### Optional Command Support

```bash
git diff --stat
git diff -- .
```

## Verify A Fix Before Completion

### What This Template Is For

Force the agent to prove a fix with real commands before it claims the work is done.

### Use This Prompt

```text
Use verification-before-completion and confirm the fix with real commands before claiming success.
```

### Expected Agent Behavior

- run the relevant checks
- report the actual outcome
- avoid claiming success before verification

### Optional Command Support

```bash
npm run typecheck
npm run build
```

### Agent Difference Note

This works best when the tool can run local verification commands. In Codex and Claude Code, that usually means direct command execution. In GitHub Copilot, use the same prompt only if the environment can actually run and report those checks.

## Apply Vercel React Best Practices

### What This Template Is For

Run a narrow React or Next.js performance review without replacing the broader workflow around the change.

### Use This Prompt

```text
Use vercel-react-best-practices and review this React component for rendering behavior, data flow, and performance issues.
```

### Expected Agent Behavior

- focus on the component or page at hand
- check for React-specific performance or structure issues
- keep the review narrow and practical

### Optional Command Support

```bash
rg -n "React|useEffect|useMemo|useCallback" src docs
```

### Agent Difference Note

In this Codex setup, the installed skill name is `vercel-react-best-practices`. Other agents may expose the upstream `react-best-practices` skill name or package it differently.

## Compare A Broad Workflow With A Narrow Skill

### What This Template Is For

Decide whether the task needs a full workflow wrapper or only a narrow targeted skill.

### Use This Prompt

```text
Compare superpowers with vercel-react-best-practices and tell me which one should drive this task.
```

### Expected Agent Behavior

- separate process guidance from targeted component guidance
- keep the workflow layer and the review skill in their proper roles
- recommend the narrower skill only when the task really is local and specific

### Optional Command Support

```bash
git diff --stat
```

## Notes On Agent Differences

- The prompt text is usually the same across Codex, Claude Code, and GitHub Copilot.
- The real difference is how each tool loads or activates the skill and where the instructions live.
- Keep the Codex phrasing as the default, then adjust only the install or activation mechanics per tool.

---
title: Daily Command Combos
---

# Daily Command Combos

## What This Page Is For

Give readers quick prompt recipes they can paste into Codex, Claude Code, or GitHub Copilot-oriented workflows.

## When To Use This

Use this page when you already know the handbook shape and just want the fastest way to start a common task.

## If You Only Remember One Thing

Use the prompt text as the primary artifact and keep the shell commands short and supportive.

## Start A Feature With Superpowers

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
```

## Turn A Rough Idea Into A Spec

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

## Ask For An Implementation Plan

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

```powershell
Get-Content .\docs\superpowers\specs\2026-03-25-ai-skills-handbook-design.md
```

## Review A Patch Or Branch

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
git diff -- docs/ai sidebars.ts
```

## Verify A Fix Before Completion

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

## Apply Vercel React Best Practices

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
rg -n "useEffect|useMemo|useCallback" src docs
```

## Compare A Broad Workflow With A Narrow Skill

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
- Keep Codex examples first when the installation or activation details are not the point of the recipe.

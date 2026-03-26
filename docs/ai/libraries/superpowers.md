---
title: Superpowers
---

# Superpowers

## What This Page Is For

Explain the core `superpowers` workflow and why it works best when you follow the sequence instead of treating it like a prompt bucket.

## When To Use This

Use this page when you want the full order for feature work, debugging, planning, verification, and branch finishing.

## If You Only Remember One Thing

`superpowers` is valuable because it forces process discipline: understand the task, shape the scope, plan the work, implement in small steps, and verify before you declare success.

## The Core Sequence

1. `using-superpowers` to establish the workflow and surface the right skill path.
2. `brainstorming` to turn a rough idea into a clear scope and design.
3. `writing-plans` to convert the approved design into exact files, steps, and checks.
4. An implementation skill such as `subagent-driven-development` or `executing-plans` to do the work in small, reviewable slices.
5. `verification-before-completion` to confirm the change with real commands before closing it out.
6. Optional review and branch-finishing skills when the work is ready to hand off.

The order matters because each step removes a different kind of ambiguity. Brainstorming answers "what are we building?", planning answers "what is the exact path?", implementation answers "how do we do it safely?", and verification answers "did it actually work?".

## In Real Feature Work

If you are adding a new UI, the sequence should look like this:

1. clarify the user outcome and the boundary of the change
2. write the small design that the code will follow
3. turn that design into a task-by-task plan
4. implement the smallest slice first
5. run the validation commands before saying it is done

That is the difference between a useful workflow system and a pile of unrelated prompts.

## When Not To Reach For It

Do not use `superpowers` as an excuse to over-process a trivial question. The value is in preserving the sequence when the work has ambiguity, risk, or multiple steps.

## What Superpowers Is Not

- not just a bag of prompts
- not a replacement for understanding the repository
- not the same thing as the portable skill format
- not useful if you skip the sequence and jump straight to implementation

## Source References

- [obra/superpowers](https://github.com/obra/superpowers)

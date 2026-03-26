---
title: Agent Skills And skills.sh
---

# Agent Skills And skills.sh

## What This Page Is For

Explain the portability and distribution layer behind reusable skills so the rest of the handbook has a concrete foundation.

## When To Use This

Use this page when you care about how skills are packaged, installed, discovered, and shared across tools.

## If You Only Remember One Thing

This layer is about moving reusable skills around cleanly. It is not the workflow system, and it is not the place where you decide how a project should be run.

## Why It Matters

- one skill definition can travel farther when the packaging rules are shared
- installation and discovery feel more predictable from one agent to the next
- teams can share a reusable capability instead of rewriting the same idea for every tool

## What It Looks Like In Practice

In day-to-day use, this matters because you usually want two things at once: a skill that is easy to recognize by name, and a way to make that skill available in the agent you are actually using. The portability layer solves the second problem so the first one can stay stable.

That means the handbook can talk about a debugging skill, a planning skill, or a workflow skill without having to redesign the packaging story every time.

The practical question is simple: can you keep the capability stable while swapping the installation mechanics per tool? If yes, you are using the portability layer correctly.

## What This Is Not

- not a full engineering methodology
- not a standards-history page
- not a promise that every agent loads skills in the same way

## Source References

- Use the FAQ when you need the current packaging or installation details.
- [skills.sh FAQ](https://skills.sh/docs/faq)
- [GitHub Copilot agent skills docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)

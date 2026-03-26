---
title: Superpowers vs. Agent Skills
---

# Superpowers vs. Agent Skills

## What This Page Is For

Compare the skill packaging layer with the workflow layer so you can tell which problem each one solves.

## When To Use This

Use this when you are choosing between a portable reusable skill, a skill library, or an end-to-end engineering workflow.

## If You Only Remember One Thing

Agent Skills and `skills.sh` answer, "How do I package and move reusable skills between agents?" `superpowers` answers, "How do I run a disciplined engineering process with those skills?"

## What Each One Solves

| Layer | Solves this problem | Does not solve this problem |
| --- | --- | --- |
| Agent Skills / `skills.sh` | Package a skill so it can be installed, shared, and reused across agents | Define the full workflow an agent should follow in a project |
| `superpowers` | Turn a set of skills into a repeatable workflow for brainstorming, planning, implementation, review, and verification | Provide a portability standard for moving skills between different agent ecosystems |
| `anthropics/skills` | Offer reference conventions and examples | Give you an opinionated delivery workflow |
| Vercel agent skills | Provide narrow, practical task guidance | Serve as a general packaging standard or process framework |

## Concrete Scenarios

If you want to move one reusable debugging skill from one agent to another, Agent Skills is the relevant layer. It focuses on packaging and installation, not on telling the agent how to run the project.

If you want the agent to brainstorm first, write a plan, implement in small steps, and verify before claiming success, `superpowers` is the relevant layer. It is the process wrapper around the reusable skills.

If you only need a targeted skill for one common engineering task, Vercel-style agent skills are the better fit. They are narrow and practical, but they do not try to define the whole workflow around them.

## Default Choice

Start by asking which problem you are solving:

- if the problem is process discipline, reach for `superpowers`
- if the problem is packaging or reuse across agents, reach for Agent Skills and `skills.sh`
- if the problem is one narrow framework or review concern, reach for a targeted skill pack such as Vercel's

## Where Copilot Fits

This page compares the skill and workflow ecosystem only. GitHub Copilot customization docs are a separate agent-native customization layer, so they belong beside this taxonomy rather than inside the `superpowers` versus Agent Skills comparison.

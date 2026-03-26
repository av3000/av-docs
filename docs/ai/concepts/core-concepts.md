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

### Trigger Behavior

The rule that decides whether the agent loads a skill automatically, requires you to name it, or needs a tool-specific command to refresh or activate it.

### Portable Format

The conventions that let one skill idea be packaged and reused across more than one agent, even when the install path or activation flow differs.

## Stable Concepts Versus Fast-Moving Details

- Keep local docs for the stable concepts
- Link upstream for install commands and platform-specific changes
- Treat install locations and CLI commands as per-agent details, not as part of the core definition

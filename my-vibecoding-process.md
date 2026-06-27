# How I Vibecoded My Portfolio

## Stack

Astro (static site generator) + Svelte for interactive components + Tailwind CSS v4, with project case studies written as Markdown files in an Astro content collection. Hosted on GitHub Pages, version-controlled with git/GitHub.

## The "vibecoding" process

Rather than writing code by hand, I drove the build through conversation with Claude Code (Anthropic's CLI/IDE agent) — describing what I wanted ("fix the callout styling," "add a section nav for H2 headers," "turn these images into a grid") and letting it read the codebase, make the edits, and verify them, while I reviewed and steered. The git history shows this clearly: ~22 commits moving from a bare scaffold to a styled, content-rich site through small, targeted iterations — fixing bugs, adjusting tag colors, adding icons, building a custom callout/aside system — rather than one big upfront design spec.

## Division of labor

I provided the taste and direction (content, visual judgment, what "looks right"), while Claude handled implementation — wiring up Astro/Svelte/CSS, writing the custom remark plugin for image handling, matching dozens of screenshot files to the right spots in case-study copy by actually looking at the images, and building reusable layout primitives (like the `.image-pair` grid class) that get reused across project pages instead of one-off styling each time.

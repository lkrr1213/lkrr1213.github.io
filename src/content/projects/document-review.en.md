---
title: Software Approval Document Review Tool
summary: Combining cross-sheet field checks with LLM-assisted semantic review to locate issues and trace them to source material.
slug: document-review
lang: en
period: Jul–Sep 2026
role: Systems development intern · 北京移动设计院
tags: [React, LLM, Rule-based validation]
order: 1
featured: true
draft: false
---
## Background

During a systems development internship at 北京移动设计院, I worked on a tool for reviewing software approval materials. The team's work included software approval and system architecture design.

## My role and contribution

I developed checks that map fields across three types of review materials and test their consistency. The tool identifies missing, repeated, and conflicting information and points reviewers to the relevant cells. I used React to build file import, issue summaries, and difference views.

## Approach and implementation

Rule-based checks work alongside LLM-assisted semantic review. Each flagged issue includes its type, supporting excerpt, and source location so a person can verify it.

## Outcome

The work produced a review tool with traceable issue displays for the approval process.

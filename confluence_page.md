# AI-Assisted PRD Drafting — Team Prompt Template

**Page owner:** <!-- Your name -->
**Last updated:** 2026-03-26
**Status:** Live

---

## Overview

This page documents the shared prompt template our team uses to draft Product Requirements Documents with **Isaac**, FICO's internal AI assistant.

The workflow is simple: write a short feature brief, paste it into Isaac along with the prompt below, and get back a structured first draft that follows our team's standard PRD format. From there, review, refine, and fill in anything Isaac couldn't infer from the brief.

**Why use it?**

- **Solves the blank page problem.** Starting a PRD from scratch is the hardest part. This gets you to a solid first draft in under a minute.
- **Standardises doc quality.** Every PRD produced this way has the same sections, the same level of detail, and the same professional tone — regardless of who wrote the brief.
- **Forces clarity early.** Writing the brief surfaces gaps in your own thinking before engineering gets involved.
- **Reduces review cycles.** A well-structured first draft means less back-and-forth with stakeholders on "what's missing."

---

## The PRD Template

This is the structure Isaac will fill in. It is also the canonical template for all PRDs on this team.

---

**Feature:**
**Author:**
**Status:** Draft
**Last Updated:**
**Version:** 1.0

---

### 1. Overview

*2–3 sentences describing what this feature is and why it matters.*

---

### 2. Problem Statement

**Current State**
*What is happening today? Describe the pain point or gap.*

**Desired State**
*What should happen after this feature ships?*

**Impact of Inaction**
*What happens if we don't build this?*

---

### 3. Goals & Success Metrics

**Goals**
*2–4 clear, outcome-oriented goals.*

**Success Metrics**

| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| | | | |

---

### 4. User Stories

*Format: As a [user type], I want to [action] so that [benefit].*

**Primary User:**
- As a ___, I want to ___ so that ___.

**Secondary User (if applicable):**
- As a ___, I want to ___ so that ___.

---

### 5. Functional Requirements

*What the system must do. Use "must", "should", "may" language.*

**P0 — Must Have (launch blocker)**
-

**P1 — Should Have (high value, not blocking)**
-

**P2 — Nice to Have (future consideration)**
-

---

### 6. Non-Functional Requirements

- **Performance:**
- **Security:**
- **Accessibility:**
- **Scalability:**

---

### 7. Out of Scope

*Explicitly list what this feature will NOT cover.*
-

---

### 8. Open Questions

| # | Question | Owner | Due Date | Status |
|---|----------|-------|----------|--------|
| 1 | | | | Open |

---

### 9. Timeline & Milestones

| Phase | Description | Target Date |
|-------|-------------|-------------|
| Discovery / Spec | Requirements finalised, designs started | |
| Engineering Kickoff | Dev work begins | |
| Alpha / Internal Testing | Feature behind flag, internal only | |
| Beta / Limited Release | Rollout to subset of users | |
| GA Launch | Full release | |
| Post-Launch Review | Metrics review and retro | |

---

## How to Use It

### Step 1 — Write your brief

Write a short paragraph covering the problem, the proposed solution, the target users, and any constraints or success criteria you already know. You don't need a polished document — rough prose is fine.

**Example brief:**

> We need to migrate existing customers from our current-gen decisioning platform to the Northstar platform. Customers on the current-gen platform are blocked from accessing new features and performance improvements that are only available on Northstar. The migration involves data mapping, configuration transfer, and a validation period before cutover. Target customers are mid-market accounts currently on current-gen contracts up for renewal in the next two quarters.

---

### Step 2 — Copy the prompt below and paste it into Isaac along with your brief

Copy the full prompt from **Section 4** and paste it into Isaac, replacing `[PASTE YOUR BRIEF HERE]` with your brief.

---

### Step 3 — Review and refine the output

Read through every section Isaac generates. Pay particular attention to anything marked `[ASSUMPTION]` — these need your verification before the PRD is shared. Adjust success metrics, open questions, and timeline dates to reflect real data and your actual sprint calendar.

---

## The Prompt

Copy this entire block and paste it into Isaac. Replace `[PASTE YOUR BRIEF HERE]` at the end with your actual brief.

---

```
You are a senior product manager. Using the brief below, draft a complete PRD
following this exact template structure: Overview, Problem Statement,
Goals & Success Metrics, User Stories, Functional Requirements,
Non-Functional Requirements, Out of Scope, Open Questions,
Timeline & Milestones.

Fill in every section with specific, actionable content. Where information
is missing from the brief, add reasonable assumptions clearly marked as
[ASSUMPTION]. Keep the tone professional and concise.

Here is my brief:

[PASTE YOUR BRIEF HERE]
```

---

## Example

### Input brief

> We need to migrate existing customers from our current-gen decisioning platform to the Northstar platform. Customers on the current-gen platform are blocked from accessing new features and performance improvements that are only available on Northstar. The migration involves data mapping, configuration transfer, and a validation period before cutover. Target customers are mid-market accounts currently on current-gen contracts up for renewal in the next two quarters.

### Condensed PRD output (what Isaac produces)

---

**Feature:** Current-Gen to Northstar Platform Migration
**Status:** Draft | **Version:** 1.0

**Overview**
Mid-market customers on the current-gen decisioning platform cannot access new features and performance improvements available only on Northstar. This initiative delivers a structured, assisted migration — covering data mapping, configuration transfer, and a validation period — targeting accounts up for renewal in the next two quarters.

**Problem Statement**
*Current State:* Mid-market customers on current-gen contracts are on a deprecated platform. They cannot access Northstar-only capabilities, limiting their ability to adopt new product features and creating churn risk at renewal.
*Desired State:* All targeted mid-market accounts are fully migrated to Northstar, with data integrity validated and configurations confirmed before cutover.
*Impact of Inaction:* Customers who do not migrate before renewal will face a harder forced migration later, increasing churn risk and professional services cost.

**Goals & Success Metrics**

| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| % of targeted accounts migrated to Northstar | 0% | 100% of renewal-cohort accounts | End of Q+2 |
| Migration-related support tickets | [ASSUMPTION: Baseline TBD from PS team] | < 2 tickets per migrated account | During migration window |
| Customer satisfaction (post-migration CSAT) | [ASSUMPTION: Baseline TBD] | ≥ 4.0 / 5.0 | 30 days post-cutover |

**User Stories**
- As a mid-market customer admin, I want a clear migration plan with defined steps so that I know what to expect and can plan my team's involvement.
- As a FICO implementation engineer, I want automated data mapping and validation tooling so that I can complete migrations accurately and efficiently.
- As a FICO account manager, I want visibility into each account's migration status so that I can proactively manage the renewal conversation.

**Functional Requirements (P0)**
- The system must support automated data mapping from current-gen schema to Northstar schema with a validation report before cutover.
- A migration checklist and status tracker must be available to both the customer and the FICO implementation team throughout the process.
- Customers must be able to run Northstar in parallel with current-gen during a validation period before final cutover. `[ASSUMPTION: Parallel-run period is 2–4 weeks.]`

*(Isaac generates the full remaining sections — P1/P2 requirements, Non-Functional Requirements, Out of Scope, Open Questions, and full Timeline — in the actual output.)*

---

## Tips

- **The more specific your brief, the better the output.** Include real constraints, customer counts, timelines, and success criteria wherever you have them. Vague briefs produce vague PRDs.
- **Always review sections marked [ASSUMPTION] before sharing.** Every assumption Isaac flags is a gap that needs your sign-off. Confirm and update the text, or convert it to an open question.
- **Use the output as a starting point, not a final doc.** Success metric baselines, open question owners, and timeline dates all need your input and alignment with engineering, design, and legal.
- **Add your own domain expertise and customer context after generation.** Isaac can structure the document and surface reasonable defaults, but only you have the customer relationships, internal data, and product judgment to make it accurate.

---

*Questions or suggestions for this template? Comment below or reach out in #product-ops.*

# AI-Assisted PRD Drafting — Team Prompt Template

---

## Overview

This is a shared prompt template for drafting PRDs using Isaac. It takes a short feature brief and produces a structured first draft following our team's standard template. No setup required — just copy the prompt, paste it into Isaac with your brief, and get a polished PRD draft in under a minute.

---

## The PRD Template

Every PRD generated with this prompt follows this structure:

1. **Overview** — What is this feature and why does it matter?
2. **Problem Statement** — What problem are we solving, and for whom?
3. **Target Persona** — Who is this built for? (persona type, role, goals, pain points, and how they interact with the product)
4. **Goals & Success Metrics** — What does success look like? (include measurable KPIs)
5. **User Stories** — Who are the users and what do they need to accomplish?
6. **Functional Requirements** — What must the product do?
7. **Non-Functional Requirements** — Performance, security, scalability, accessibility constraints
8. **Out of Scope** — What are we explicitly not building in this iteration?
9. **Open Questions** — Unresolved decisions that need alignment
10. **Timeline & Milestones** — Key phases, dates, and owners

---

## How to Use It

**Step 1:** Write a short brief about your feature (3–5 sentences minimum, but more detail produces better output).

**Step 2:** Copy the prompt from [Section 4](#the-prompt-ready-to-copy) and paste it into Isaac along with your brief.

**Step 3:** Review the output, update any sections marked `[ASSUMPTION]`, and refine.

---

## The Prompt (ready to copy)

```
You are a senior product manager at FICO. Using the brief below, draft a
complete PRD following this exact template structure: Overview, Problem
Statement, Target Persona, Goals & Success Metrics, User Stories, Functional
Requirements, Non-Functional Requirements, Out of Scope, Open Questions,
Timeline & Milestones. Fill in every section with specific, actionable
content. For Target Persona, specify whether each persona is Internal or
External, their role, and a brief description of their goals, pain points,
and how they interact with the product. Where information is missing from the
brief, add reasonable assumptions clearly marked as [ASSUMPTION]. Keep the
tone professional and concise.
Here is my brief: [PASTE YOUR BRIEF HERE]
```

---

## Example

### Sample Brief

> NorthStar Migration Framework: A structured migration framework is needed to determine which customers move to NorthStar, in what order, and why. Three leadership decisions must be locked first — migration goal (recommended: Revenue Protection, prioritizing customers with nearest renewals and highest ARR at risk), customer segment (recommended: mixed approach with early adopters first for proof points, then current-gen clients sequenced by renewal proximity x ARR), and scorecard dimensions (ten proposed: ROI potential, feature parity readiness, relationship health, platform performance needs, scale and complexity, data migration complexity, business drivers, competitive risk, renewal proximity, strategic value). The framework follows 7 steps: Define Goal, Segment, Score & Prioritize using a weighted heat map, Platform Readiness Gate, Cohort Assignment, Execution, and Quality Gates across milestones M1 through M4. Sales leadership alignment is required before broad rollout since migration sequencing and renewal strategy are deeply interdependent.

### Condensed PRD Output (selected sections)

---

**Feature:** NorthStar Migration Framework
**Status:** Draft | **Version:** 1.0

---

**Overview**

The NorthStar Migration Framework is a structured decision-making product that determines which customers migrate to NorthStar, in what order, and under what conditions. It operationalizes a Revenue Protection migration goal by combining a weighted customer scorecard, a platform readiness gate, and a cohort assignment workflow — enabling sales and product leadership to sequence migrations by renewal proximity and ARR at risk. Sales leadership alignment is a prerequisite before broad rollout, given the deep interdependency between migration sequencing and renewal strategy.

---

**Target Persona**

| Persona Type | Role | Description |
|---|---|---|
| Internal | Sales Leadership | Reviews migration sequencing against renewal strategy; needs visibility into cohort composition, ARR at risk by cohort, and milestone gate status before signing off on each activation. |
| Internal | Platform PM | Manages cohort assignment and readiness gates; responsible for ensuring feature parity and platform readiness criteria are met before customers advance in the migration queue. |
| Internal | Ops Team | Pulls renewal dates, ARR, tier, and willingness signals to populate the weighted scorecard; primary data owner feeding the prioritization engine. |

---

**Goals & Success Metrics**

| Goal | Metric | Target |
|------|--------|--------|
| Protect at-risk ARR through prioritized migration | % of ARR-at-risk customers migrated ahead of renewal | ≥ 80% of targeted ARR protected within migration window |
| Complete migrations on schedule by cohort | Cohort completion rate (customers migrated / customers assigned per cohort) | ≥ 90% completion rate per cohort at each milestone gate |
| Reduce time-to-migrate per customer | Average time from cohort assignment to successful cutover | < 90 days per customer `[ASSUMPTION]` |
| Drive early adopter proof points | Number of referenceable early adopter migrations completed before broad rollout | ≥ 3 referenceable accounts before M2 |

---

**Functional Requirements**

- **Weighted Scorecard Engine** — The system must calculate a migration priority score for each customer across ten configurable dimensions (ROI potential, feature parity readiness, relationship health, platform performance needs, scale and complexity, data migration complexity, business drivers, competitive risk, renewal proximity, strategic value), with adjustable dimension weights set by product/sales leadership.
- **Customer Segmentation Logic** — The system must support segmentation into at least two groups: early adopters (opt-in, proof-point focused) and current-gen clients sequenced by renewal proximity × ARR score.
- **Platform Readiness Gate** — The system must enforce a readiness gate check before any customer is assigned to a migration cohort, validating feature parity status, data migration complexity, and relationship health thresholds.
- **Cohort Assignment Workflow** — The system must support assignment of customers to named cohorts (M1–M4) with associated timelines, owners, and gate criteria, and must flag customers who fail readiness checks for manual review.
- **Sales Leadership Review Dashboard** — The system must provide a dashboard view for sales leadership showing cohort composition, scorecard rankings, ARR at risk by cohort, and milestone gate status — enabling sign-off before each cohort is activated.

---

*(Isaac generates the full remaining sections in the actual output — Problem Statement, User Stories, Non-Functional Requirements, Out of Scope, Open Questions, and Timeline & Milestones. Target Persona is shown above.)*

---

## Tips

- The more specific your brief, the better the output
- Always review sections marked `[ASSUMPTION]` before sharing
- Use the output as a starting point, not a final doc
- Add your own domain expertise and customer context after generation
- For complex initiatives like migration frameworks, include the key decisions and constraints in your brief

---

## Advanced: Clone the Full Tool

For those who want the full Claude Code workflow with automated file generation, clone the repo:

[https://github.com/himankinis/prd-drafter](https://github.com/himankinis/prd-drafter)

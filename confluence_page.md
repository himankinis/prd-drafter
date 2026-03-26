# AI-Assisted PRD Drafting — Team Prompt Template

---

## Overview

This is a shared prompt template for drafting PRDs using Isaac. It takes a short feature brief and produces a structured first draft following our team's standard template. No setup required — just copy the prompt, paste it into Isaac with your brief, and get a polished PRD draft in under a minute.

---

## The PRD Template

Every PRD generated with this prompt follows this structure:

1. **Overview** — What is this feature and why does it matter?
2. **Problem Statement** — What problem are we solving, and for whom?
3. **Goals & Success Metrics** — What does success look like? (include measurable KPIs)
4. **User Stories** — Who are the users and what do they need to accomplish?
5. **Functional Requirements** — What must the product do?
6. **Non-Functional Requirements** — Performance, security, scalability, accessibility constraints
7. **Out of Scope** — What are we explicitly not building in this iteration?
8. **Open Questions** — Unresolved decisions that need alignment
9. **Timeline & Milestones** — Key phases, dates, and owners

---

## How to Use It

**Step 1:** Write a short brief about your feature (3–5 sentences).

**Step 2:** Copy the prompt from [Section 4](#the-prompt-ready-to-copy) and paste it into Isaac along with your brief.

**Step 3:** Review the output, update any sections marked `[ASSUMPTION]`, and refine.

---

## The Prompt (ready to copy)

```
You are a senior product manager. Using the brief below, draft a complete PRD
following this exact template structure: Overview, Problem Statement, Goals &
Success Metrics, User Stories, Functional Requirements, Non-Functional
Requirements, Out of Scope, Open Questions, Timeline & Milestones. Fill in
every section with specific, actionable content. Where information is missing
from the brief, add reasonable assumptions clearly marked as [ASSUMPTION]. Keep
the tone professional and concise. Here is my brief: [PASTE YOUR BRIEF HERE]
```

---

## Example

### Sample Brief

> We need to migrate our existing customers from the current-gen platform to the next-gen platform. The current-gen platform is being deprecated in Q4. Customers need a seamless transition with no data loss, minimal disruption to their workflows, and clear communication throughout the process. The migration must support both self-serve and assisted paths depending on customer tier.

### Condensed PRD Output (selected sections)

---

**Feature:** Current-Gen to Next-Gen Platform Migration
**Status:** Draft | **Version:** 1.0

**Overview**

This PRD covers the end-to-end migration of existing customers from the current-gen platform to the next-gen platform ahead of the Q4 deprecation deadline. The migration will support two paths — self-serve for standard-tier customers and assisted migration for enterprise-tier customers — ensuring continuity of workflows and zero data loss throughout the transition.

---

**Problem Statement**

The current-gen platform is scheduled for deprecation in Q4, requiring all active customers to transition to the next-gen platform. Without a structured migration process, customers risk data loss, workflow disruption, and churn. The lack of a clear migration path is already generating support tickets and customer escalations.

Target users: All active current-gen customers, segmented by tier (standard vs. enterprise).

---

**Goals & Success Metrics**

| Goal | Metric | Target |
|------|--------|--------|
| Complete migration before deprecation | % of customers migrated by Q4 cutoff | 100% |
| Minimize churn during migration | Customer churn rate during migration window | < 3% |
| Reduce support load | Support tickets related to migration | < 5% of migrating accounts |
| Maintain data integrity | Data loss incidents | 0 |

`[ASSUMPTION]` — Churn target of < 3% is based on industry benchmarks; validate against internal historical data.

---

*(Isaac generates the full remaining sections in the actual output — User Stories, Functional Requirements, Non-Functional Requirements, Out of Scope, Open Questions, and Timeline & Milestones.)*

---

## Tips

- The more specific your brief, the better the output
- Always review sections marked `[ASSUMPTION]` before sharing
- Use the output as a starting point, not a final doc
- Add your own domain expertise and customer context after generation

---

## Advanced: Clone the Full Tool

For those who want the full Claude Code workflow:

[https://github.com/himankinis/prd-drafter](https://github.com/himankinis/prd-drafter)

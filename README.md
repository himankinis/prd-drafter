# prd-drafter

A lightweight tool that turns a short feature brief into a complete Product Requirements Document using Claude Code. No API key setup required — it runs entirely through your local Claude Code CLI.

---

## What It Does

You write a 5–10 sentence feature brief. Claude reads your brief and a standard PRD template, reasons through every section, and writes a full draft to `output/prd_draft.md` in seconds. The output covers goals, user stories, prioritized requirements, open questions, timeline, and more.

---

## Prerequisites

- **[Claude Code](https://claude.ai/download)** installed and available on your PATH

  Verify with:
  ```bash
  claude --version
  ```

- **Python 3.8+** (only needed if using the convenience script `src/draft_prd.py`)

No additional Python packages or API keys are required.

---

## Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd prd-drafter

# 2. (Optional) Create a .env for any future config — currently unused
cp .env.example .env   # if provided, otherwise skip
```

The `output/` directory is created automatically on first run.

---

## Usage

### Step 1 — Write your brief in `brief.txt`

```
Feature: <name>

<5–10 sentences covering:
 - The problem users face today
 - What you want to build
 - Target users / platforms
 - Any known constraints or success criteria>
```

**Example `brief.txt`:**
```
Feature: In-app notification preferences

Users currently have no way to control which notifications they receive in the app.
They either get everything or nothing (by disabling all notifications in device settings).
This leads to notification fatigue and a high opt-out rate (~40% of users disable all notifications).

We want to build a notification preferences screen where users can toggle individual
notification types on/off: marketing emails, product updates, activity alerts, and
weekly digest. Should also support a "quiet hours" setting.

Target users: all registered users, both mobile (iOS/Android) and web.
Success = reduce full notification opt-out rate from 40% to under 15% within 60 days of launch.

Engineering estimate: ~3 weeks for backend + frontend.
Designer is available starting next sprint.
```

### Step 2 — Run Claude Code

```bash
claude "Read brief.txt and templates/prd_template.md, then generate a complete PRD draft and save it to output/prd_draft.md"
```

Or use the convenience script (runs the same command for you):

```bash
python src/draft_prd.py
```

### Step 3 — Review your draft

```bash
open output/prd_draft.md
```

Iterate by editing `brief.txt` and re-running. Each run overwrites `output/prd_draft.md`.

---

## PRD Template Sections

The template at `templates/prd_template.md` includes the following sections. Edit it to match your team's format.

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Overview** | 2–3 sentence summary of the feature and why it matters |
| 2 | **Problem Statement** | Current state, desired state, and impact of inaction |
| 3 | **Goals & Success Metrics** | Objectives and measurable KPIs with baselines and targets |
| 4 | **User Stories** | Primary and secondary user stories in As a / I want / So that format |
| 5 | **Requirements** | Functional (P0/P1/P2) and non-functional requirements |
| 6 | **Out of Scope** | Explicit list of what this feature will not cover |
| 7 | **Open Questions** | Unresolved decisions with owner and due date tracking |
| 8 | **Timeline** | Milestones from discovery through post-launch review |

---

## Project Structure

```
prd-drafter/
├── brief.txt                  ← you edit this before each run
├── templates/
│   └── prd_template.md        ← PRD structure (customise for your org)
├── src/
│   └── draft_prd.py           ← convenience wrapper around the claude CLI
├── output/
│   └── prd_draft.md           ← generated output (git-ignored)
├── .gitignore
└── README.md
```

---

## Tips

- **Be specific in your brief.** The more concrete your success criteria and constraints, the sharper the output.
- **Iterate.** Re-run after tightening the brief or after resolving open questions.
- **Customise the template.** Edit `templates/prd_template.md` to add your org's standard sections (e.g. legal review, localisation, analytics instrumentation).
- **Multiple PRDs.** Copy `brief.txt` to a new name (e.g. `briefs/search-v2.txt`) and point Claude at it:
  ```bash
  claude "Read briefs/search-v2.txt and templates/prd_template.md, then save the PRD to output/search-v2-prd.md"
  ```

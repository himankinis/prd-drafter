# prd-drafter

An AI-assisted PRD drafting tool that generates a structured first draft from a short feature brief, following a standard template. Paste in your brief, run one command, and get a complete PRD draft ready for review — no API key required.

---

## What It Does

You write a short feature brief (5–10 sentences describing the problem, solution, target users, and success criteria). Claude Code reads the brief alongside a standard PRD template and writes a complete first draft to `output/prd_draft.md`, filling in all sections with specific, actionable content.

---

## Prerequisites

- **[Claude Code](https://claude.ai/download)** installed and available on your PATH

  Verify:
  ```bash
  claude --version
  ```

No API key or additional packages required.

---

## Setup

```bash
# Clone the repo
git clone <repo-url>
cd prd-drafter

# Write your feature brief
echo "Feature: <name>

<describe the problem, proposed solution, target users, and success criteria>" > brief.txt
```

The `output/` directory is created automatically on first run.

---

## Usage

1. Edit `brief.txt` with your feature brief.
2. Run:

```bash
claude "Read brief.txt and templates/prd_template.md, then generate a complete PRD draft and save it to output/prd_draft.md"
```

3. Review `output/prd_draft.md`.

---

## PRD Template Sections

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Overview** | 2–3 sentence summary of the feature and why it matters |
| 2 | **Problem Statement** | Current state, desired state, and impact of inaction |
| 3 | **Target Persona** | Persona type (Internal/External), role, goals, pain points, and how they interact with the product |
| 4 | **Goals & Success Metrics** | Goals and measurable KPIs with baselines and targets |
| 5 | **User Stories** | Primary and secondary stories in As a / I want / So that format |
| 6 | **Functional Requirements** | What the system must do, prioritised P0 / P1 / P2 |
| 7 | **Non-Functional Requirements** | Performance, security, accessibility, scalability |
| 8 | **Out of Scope** | Explicit list of what this feature will not cover |
| 9 | **Open Questions** | Unresolved decisions with owner and due date |
| 10 | **Timeline & Milestones** | Phases from discovery through post-launch review |

---

## Web UI

A browser-based interface is available in the `web/` directory. It provides a 3-panel layout (history sidebar, brief input, streaming PRD output) and stores all generated PRDs in a local SQLite database.

### Run the Web UI

```bash
cd web
npm install
npm run dev   # → http://localhost:3001
```

**Requirements:** Node.js 18+ and the Claude Code CLI on your PATH.

### Features

- Paste a feature brief and click **Generate PRD** — streams the output in real time
- **History sidebar** — all past PRDs saved locally, click to reload any
- **Copy** or **Download as .md** from the PRD panel
- No API key required — uses the `claude` CLI under the hood

---

## Project Structure

```
prd-drafter/
├── brief.txt                  ← written automatically by the web UI (or edit manually)
├── templates/
│   └── prd_template.md        ← PRD structure (customise for your team)
├── src/
│   └── draft_prd.py           ← convenience wrapper around the claude CLI
├── output/
│   └── prd_draft.md           ← generated output (git-ignored)
├── web/                       ← Next.js web UI
│   ├── src/
│   │   ├── app/               ← App Router pages + API routes
│   │   ├── components/        ← BriefPanel, PrdPanel, HistorySidebar
│   │   └── lib/               ← SQLite db, types, utils
│   └── package.json
├── .gitignore
└── README.md
```

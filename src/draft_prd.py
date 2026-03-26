#!/usr/bin/env python3
"""
draft_prd.py — Convenience wrapper that invokes Claude Code to draft a PRD.

Usage (from the prd-drafter project root):
    python src/draft_prd.py

This script constructs and runs the claude CLI command so you don't have to
remember the exact prompt. No API key required — it delegates to your local
Claude Code installation.

Prerequisite: `claude` must be on your PATH (i.e. Claude Code CLI installed).
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
BRIEF = ROOT / "brief.txt"
TEMPLATE = ROOT / "templates" / "prd_template.md"
OUTPUT_DIR = ROOT / "output"
OUTPUT = OUTPUT_DIR / "prd_draft.md"

PROMPT = (
    "Read the feature brief in brief.txt and the PRD template in templates/prd_template.md. "
    "Using the brief as your source of truth, write a complete, polished PRD draft that fills in "
    "every section of the template. Replace all placeholder comments with real content. "
    "Where the brief doesn't specify details, make reasonable product assumptions and flag them "
    "as assumptions in the relevant section. "
    "Save the finished PRD to output/prd_draft.md. "
    "Do not add extra commentary — just write the PRD."
)


def check_prerequisites():
    if not BRIEF.exists():
        print(f"Error: brief.txt not found at {BRIEF}")
        print("Create brief.txt in the project root and describe your feature.")
        sys.exit(1)

    if not TEMPLATE.exists():
        print(f"Error: template not found at {TEMPLATE}")
        sys.exit(1)

    result = subprocess.run(["which", "claude"], capture_output=True, text=True)
    if result.returncode != 0:
        print("Error: 'claude' CLI not found on PATH.")
        print("Install Claude Code: https://claude.ai/download")
        sys.exit(1)

    OUTPUT_DIR.mkdir(exist_ok=True)


def main():
    check_prerequisites()

    print("Drafting PRD with Claude Code...")
    print(f"  Brief:    {BRIEF.relative_to(ROOT)}")
    print(f"  Template: {TEMPLATE.relative_to(ROOT)}")
    print(f"  Output:   {OUTPUT.relative_to(ROOT)}")
    print()

    result = subprocess.run(
        ["claude", PROMPT],
        cwd=str(ROOT),
    )

    if result.returncode != 0:
        print("\nClaude exited with an error.")
        sys.exit(result.returncode)

    if OUTPUT.exists():
        print(f"\nDone. PRD saved to {OUTPUT.relative_to(ROOT)}")
    else:
        print("\nClaude ran but output/prd_draft.md was not created.")
        print("Check the output above for details.")


if __name__ == "__main__":
    main()

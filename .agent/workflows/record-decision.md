---
description: How to record analysis and decisions for the app evolution
---

This workflow ensures that every significant interaction, analysis, and decision is recorded in `docs/DECISION_LOG.md`.

// turbo-all
1. Before proposing major changes, perform a thorough analysis of the relevant codebase sections.
2. Record the User Request and your Codebase Analysis summary in `docs/DECISION_LOG.md`.
3. Identify and document any **Data or Infrastructure Dependencies** (e.g., rebuilding embeddings, updating environment variables, clearing caches).
4. Record your Proposed Suggestions and the intended Verification Strategy.
5. Use a standard format:
    - Date and Title
    - User Request
    - Codebase Analysis (bullets)
    - Dependencies/Pre-requisites (if any)
    - Proposed Suggestions (numbered list)
    - Troubleshooting/Pivots (record significant issues encountered during implementations, like corrupted models or unexpected API behavior)
    - Verification Results (summary of what was tested and the outcome)
    - Status (checklist including "Verified")
6. Update `CODEBASE_CONTEXT.md` if the architecture or key features change significantly.
7. Finalize the entry in `docs/DECISION_LOG.md` once the task is fully verified.

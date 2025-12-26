# Decision Log & Evolutionary Journey

This document records the analysis, requests, and decisions made during the development of the Kabir Dohas app.

## [2025-12-26] Enhancing User Utility

### User Request
"is there anything that we need to do that can make this app usefull to the users?"

### Codebase Analysis (Summary)
- **Architecture**: The app uses a hybrid Next.js setup with both Pages and App routers. API routes are scattered (e.g., `/api/dohas.ts` in `pages/api` and `/api/doha-query` in `app/api`).
- **Core Functionality**: Strong vector-based Q&A system using local embeddings and Groq.
- **UI/UX**: Clean, serene design using TailwindCSS. Recently optimized for mobile search.
- **Identified Gaps**: Limited entry points for users who don't have a specific question; no persistent "daily" content; difficult to share wisdom; lacks multi-modal engagement (audio).

### Proposed Suggestions & Verification Strategy
1.  **Mood-based "Quick Wisdom" Buttons**: Add thematic buttons (Peace, Love, Ego, etc.) to the search page.
2.  **Doha of the Day**: Use a date-based seed for a consistent daily Doha.
3.  **Share Functionality**: Quick-copy button on Doha cards.
4.  **Audio Support (Hindi TTS)**: Browser-based speech synthesis for Hindi verses.

### Dependencies/Pre-requisites
- **Embeddings**: Rebuilding search embeddings via `src/scripts/embed_dohas.ts` was required for the mood-based search to function correctly.

### Troubleshooting/Pivots
- **Model Corruption**: Encountered `Protobuf parsing failed` when running the embedding script. Identified a corrupted `model.onnx` in `.model_cache`, cleared it, and re-downloaded to resolve.

### Verification Results
- **Manual Browser Testing**: Successfully verified "Doha of the Day" persistence, Mood-based chip display, Share/Copy functionality (confirmed by "WISDOM SHARED" tooltip), and Audio button (Hindi TTS).

### Status
- [x] Analysis Recorded
- [x] Implementation Plan Approved
- [x] Dependencies Handled (Embeddings)
- [x] Troubleshooting Documented (Model Fix)
- [x] Verified and Implemented

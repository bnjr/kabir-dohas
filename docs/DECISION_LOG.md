# Decision Log & Evolutionary Journey

This document records the analysis, requests, and decisions made during the development of the Kabir Dohas app.

## [2025-12-26] Enhancing User Utility

### User Request
"is there anything that we need to do that can make this app usefull to the users?"

### Codebase Analysis (Summary)
- **Architecture**: Unified Next.js setup using the App Router (`app/api`) for all routes. The legacy `pages/api` directory has been removed to ensure a consistent, modern structure.
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

## [2025-12-26] Component Unification and UX Fixes

### User Request
- "can you look at the components un der src/components/Page"
- "the moods button in src/components/Find/SearchBar.tsx are not working"

### Technical Action
- **Navigation Unification**: Consolidated `DohaPageButtons`, `DohasPageButtons`, and `HomePageButtons` into a single, versatile `PageNavigation` component.
- **UI Consistency**: Refactored `PageNavigation` to use the shared `Button` UI component, ensuring consistent styling and interaction patterns across all pages.
- **Mood Buttons Fix**: Implemented the missing `onChipClick` handler in `index.tsx`, enabling mood-based search redirects from the home page.
- **Codebase Cleanup**: Removed three redundant navigation components.

### Verification Results
- **Manual Verification**: Confirmed mood buttons on Home page correctly redirect to filtered search results. Verified navigation buttons on Home, Browse, and Doha Detail pages are consistent and functional.

### Status
- [x] Navigation components consolidated
- [x] UI standardized on `Button` component
- [x] Mood buttons functionality restored
- [x] Redundant components removed

## [2025-12-26] Unifying API Architecture

### User Request
"So are you saying the API is all over the place and if this can be fixed then please do so"

### Technical Action
- Migrated all endpoints from `src/pages/api` to `src/app/api`.
- Unified the standard for API handlers using Next.js 16 App Router patterns (asynchronous `params`).
- Removed legacy `src/pages/api` directory.

### Verification Results
- All endpoints (`/api/dohas`, `/api/randomdoha`, `/api/doha/[id]`, `/api/sitemap.xml`) verified via `curl` against a local dev server.

### Status
- [x] API routes consolidated in `app/api`
- [x] Legacy code removed
- [x] Verified compatibility with existing client-side hooks

## [2026-01-07] Search Layout Architecture Refactor

### User Request
"Any suggestions to change the architecture so that you can do a better job" - User requested architectural improvements after mobile layout issues were identified.

### Technical Action
- **Unified Layout Component**: Created `SearchPageLayout.tsx` to handle all search-related page layouts with mobile-first design.
- **Component Extraction**: Extracted `MoodChips.tsx` as a reusable component with horizontal scroll and hidden scrollbar.
- **Design Tokens**: Added spacing tokens (`--spacing-section`, `--spacing-element`) to `globals.css`.
- **Page Refactoring**: Simplified `index.tsx` and `doha-query.tsx` by delegating layout to the shared component.
- **Mobile UX Fixes**: Loading indicators and results now appear immediately visible without scrolling on mobile.

### Verification Results
- Build passes with no TypeScript or ESLint errors.
- Hot reload confirmed working with `npm run dev`.

### Status
- [x] SearchPageLayout component created
- [x] MoodChips extracted
- [x] Pages refactored
- [x] Build verified

## [2026-01-07] Comprehensive Architecture Improvements

### User Request
"Any architecture change that will help the app and make your maintenance and update task easier?" - User requested comprehensive improvements.

### Technical Action
- **UI Kit Components**: Created reusable primitives (`Input`, `Card`, `Chip`, `Divider`) in `/components/ui/`.
- **Types Consolidation**: Organized types into `doha.types.ts` and `api.types.ts` with re-exports from `index.ts`.
- **Search Hook**: Created `useDohaSearch.ts` hook to extract search state and navigation logic.
- **Centralized Config**: Created `lib/config.ts` with moods, messages, pagination settings, and placeholders.
- **Component Updates**: Updated `SearchPageLayout` and `MoodChips` to use new components and config.

### Verification Results
- Build passes with no TypeScript or ESLint errors.
- All components using centralized config for consistency.

### Status
- [x] UI Kit created (Input, Card, Chip, Divider)
- [x] Types consolidated
- [x] useDohaSearch hook created
- [x] Config centralized
- [x] Build verified



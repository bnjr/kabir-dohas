# Codebase Context

## Project Overview
**Kabir Dohas** is a web application dedicated to the teachings of Kabir. It features a Q&A interface where users can ask questions and receive guidance based on Kabir's dohas, powered by AI. Users can browse the collection, receive random dohas, save favorites, and search for specific teachings.

## Technology Stack
- **Framework**: Next.js 16.0.10 (Pages Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.0
- **AI & Vector Search**:
    - **Groq**: Primary LLM provider for fast AI-powered responses (via `groq-sdk`).
    - **@huggingface/transformers**: Used for generating local embeddings (Transformers.js).
    - **Local Vector Store**: In-memory vector search for dohas using pre-computed embeddings.
- **Database & Services**:
    - **Firebase**: Primary service for **Authentication** (Google Auth) and **User Data** (favorites stored in Firestore).
    - **Supabase**: Legacy references; primarily used for database types and schema definitions.
- **Icons**: FontAwesome (via `@fortawesome/react-fontawesome`).
- **Deployment**: Google Cloud Run (via `Dockerfile`).

## Directory Structure
- **`/`**: Root configuration files (`package.json`, `next.config.js`, `tsconfig.json`, `Dockerfile`).
- **`public/`**: Static assets (`favicon.ico`, `images/`).
- **`src/`**: Source code.
    - **`pages/`**: Next.js pages (file-based routing).
        - `index.tsx`: Home page entry point.
        - `doha-query.tsx`: AI-powered doha Q&A page.
        - `dohas.tsx`: Browse collection page.
        - `favorites.tsx`: User favorites page.
        - `api/`: API routes (`doha-finder.ts`, `dohas.ts`, `randomdoha.ts`, `sitemap.xml.ts`).
    - **`components/`**: React components organized by feature.
        - `Doha/`: Doha display components (`Doha.tsx`, `DohaSkeleton.tsx`, `Actions/`).
        - `Header/`: Header, burger menu, and profile components.
        - `Footer/`: Footer component.
        - `Page/`: Page-level buttons and navigation (`PageNavigation.tsx`, `HomePageButtons.tsx`).
        - `Find/`: Search-related components.
        - `Layouts/`: Layout wrappers.
        - `SEO/`: SEO meta components.
        - `Utils/`: Utility components.
    - **`lib/`**: Core logic and integrations.
        - `dohaStore.ts`: In-memory storage for dohas.
        - `embeddings.ts`: Local embedding generation using Transformers.js.
        - `vectorSearch.ts`: Vector similarity logic.
        - `groq.ts`: Groq SDK client setup.
        - `firebaseConfig.ts` / `firebaseAdminConfig.ts`: Firebase setup.
        - `cache.ts`: Caching utilities.
        - `incrementDohaViews.ts`: View count logic.
    - **`context/`**: React contexts (`AuthContext.tsx`, `FavoriteContext.tsx`).
    - **`hooks/`**: Custom React hooks (`useFetchDohas.ts`, `useDohaViews.ts`, `useOutsideClick.ts`).
    - **`types/`**: TypeScript type definitions.
    - **`data/`**: Data files.
        - `dohas_with_embeddings.json`: Pre-computed doha embeddings.
        - `source/`: Original doha source files (CSV, XLSX).
        - `prompts/`: AI persona prompt definitions.
    - **`scripts/`**: Build/utility scripts (`embed_dohas.ts`, `preload_model.ts`, `test_flow.ts`).
    - **`styles/`**: Global styles (`globals.css`).

## Key Features & Workflows
- **Vector-Based Q&A**:
    - Users ask questions relating to Kabir's teachings.
    - The system generates embeddings for the query locally.
    - Performs a vector search against the local doha collection.
    - Groq processes the query and top results to generate a persona-driven answer.
- **Doha Browsing**: Browse the full collection with pagination.
- **Random Doha**: Receive a random doha for daily inspiration.
- **Favorites**: Authenticated users can save and manage favorite dohas.
- **Search**: Find dohas by semantic similarity.

## Key Configuration Files
- **`src/data/prompts/`**: Defines the AI assistant's persona (wise Kabir devotee).
- **`Dockerfile`**: Containerization for Google Cloud Run.
- **`package.json`**: Project dependencies and scripts.
- **`next.config.js`**: Next.js configuration.

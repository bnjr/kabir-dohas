# Codebase Context

## Project Overview
**Kabir Dohas** is a web application dedicated to the teachings of Kabir. It features a Q&A interface where users can ask questions and receive guidance based on Kabir's dohas, powered by AI.

## Technology Stack
- **Framework**: Next.js 16.0.10 (Pages Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.0
- **AI & Vector Search**:
    - **Groq**: Primary LLM provider for fast AI-powered responses (via `groq-sdk`).
    - **@huggingface/transformers**: Used for generating local embeddings (Transformers.js).
    - **Local Vector Store**: In-memory vector search for dohas.
- **Database & Services**:
    - **Firebase**: Primary service for **Authentication** (Google Auth) and **User Data** (favorites stored in Firestore).
    - **Supabase**: Legacy references; primarily used for database types and schema definitions.
- **Deployment**: Google Cloud Run (via `Dockerfile`).

## Directory Structure
- **`/`**: Root configuration files (`package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.js`, `Dockerfile`).
- **`src/`**: Source code.
    - **`pages/`**: Next.js pages (file-based routing). `src/pages/index.tsx` is the entry point.
    - **`lib/`**: Core logic and integrations.
        - `dohaStore.ts`: In-memory storage for dohas.
        - `embeddings.ts`: Local embedding generation using Transformers.js.
        - `vectorSearch.ts`: Vector similarity logic.
        - `groq.ts`: Groq SDK client setup.
        - `firebaseConfig.ts`: Firebase setup.
    - **`types/`**: TypeScript type definitions.
    - **`components/`**: React components.
    - **`styles/`**: Global styles (`globals.css`).

## Key Features & Workflows
- **Vector-Based Q&A**:
    - Users ask questions relating to Kabir's teachings.
    - The system generates embeddings for the query locally.
    - Performs a vector search against the local doha collection.
    - Groq processes the query and top results to generate a persona-driven answer.
- **Doha Management**: Random doha generation and view count increments.

## Key Configuration Files
- **`prompt.txt`**: Defines the AI assistant's persona (wise Kabir devotee).
- **`Dockerfile`**: Containerization for Google Cloud Run.
- **`package.json`**: Project dependencies and scripts.

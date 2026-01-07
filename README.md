# Kabir Dohas

A spiritual wisdom application featuring the timeless verses (dohas) of Sant Kabir, with AI-powered search using local embeddings and LLM synthesis.

## Features

- 🔍 **Semantic Search** - Find relevant dohas using natural language queries
- 🤖 **AI Synthesis** - Groq LLM provides contextual interpretations
- 🏠 **Local Embeddings** - Runs Transformers.js locally (no external API needed)
- 📱 **Mobile-First Design** - Responsive, serene UI
- ⚡ **Smart Caching** - LRU cache for repeated queries

## Tech Stack

- **Framework**: Next.js 16 (Pages Router + App Router for APIs)
- **Embeddings**: Transformers.js (`multilingual-e5-small`)
- **LLM**: Groq (llama-3.3-70b-versatile)
- **Auth**: Firebase
- **Styling**: TailwindCSS v4

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
GROQ_API_KEY=your_groq_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

## Project Structure

```
src/
├── app/api/          # API routes (App Router)
├── pages/            # Page components (Pages Router)
├── components/
│   ├── ui/           # UI Kit (Input, Card, Chip, etc.)
│   ├── Layouts/      # Page layouts
│   └── ...           # Feature components
├── hooks/            # Custom React hooks
├── lib/              # Core logic (embeddings, search, config)
└── types/            # TypeScript definitions
```

## Deploy to Google Cloud Run

### Prerequisites

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
- A GCP project with billing enabled
- `.env.production` file with your environment variables

### Deployment

```bash
# 1. Authenticate with GCP (if not already)
gcloud auth login

# 2. Set your project
gcloud config set project YOUR_PROJECT_ID

# 3. Create .env.production with your secrets
cp .env.example .env.production
# Edit .env.production with your API keys

# 4. Deploy using the provided script
./deploy_cloud_run.sh
```

The script will:
- Extract environment variables from `.env.production`
- Build the Docker image with the embedding model pre-loaded
- Deploy to Cloud Run in `us-central1`

### Manual Deployment

If you prefer to deploy manually:

```bash
gcloud run deploy kabir-dohas \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --port 8080
```

## Documentation

See the `docs/` folder for detailed documentation:
- `ARCHITECTURE.md` - System design
- `DEVELOPMENT.md` - Development guide
- `DECISION_LOG.md` - Technical decisions
- `CODEBASE_CONTEXT.md` - AI-friendly codebase map

## License

MIT

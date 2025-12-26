# Environment Variables

This document lists the required environment variables for local development and production.

## Required Variables

### Firebase (Client & Web)
| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web API key. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain (e.g., `project-id.firebaseapp.com`). |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID. |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket. |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID. |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID (optional for analytics). |

### Firebase Admin (Server Side)
| Variable | Description |
| --- | --- |
| `FIREBASE_PROJECT_ID` | Firebase project ID for Admin SDK. |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email. |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key (newline escaped). |
| `FIREBASE_SERVICE_ACCOUNT` | **Recommended**: Full JSON string of the service account. |

### AI Providers
| Variable | Description |
| --- | --- |
| `GROQ_API_KEY` | API key for Groq LLM services. |
| `NEXT_PUBLIC_GROQ_API_KEY` | (Legacy/Debug) Publicly exposed Groq key - use with caution. |

### Supabase (Legacy)
| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase instance URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key. |

## Local Setup
1. Copy `.env.example` to `.env.local`.
2. Fill in the values from the Firebase and Groq consoles.
3. For Cloud Run deployment, these secrets should be stored in **GCP Secret Manager** or passed during the build/deploy process as defined in `deploy_cloud_run.sh`.

#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="kabir-dohas"
REGION="us-central1"

echo "Using Project ID: $PROJECT_ID"
echo "Service Name: $SERVICE_NAME"
echo "Region: $REGION"

# Check if .env.production exists to extract env vars
if [ -f .env.production ]; then
  echo "Extracting environment variables from .env.production..."
  # Use Node.js to safely parse multi-line environment variables
  ENV_VARS=$(node -e "
    const fs = require('fs');
    const content = fs.readFileSync('.env.production', 'utf8');
    const matches = content.matchAll(/^([A-Z1-9_]+)=(['\"])([\s\S]*?)\2|^([A-Z1-9_]+)=([^\s'\"].*)/gm);
    const env = [];
    for (const m of matches) {
      if (m[1]) {
        // Multi-line or quoted value
        let val = m[3];
        // Escape semicolons in the value if we use it as a delimiter
        val = val.replace(/;/g, '\\;');
        env.push(\`\${m[1]}=\${val}\`);
      } else if (m[4]) {
        // Simple value
        let val = m[5];
        val = val.replace(/;/g, '\\;');
        env.push(\`\${m[4]}=\${val}\`);
      }
    }
    process.stdout.write(env.join(';'));
  ")
  if [ -n "$ENV_VARS" ]; then
    ENV_VARS="^;^$ENV_VARS"
  fi
fi

echo "Deploying service $SERVICE_NAME to $REGION..."

# Use an array for arguments to handle quoting correctly
deploy_args=(
  "$SERVICE_NAME"
  --source .
  --region "$REGION"
  --allow-unauthenticated
  --memory 1Gi
)

if [ -n "$ENV_VARS" ]; then
  echo "Setting runtime environment variables..."
  deploy_args+=(--set-env-vars="$ENV_VARS")
  
  # Create a temporary .env file for the build process
  # This works because .env is not in .gitignore, so it's uploaded to Cloud Build
  echo "Creating temporary .env for build process..."
  cp .env.production .env
else
  echo "Warning: No environment variables found in .env.production."
fi

echo "Running gcloud run deploy..."
gcloud run deploy "${deploy_args[@]}"

# Cleanup
if [ -f .env ]; then
  echo "Cleaning up temporary .env..."
  rm .env
fi

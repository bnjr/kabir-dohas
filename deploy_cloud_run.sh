#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="kabir-dohas"
REGION="us-central1"

echo "Using Project ID: $PROJECT_ID"
echo "Service Name: $SERVICE_NAME"
echo "Region: $REGION"

# Check if .env.local exists to extract env vars
if [ -f .env.production ]; then
  echo "Extracting environment variables from .env.production..."
  # Extract non-empty, non-comment lines and join with comma
  ENV_VARS=$(grep -v '^#' .env.production | grep -v '^[[:space:]]*$' | grep '=' | awk -F= '{print $1"="$2}' | paste -sd "," -)
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

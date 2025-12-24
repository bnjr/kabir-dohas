# Install dependencies only when needed
FROM node:20-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pre-download the embedding model so it's baked into the image
RUN npx tsx src/scripts/preload_model.ts

RUN npm run build

# Production image, copy all the files and run next
FROM node:20-slim AS runner
RUN apt-get update && apt-get install -y --no-install-recommends \
    libstdc++6 libgomp1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the preloaded model cache
COPY --from=builder --chown=nextjs:nodejs /app/.model_cache /app/.model_cache

# Manually copy native binaries that Next.js standalone tracing misses
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@huggingface/transformers /app/node_modules/@huggingface/transformers
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/onnxruntime-node /app/node_modules/onnxruntime-node

USER nextjs

EXPOSE 8080

# set hostname to 0.0.0.0 for accessibility
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

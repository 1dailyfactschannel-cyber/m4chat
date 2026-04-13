FROM node:22-alpine AS builder
WORKDIR /app/artifacts/mockup-sandbox

# Copy package files
COPY artifacts/mockup-sandbox/package.json ./

# Install dependencies
RUN npm install -g pnpm && \
    pnpm install --no-frozen-lockfile

# Copy source and build
COPY artifacts/mockup-sandbox/src ./src
COPY artifacts/mockup-sandbox/index.html ./
COPY artifacts/mockup-sandbox/vite.config.ts ./
COPY artifacts/mockup-sandbox/tsconfig.json ./
COPY artifacts/mockup-sandbox/components.json ./
COPY artifacts/mockup-sandbox/mockupPreviewPlugin.ts ./

# Build
RUN pnpm run build

# Runner stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
RUN npm install -g serve && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
COPY --from=builder /app/artifacts/mockup-sandbox/dist ./dist
USER nodejs
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]
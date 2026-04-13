FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml ./
COPY artifacts/mockup-sandbox ./artifacts/mockup-sandbox/

# Install dependencies without lock file
RUN npm install -g pnpm && \
    pnpm install --no-lockfile

# Build
RUN pnpm run build --filter @workspace/mockup-sandbox

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
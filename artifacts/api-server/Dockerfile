FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY lib lib/
COPY artifacts artifacts/

# Install dependencies
RUN npm install -g pnpm && \
    pnpm install --no-frozen-lockfile

# Build
RUN pnpm run build

# Runner stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
COPY --from=builder /app/artifacts/api-server/dist ./dist
COPY --from=builder /app/artifacts/api-server/package.json ./package.json
USER nodejs
EXPOSE 3001
CMD ["node", "dist/index.mjs"]
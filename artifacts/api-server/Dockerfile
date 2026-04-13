FROM node:22-alpine AS deps
WORKDIR /app
COPY artifacts/api-server/package.json artifacts/api-server/pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --filter @workspace/api-server --filter @workspace/db

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
COPY --from=builder /app/artifacts/api-server/dist ./dist
COPY --from=builder /app/artifacts/api-server/package.json ./package.json
COPY --from=builder /app/artifacts/api-server/dist/package.json ./package.json 2>/dev/null || true
USER nodejs
EXPOSE 3001
CMD ["node", "dist/index.mjs"]
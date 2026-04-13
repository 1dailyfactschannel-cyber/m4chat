FROM node:22-alpine AS deps
WORKDIR /app
COPY artifacts/api-server/package.json pnpm-workspace.yaml ./
COPY lib/db/package.json lib/db/package.json
COPY lib/api-zod/package.json lib/api-zod/package.json
COPY lib/api-client-react/package.json lib/api-client-react/package.json
COPY lib/db/drizzle.config.ts lib/db/drizzle.config.ts
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile --filter @workspace/api-server...

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
COPY --from=builder /app/artifacts/api-server/dist ./dist
COPY --from=builder /app/artifacts/api-server/package.json ./package.json
USER nodejs
EXPOSE 3001
CMD ["node", "dist/index.mjs"]
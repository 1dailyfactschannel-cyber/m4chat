FROM node:22-alpine AS deps
WORKDIR /app
COPY artifacts/mockup-sandbox/package.json pnpm-workspace.yaml ./
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile --filter @workspace/mockup-sandbox...

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY artifacts/mockup-sandbox/ ./
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
USER nodejs
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]
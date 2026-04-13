FROM node:22-alpine AS deps
WORKDIR /app
COPY artifacts/m4chat-electron/package.json pnpm-workspace.yaml ./
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY artifacts/m4chat-electron/ ./
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
COPY --from=builder /app/out/renderer ./dist
RUN npm install -g serve
USER nodejs
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]
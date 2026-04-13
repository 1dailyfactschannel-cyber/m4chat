FROM node:22-alpine AS builder
WORKDIR /app

# Copy all project files
COPY . .

# Install all dependencies
RUN npm install -g pnpm && \
    pnpm install

# Build only api-server
RUN pnpm --filter @workspace/api-server run build

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
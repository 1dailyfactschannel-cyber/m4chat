FROM node:22-alpine AS builder
WORKDIR /app

# Copy root config
COPY package.json pnpm-workspace.yaml ./

# Copy libs
COPY lib/db ./lib/db
COPY lib/api-zod ./lib/api-zod

# Copy api-server
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/api-server/tsconfig.json ./artifacts/api-server/
COPY artifacts/api-server/build.mjs ./artifacts/api-server/
COPY artifacts/api-server/src ./artifacts/api-server/src

# Fix workspace references to local paths
RUN sed -i 's/"@workspace\/db": "workspace:\*"/".\/..\/lib\/db"/g' artifacts/api-server/package.json && \
    sed -i 's/"@workspace\/api-zod": "workspace:\*"/".\/..\/lib\/api-zod"/g' artifacts/api-server/package.json

WORKDIR /app/artifacts/api-server

# Install and build
RUN npm install && npm run build

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
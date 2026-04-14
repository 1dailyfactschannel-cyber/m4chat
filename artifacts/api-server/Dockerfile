FROM node:22-alpine AS builder
WORKDIR /app

# Copy all source files
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/api-server/tsconfig.json ./artifacts/api-server/
COPY artifacts/api-server/build.mjs ./artifacts/api-server/
COPY artifacts/api-server/src ./artifacts/api-server/src

# Copy lib dependencies that api-server needs
COPY lib/db ./lib/db
COPY lib/api-zod ./lib/api-zod

# Replace workspace references with relative paths
RUN cd artifacts/api-server && \
    sed -i 's/"@workspace\/db": "workspace:\*"/"\.\.\/lib\/db"/g' package.json && \
    sed -i 's/"@workspace\/api-zod": "workspace:\*"/"\.\.\/lib\/api-zod"/g' package.json

# Install and build
WORKDIR /app/artifacts/api-server
RUN npm install --include=dev && npm run build

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
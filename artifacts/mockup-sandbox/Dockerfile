FROM node:22-alpine AS builder
WORKDIR /app

# Copy only mockup-sandbox files
COPY artifacts/mockup-sandbox/package.json ./
COPY artifacts/mockup-sandbox/tsconfig.json ./
COPY artifacts/mockup-sandbox/vite.config.ts ./
COPY artifacts/mockup-sandbox/index.html ./
COPY artifacts/mockup-sandbox/src ./src

# Install with npm (include devDependencies for build)
RUN npm install --include=dev

# Build
RUN npm run build

# Runner stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
RUN npm install -g serve && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
COPY --from=builder /app/dist ./dist
USER nodejs
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]
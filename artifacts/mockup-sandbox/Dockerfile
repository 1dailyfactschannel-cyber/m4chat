FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY artifacts/mockup-sandbox/package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY artifacts/mockup-sandbox/src ./src
COPY artifacts/mockup-sandbox/index.html ./
COPY artifacts/mockup-sandbox/vite.config.ts ./
COPY artifacts/mockup-sandbox/tsconfig.json ./
COPY artifacts/mockup-sandbox/components.json ./

# Build using node directly
RUN node node_modules/vite/bin/vite.js build

# Runner stage
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
RUN npm install -g serve && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
COPY --from=0 /app/dist ./dist
USER nodejs
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY artifacts/mockup-sandbox/package.json ./

# Install dependencies
RUN npm install --include=dev

# Copy source
COPY artifacts/mockup-sandbox/src ./src
COPY artifacts/mockup-sandbox/index.html ./
COPY artifacts/mockup-sandbox/vite.config.ts ./
COPY artifacts/mockup-sandbox/tsconfig.json ./

# Build
RUN npm run build

# Runner
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
RUN npm install -g serve
COPY --from=0 /app/dist ./dist
USER nodejs
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]
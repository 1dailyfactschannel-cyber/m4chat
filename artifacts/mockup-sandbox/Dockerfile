# Build stage - just for installing dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY artifacts/mockup-sandbox/package.json ./
RUN npm install --omit=dev

# Runner stage
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
RUN npm install -g serve
COPY --from=deps /app/node_modules ./node_modules
COPY artifacts/mockup-sandbox/dist ./dist
EXPOSE 8081
CMD ["serve", "dist", "-l", "8081", "-s"]

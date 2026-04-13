FROM node:22 AS builder
WORKDIR /app
COPY artifacts/m4chat-electron/package.json artifacts/m4chat-electron/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY artifacts/m4chat-electron/ ./
RUN pnpm run build

FROM electron-builder:latest
COPY --from=builder /app out/ ./out
RUN npx electron-builder --win --config
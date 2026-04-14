FROM node:22-alpine

WORKDIR /app

# Copy lib dependencies
COPY lib/db/package.json ./lib/db/package.json
COPY lib/api-zod/package.json ./lib/api-zod/package.json

# Copy api-server
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/api-server/tsconfig.json ./artifacts/api-server/
COPY artifacts/api-server/build.mjs ./artifacts/api-server/
COPY artifacts/api-server/src ./artifacts/api-server/src

# Fix workspace refs
RUN cd artifacts/api-server && \
    sed -i 's/"@workspace\/db": "workspace:\*"/"\.\.\/lib\/db"/g' package.json && \
    sed -i 's/"@workspace\/api-zod": "workspace:\*"/"\.\.\/lib\/api-zod"/g' package.json

# Install and build
WORKDIR /app/artifacts/api-server
RUN npm install --ignore-scripts && npm run build

# Runner stage
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs
COPY --from=0 /app/artifacts/api-server/dist ./dist
COPY --from=0 /app/artifacts/api-server/package.json ./package.json
USER nodejs
EXPOSE 3001
CMD ["node", "dist/index.mjs"]
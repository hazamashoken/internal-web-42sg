FROM node:22-bookworm-slim AS base

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN npm install --omit=dev --force

FROM prod-deps AS builder

ARG MINIO_ENDPOINT

RUN rm -rf "app/test"
RUN npm install --force
RUN npm run build

FROM base AS runner
ARG NODE_ENV

COPY --chown=node:node --from=prod-deps /app/node_modules /app/node_modules
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/package.json ./

USER node

EXPOSE 3000
CMD ["npm", "run", "start"]
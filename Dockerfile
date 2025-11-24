FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=base /app/.output ./.output
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules

# Prevent Husky from running and drop dev deps for smaller image
ENV HUSKY=0
RUN npm prune --omit=dev

ENV NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]


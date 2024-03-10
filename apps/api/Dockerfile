ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine AS base
ARG PORT
ARG WILDFIRE_API_URL

# Test for expected arguments and fail immediately if any are missing
RUN test -n "$PORT"
RUN test -n "$WILDFIRE_API_URL"

FROM base as dev
ARG PORT
ARG WILDFIRE_API_URL

ENV PORT $PORT
ENV WILDFIRE_API_URL $WILDFIRE_API_URL

WORKDIR /tmp/build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=apps/api/package.json,target=apps/api/package.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

USER node
EXPOSE $PORT
CMD npm -w api run start:dev
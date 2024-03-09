ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine AS base
ARG PORT

# Test for expected arguments and fail immediately if any are missing
RUN test -n "$PORT"

FROM base as dev
ARG PORT
ENV PORT $PORT

WORKDIR /usr/109225

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=apps/api/package.json,target=apps/api/package.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

USER node
EXPOSE $PORT
CMD npm -w api run start:dev
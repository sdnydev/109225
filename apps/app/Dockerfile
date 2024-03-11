ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine AS base
ARG VITE_API_URL
ARG VITE_API_PORT

# Test for expected arguments and fail immediately if any are missing
RUN test -n "$VITE_API_PORT"
RUN test -n "$VITE_API_URL"

FROM base as dev
ARG VITE_API_PORT
ARG VITE_API_URL

ENV VITE_API_PORT $VITE_API_PORT
ENV VITE_API_URL $VITE_API_URL

WORKDIR /usr/109225

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=apps/app/package.json,target=apps/app/package.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# CMD exec /bin/sh -c "trap : TERM INT; sleep infinity & wait"

WORKDIR /usr/109225/apps/app

WORKDIR /usr/109225
USER node
EXPOSE 5173
CMD npm -w app run dev
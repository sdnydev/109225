# README - 109225 - Sid McLaughlin

## Prerequisites

- NodeJS: https://nodejs.org/en
- Instructions to install: https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac#windows

## Running

In a terminal, type the following commands

```
npm install && npx -w api prisma generate
docker compose up --build -d
```

## Notable Links

- Website: http://localhost:5173
- API: http://localhost:4000/v1/fires
- API Docs: http://localhost:4000/v1/docs

## Query to find number of API calls

```
SELECT count(*) FROM request_log;
```

## Tests

You can run tests by typing the following commands, either locally, or as part of a CI/CD pipeline.

```
npx -w app cypress run
npm -w api run test
```

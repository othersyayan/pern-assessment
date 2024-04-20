# PERN Assessment

This is an sample of monorepo apps.

## What's inside?

This monorepo includes the following apps:

### Apps

- `client`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `server`: a [Nest.js](https://docs.nestjs.com) for the backend server
- `database`: using [PostgreSQL](https://www.postgresql.org/) for database
- `container`: using [Docker](https://www.docker.com/)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Running this apps

For the following command:

```sh
docker compose up --build
```

or you can run this command on local first:

```sh
yarn
```

and then for the server:

```sh
yarn dev:server
```

for the client:

```sh
yarn dev:client
```

# Prerequisite

- Node.js `v20`
- PostgresSQL installed

# Frontend

The frontend is developed with React in Typescript with strict mode, using UI component from Ant Design.

### Setup

Configure the backend url by updating `.env` (refer to `.env.example`)

**Install dependencies**

```sh
cd frontend
yarn install
```

**Run**

```
yarn dev
```

**Test**

```
yarn test
```

<br>

# Backend

The backend is developed with Fastify in Typescript. Persistent storage is PostgreSQL

### Setup

Configure PostgreSQL settings by updating `.env` (refer to `.env.example`).

Ensure user and database that will be used is created.

**Run migration**

```
yarn mi
```

**Install Dependencies**

```sh
cd backend
yarn mi
yarn install
```

**Run**

```
yarn dev
```

**Test**

```
yarn test
```

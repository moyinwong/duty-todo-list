This an end-to-end web application that allows the user to read, create and update a to-do list of duties.

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

Frontend should be running at [http://localhost:5173/](http://localhost:5173/)
<img width="1388" alt="Screenshot 2024-09-14 at 11 02 18 AM" src="https://github.com/user-attachments/assets/f3a812b6-f5d8-48fa-a341-24d62153cf69">

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

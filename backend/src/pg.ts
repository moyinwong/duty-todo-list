import pg from "pg";
import Postgrator from "postgrator";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  const client = new pg.Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "") || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    await client.connect();

    const postgrator = new Postgrator({
      migrationPattern: path.join(__dirname, "/migrations/*"),
      driver: "pg",
      schemaTable: "pg_migrations",
      database: process.env.DB_DATABASE,
      currentSchema: "public", // Postgres and MS SQL Server only
      execQuery: (query) => client.query(query),
    });

    const result = await postgrator.migrate();

    if (result.length === 0) {
      console.log(
        'No migrations run for schema "public". Already at the latest one.'
      );
    }

    console.log("Migration done.");

    process.exitCode = 0;
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }

  await client.end();
}

migrate();

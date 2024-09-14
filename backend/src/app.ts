import * as path from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { fileURLToPath } from "url";
import cors from "@fastify/cors";
import postgres from "@fastify/postgres";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  fastify.register(cors, {
    origin: (origin, cb) => {
      if (!origin) {
        cb(new Error("Not allowed"), false);
      }

      const hostname = new URL(origin!).hostname;
      if (hostname === "localhost") {
        //  Request from localhost will pass
        cb(null, true);
        return;
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"), false);
    },
  });

  fastify.register(postgres, {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.HOST,
    port: parseInt(process.env.DB_HOST || "5432"),
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: {
      ...opts,
      prefix: "/api",
    },
    forceESM: true,
  });
};

export default app;
export { app, options };

import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async function (_request, _reply) {
    return { root: true };
  });
};

export default root;

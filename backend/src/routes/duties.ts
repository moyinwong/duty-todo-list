import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { DutyServiceImpl } from "../services/DutyService.js";

type PutParams = {
  id: string;
};

type PostPutBody = {
  dutyText: string;
};

const duty: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const dutyService = new DutyServiceImpl(fastify.pg.pool);

  fastify.get("/duties", async function (request, reply) {
    try {
      return dutyService.findAll();
    } catch (err) {
      request.log.error(`Error occured - ${err}`);
      return reply.internalServerError("Failed to find duties");
    }
  });

  fastify.post(
    "/duties",
    async function (request: FastifyRequest<{ Body: PostPutBody }>, reply) {
      const { dutyText } = request.body;
      try {
        return dutyService.create(dutyText);
      } catch (err) {
        request.log.error(`Error occured - ${err}`);
        return reply.internalServerError("Failed to add duty");
      }
    }
  );

  fastify.put(
    "/duties/:id",
    async function (
      request: FastifyRequest<{ Params: PutParams; Body: PostPutBody }>,
      reply
    ) {
      const { id } = request.params;
      const { dutyText } = request.body;

      try {
        return dutyService.updateById(id, dutyText);
      } catch (err: any) {
        const error = new Error(err);
        request.log.error(`Error occured - ${error.message}`);
        return reply.internalServerError("Failed to update duty");
      }
    }
  );
};

export default duty;

import { FastifyPluginAsync, FastifyRequest, FastifySchema } from "fastify";
import { DutyServiceImpl } from "../services/DutyService.js";

type PutParams = {
  id: string;
};

type PostPutBody = {
  dutyText: string;
};

const bodyJsonSchema = {
  type: "object",
  required: ["dutyText"],
  properties: {
    dutyText: { type: "string" },
  },
};

const paramsJsonSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

const PutSchema: FastifySchema = {
  body: bodyJsonSchema,
  params: paramsJsonSchema,
};

const PostSchema: FastifySchema = {
  body: bodyJsonSchema,
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
    { schema: PostSchema },
    async (request: FastifyRequest<{ Body: PostPutBody }>, reply) => {
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
    { schema: PutSchema },
    async (
      request: FastifyRequest<{ Params: PutParams; Body: PostPutBody }>,
      reply
    ) => {
      const { id } = request.params;
      const { dutyText } = request.body;

      try {
        return dutyService.updateById(id, dutyText);
      } catch (err) {
        request.log.error(`Error occured - ${err}`);
        return reply.internalServerError("Failed to update duty");
      }
    }
  );
};

export default duty;

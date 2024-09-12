import { FastifyPluginAsync, FastifyRequest } from "fastify";

export type Duty = {
  id: string;
  name: string;
};

const duties = [
  { id: "1", name: "Something to Do" },
  { id: "2", name: "Go exercise" },
  { id: "3", name: "Prepare for work" },
  { id: "4", name: "Take care brother" },
  { id: "5", name: "Play game" },
  { id: "6", name: "Watch Netflix" },
];

type PutParams = {
  id: string;
};

type PutBody = {
  dutyText: string;
};

const duty: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/duties", async function (request, reply) {
    return duties;
  });

  fastify.post("/duties", async function (request, reply) {
    const newDuty = {
      id: (Number(duties[duties.length - 1]) + 1).toString(),
      name: String(request.body),
    };
    duties.push(newDuty);
    return newDuty;
  });

  fastify.put(
    "/duties/:id",
    async function (
      request: FastifyRequest<{ Params: PutParams; Body: PutBody }>,
      reply
    ) {
      const { id } = request.params;
      const duty = duties.find((d) => d.id === id);
      if (!duty) {
        return reply.notFound();
      }
      duty.name = request.body.dutyText;
      return duty;
    }
  );
};

export default duty;

import Fastify from "fastify";
import Root from "../../src/routes/root";

describe("root route", () => {
  test("should resolve to root", async () => {
    const fastify = Fastify();
    fastify.register(Root);

    const res = await fastify.inject({
      url: "/",
    });
    expect(JSON.parse(res.payload)).toEqual({ root: true });
  });
});

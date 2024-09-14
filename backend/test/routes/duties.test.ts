import Fastify from "fastify";
import Duties from "../../src/routes/duties";
import { PostgresDb } from "@fastify/postgres";

jest.mock("@fastify/postgres");

describe("duties route", () => {
  test("GET /duties should able to get all duties", async () => {
    const duties = [{ id: 1, name: "Test" }];
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: duties }),
      release: jest.fn(),
    };

    const fastify = Fastify();
    fastify.pg = {
      pool: {
        connect: () => mockClient,
      },
    } as unknown as PostgresDb & Record<string, PostgresDb>;

    fastify.register(Duties);

    const res = await fastify.inject({
      method: "GET",
      url: "/duties",
    });
    // console.log(res);
    expect(JSON.parse(res.payload)).toEqual(duties);
  });

  test("POST /duties should able to save and return saved duty", async () => {
    const duties = [{ id: 1, name: "Test" }];
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: duties }),
      release: jest.fn(),
    };

    const fastify = Fastify();
    fastify.pg = {
      pool: {
        connect: () => mockClient,
      },
    } as unknown as PostgresDb & Record<string, PostgresDb>;

    fastify.register(Duties);

    const res = await fastify.inject({
      method: "POST",
      url: "/duties",
      payload: { dutyText: "Test" },
    });

    expect(mockClient.query.mock.calls[0][1]).toEqual(["Test"]);
    expect(JSON.parse(res.payload)).toEqual(duties[0]);
  });

  test("POST /duties should fail if request body validation failed", async () => {
    const mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };

    const fastify = Fastify();
    fastify.pg = {
      pool: {
        connect: () => mockClient,
      },
    } as unknown as PostgresDb & Record<string, PostgresDb>;

    fastify.register(Duties);

    const res = await fastify.inject({
      method: "POST",
      url: "/duties",
      payload: { name: "Test" },
    });

    expect(res.statusCode).toBe(400);
    expect(mockClient.query).not.toHaveBeenCalled();
  });

  test("PUT /duties should able to update and return updated duty", async () => {
    const duties = [{ id: 1, name: "updated" }];
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: duties }),
      release: jest.fn(),
    };

    const fastify = Fastify();
    fastify.pg = {
      pool: {
        connect: () => mockClient,
      },
    } as unknown as PostgresDb & Record<string, PostgresDb>;

    fastify.register(Duties);

    const res = await fastify.inject({
      method: "PUT",
      url: `/duties/${duties[0].id}`,
      payload: { dutyText: "updated" },
    });

    expect(mockClient.query.mock.calls[0][1]).toContain("updated");
    expect(mockClient.query.mock.calls[0][1]).toContain("1");
    expect(JSON.parse(res.payload)).toEqual(duties[0]);
  });

  test("PUT /duties should fail if request body validation failed", async () => {
    const duties = [{ id: 1, name: "updated" }];
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: duties }),
      release: jest.fn(),
    };

    const fastify = Fastify();
    fastify.pg = {
      pool: {
        connect: () => mockClient,
      },
    } as unknown as PostgresDb & Record<string, PostgresDb>;

    fastify.register(Duties);

    const res = await fastify.inject({
      method: "PUT",
      url: `/duties/${duties[0].id}`,
      payload: { name: "updated" },
    });

    expect(res.statusCode).toBe(400);
    expect(mockClient.query).not.toHaveBeenCalled();
  });

  test("PUT /duties should fail if request param validation failed", async () => {
    const duties = [{ id: 1, name: "updated" }];
    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: duties }),
      release: jest.fn(),
    };

    const fastify = Fastify();
    fastify.pg = {
      pool: {
        connect: () => mockClient,
      },
    } as unknown as PostgresDb & Record<string, PostgresDb>;

    fastify.register(Duties);

    const res = await fastify.inject({
      method: "PUT",
      url: `/duties`,
      payload: { dutyText: "updated" },
    });

    expect(res.statusCode).toBe(404);
    expect(mockClient.query).not.toHaveBeenCalled();
  });
});

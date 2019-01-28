import request from "supertest";
import { migrate, seed } from "../../lib/db/commands";
import { bootstrap } from "../../src/core";

beforeAll(async () => {
  await migrate();
  await seed();
});

describe("/auth", () => {
  test("it can authorize a user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { auth: { email: "john.doe@gmail.com", password: "qweqweqwe" } };
    const response = await request(app)
      .post("/auth")
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.token).toBeDefined();
    done();
  });

  test("it rejects an invalid request", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {};
    const response = await request(app)
      .post("/auth")
      .send(payload);
    expect(response.status).toBe(400);
    done();
  });

  test("it rejects when the user doesn't exist", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { auth: { email: "something@gmail.com", password: "qweqweqwe" } };
    const response = await request(app)
      .post("/auth")
      .send(payload);
    expect(response.status).toBe(404);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it rejects when the wrong password is provided", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { auth: { email: "john.doe@gmail.com", password: "notqweqweqwe" } };
    const response = await request(app)
      .post("/auth")
      .send(payload);
    expect(response.status).toBe(403);
    done();
  });
});

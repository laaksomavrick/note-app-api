import request from "supertest";
import { migrate } from "../../lib/db/common";
import { bootstrap } from "../../src/core";

beforeAll(async () => {
  await migrate();
  // await seed();
});

// todo: need seed data for a user in order to properly test success case, bad password case
// do next: 12/28/2018; seeds, these tests, /me with auth middleware

describe("/auth", () => {
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
    const payload = { email: "something@gmail.com", password: "qweqweqwe" };
    const response = await request(app)
      .post("/auth")
      .send(payload);
    expect(response.status).toBe(404);
    done();
  });
});

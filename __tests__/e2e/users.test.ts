import faker from "faker";
import request from "supertest";
import { migrate } from "../../lib/db/common";
import { bootstrap } from "../../src/core";
import { db } from "../../src/db";

beforeAll(async () => {
  await migrate();
});

describe("/users", () => {
  test("it can create a user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { email: faker.internet.email(), password: "qweqweqwe" };
    const response = await request(app)
      .post("/users")
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toBeDefined();
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it fails creating a user with an invalid request", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {};
    const response = await request(app)
      .post("/users")
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    done();
  });
});

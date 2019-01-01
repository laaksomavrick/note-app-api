import faker from "faker";
import request from "supertest";
import { migrate, seed } from "../../lib/db/commands";
import { bootstrap } from "../../src/core";

beforeAll(async () => {
  await migrate();
  await seed();
});

describe("POST /users", () => {
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

  // tslint:disable-next-line:max-line-length
  test("it fails create a user when the user already exists", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { email: "john.doe@gmail.com", password: "qweqweqwe" };
    const response = await request(app)
      .post("/users")
      .send(payload);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    done();
  });
});

describe("GET /users/me", () => {
  test("it can get a user with a valid jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get("/users/me")
      .set({
        Authorization:
          // todo: generate this via sign?
          // tslint:disable-next-line:max-line-length
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTQ2MjI2MDE2fQ.fK4rExPPq8affMje22cItCF4_9iFgmzCHCt42yB1h90",
      });
    expect(response.status).toBe(200);
    expect(response.body.data.user).toBeDefined();
    done();
  });

  test("it cannot get a user without a valid jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app).get("/users/me");
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    done();
  });
});

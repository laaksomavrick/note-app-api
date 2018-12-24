import supertest from "supertest";
import { bootstrap } from "../../src/core";
import { db } from "../../src/db";

describe("/healthz", () => {
  test("it succeeds for a valid request", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await supertest(app).get("/healthz");
    expect(response.status).toBe(200);
    done();
  });

  test("it fails when the database is down", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    db.end();
    const response = await supertest(app).get("/healthz");
    expect(response.status).toBe(200);
    expect(response.body.db).toBe(false);
    done();
  });

  afterAll(() => {
    return db.end();
  });
});

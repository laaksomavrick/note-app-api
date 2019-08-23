import supertest from "supertest";
import { bootstrap } from "../../src/core";

describe("/healthz", () => {
  test("it succeeds for a valid request", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await supertest(app).get("/healthz");
    expect(response.status).toBe(200);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it fails when the database is down", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    // tslint:disable-next-line:no-any
    await (app as any).core.db.end();
    const response = await supertest(app).get("/healthz");
    expect(response.status).toBe(200);
    expect(response.body.resource.db).toBe(false);
    done();
  });
});

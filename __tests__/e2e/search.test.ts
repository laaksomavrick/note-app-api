import request from "supertest";
import { migrate, seed } from "../../lib/db/commands";
import { bootstrap } from "../../src/core";
import { Note } from "../../src/notes/repository";
import { janeDoeJwt, johnDoeJwt, johnDoeUserId } from "../helpers";

beforeAll(async () => {
  await migrate();
  await seed();
});

describe("GET /users/:userId/notes/search", () => {
  test("it can search notes belonging to a user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { search: { query: "pynchon" } };
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/notes/search`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.notes).toBeDefined();
    expect([
      ...new Set(response.body.resource.notes.map((note: Note) => note.userId)),
    ]).toEqual([1]);
    done();
  });

  test("it cannot search notes without a jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/notes/search`)
      .send();
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot search notes that don't belong to the user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/notes/search`)
      .set({ Authorization: janeDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });

  test("it cannot search notes without a query", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { search: { query: "" } };
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/notes/search`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(400);
    done();
  });
});

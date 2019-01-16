import request from "supertest";
import { migrate, seed } from "../../lib/db/commands";
import { bootstrap } from "../../src/core";
import { Folder } from "../../src/folders/repository";
import { janeDoeJwt, johnDoeJwt, johnDoeUserId } from "../helpers";

beforeAll(async () => {
  await migrate();
  await seed();
});

describe("GET /users/:userId/folders/:folderId/notes", () => {
  // tslint:disable-next-line:max-line-length
  test("it can get notes belonging to a user and folder", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders/1/notes`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.data.notes).toBeDefined();
    // todo: move this to a fn; copied
    expect([
      ...new Set(response.body.data.notes.map((folder: Folder) => folder.userId)),
    ]).toEqual([1]);
    done();
  });

  test("it cannot get notes without a jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders/1/notes`)
      .send();
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot get notes that don't belong to the user via jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders/1/notes`)
      .set({ Authorization: janeDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot get notes that don't belong to the user via folderId", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders/9/notes`)
      .set({ Authorization: johnDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });
});

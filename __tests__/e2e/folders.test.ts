import faker from "faker";
import request from "supertest";
import { migrate, seed } from "../../lib/db/commands";
import { bootstrap } from "../../src/core";
import { Folder } from "../../src/folders/repository";
import { janeDoeJwt, johnDoeJwt, johnDoeUserId } from "../helpers";

beforeAll(async () => {
  await migrate();
  await seed();
});

describe("GET /users/:userId/folders", () => {
  test("it can get folders belonging to a user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.resource.folders).toBeDefined();
    expect([
      ...new Set(response.body.resource.folders.map((folder: Folder) => folder.userId)),
    ]).toEqual([1]);
    done();
  });

  test("it cannot get folders without a jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders`)
      .send();
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot get folders that don't belong to the user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders`)
      .set({ Authorization: janeDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });
});

describe("POST /users/:userId/folders", () => {
  test("it can create a folder", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.folder).toBeDefined();
    done();
  });

  test("it cannot create a folder without a jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders`)
      .send(payload);
    expect(response.status).toBe(401);
    done();
  });

  test("it cannot create a folder for another user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders`)
      .set({
        Authorization: janeDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(403);
    done();
  });

  test("it cannot create a folder with a bad body", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {};
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(400);
    done();
  });
});

describe("PATCH /users/:userId/folders/:folderId", () => {
  test("it can update a folder", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.folder).toBeDefined();
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a folder if not authorized", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1`)
      .send(payload);
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a folder that doesn't belong to the user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1`)
      .set({
        Authorization: janeDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(403);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a folder that doesn't exist", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = { folder: { name: faker.lorem.word() } };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/0`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(404);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a folder without a valid request", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {};
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(400);
    done();
  });
});

describe("DELETE /users/:userId/folders/:folderId", () => {
  test("it can delete a folder", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1`)
      .set({ Authorization: johnDoeJwt })
      .send();
    expect(response.status).toBe(200);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot delete a folder if not authorized", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1`)
      .send();
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot delete a folder that doesn't belong to the user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1`)
      .set({ Authorization: janeDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot delete a folder that doesn't exist", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/0`)
      .set({ Authorization: johnDoeJwt })
      .send();
    expect(response.status).toBe(404);
    done();
  });
});

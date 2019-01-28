import faker from "faker";
import request from "supertest";
import { migrate, seed } from "../../lib/db/commands";
import { bootstrap } from "../../src/core";
import { janeDoeJwt, johnDoeJwt, johnDoeUserId } from "../helpers";

beforeAll(async () => {
  await migrate();
  await seed();
});

describe("GET /users/:userId/notes/:folderId/notes", () => {
  // tslint:disable-next-line:max-line-length
  test("it can get notes belonging to a user and note", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders/1/notes`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.resource.notes).toBeDefined();
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
  test("it cannot get notes that don't belong to the user via noteId", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .get(`/users/${johnDoeUserId}/folders/9/notes`)
      .set({ Authorization: johnDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });
});

describe("POST /users/:userId/notes/:folderId/notes", () => {
  test("it can create a note", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders/1/notes`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.note).toBeDefined();
    done();
  });

  test("it cannot create a note without a jwt", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders/1/notes`)
      .send(payload);
    expect(response.status).toBe(401);
    done();
  });

  test("it cannot create a note for another user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders/1/notes`)
      .set({
        Authorization: janeDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(403);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot create a note for a folder belonging to another user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders/9/notes`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(403);
    done();
  });

  test("it cannot create a note with a bad body", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {};
    const response = await request(app)
      .post(`/users/${johnDoeUserId}/folders/1/notes`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(400);
    done();
  });
});

describe("PATCH /users/:userId/folders/:folderId/notes/:noteId", () => {
  test("it can update a note", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.note).toBeDefined();
    done();
  });

  test("it can partially update a note", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(200);
    expect(response.body.resource.note).toBeDefined();
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a note if not authorized", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .send(payload);
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a note that doesn't belong to the user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .set({
        Authorization: janeDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(403);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a note that doesn't exist", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {
      note: { name: faker.lorem.word(), content: faker.lorem.paragraph() },
    };
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1/notes/0`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(404);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot update a note without a valid request", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const payload = {};
    const response = await request(app)
      .patch(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .set({
        Authorization: johnDoeJwt,
      })
      .send(payload);
    expect(response.status).toBe(400);
    done();
  });
});

describe("DELETE /users/:userId/folders/:folderId/notes/:noteId", () => {
  test("it can delete a note", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .set({ Authorization: johnDoeJwt })
      .send();
    expect(response.status).toBe(200);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot delete a note if not authorized", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .send();
    expect(response.status).toBe(401);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot delete a note that doesn't belong to the user", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1/notes/1`)
      .set({ Authorization: janeDoeJwt })
      .send();
    expect(response.status).toBe(403);
    done();
  });

  // tslint:disable-next-line:max-line-length
  test("it cannot delete a note that doesn't exist", async (done: jest.DoneCallback) => {
    const app = bootstrap();
    const response = await request(app)
      .delete(`/users/${johnDoeUserId}/folders/1/notes/0`)
      .set({ Authorization: johnDoeJwt })
      .send();
    expect(response.status).toBe(404);
    done();
  });
});

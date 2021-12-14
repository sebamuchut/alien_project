const request = require("supertest");
import app from "../src/server";
import config from "../src/config";

const server = app.listen(config.port);
afterAll(() => {
  server.close();
});

describe("get all messages", () => {
  it("gets every valid messageFromLeader", async () => {
    const response = await request(server).get("/messages/valid");
    expect(response.status).toEqual(200)
    expect(response.status).not.toBe(400)
    expect(response.type).toBe('application/json')
  });
  it("gets every invalid messageFromLeader", async () => {
    const response = await request(server).get("/messages/invalid");
    expect(response.status).toEqual(200)
    expect(response.status).not.toBe(400)
    expect(response.type).toBe('application/json')
  });
});

describe("store a message", () => {
  it("stores a valid DANGER message", async () => {
    const message = 'Mditz Mofqy Macinox'
    const response = await request(server).post("/store-message").send(message)
    expect(response.status).toEqual(200)
    expect(response.status).not.toBe(400)
    expect(response.type).toBe('application/json')
  })
})
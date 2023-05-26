import "../../../loadEnviroments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request, { type Response } from "supertest";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import Synth from "../../../database/models/Synths";
import app from "../../app.js";
import paths from "../../utils/paths/paths.js";
import User from "../../../database/models/User.js";
import { adminTokenMock, adminUserDbMock } from "../../../mocks/mocks.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData.js";
import { type SynthsStructure, synthsMock } from "../../../mocks/synthMocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Synth.deleteMany();
});

describe("Given a GET '/synths' endpoint", () => {
  beforeAll(async () => {
    await User.create(adminUserDbMock);
    await Synth.create(synthsMock);
  });
  describe("When it receives a request with an authorized header", () => {
    test("Then it should responde with a 200 status and a synths list", async () => {
      const response: { body: SynthsStructure[] } = await request(app)
        .get(paths.synths)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .expect(responseStatusCode.ok);

      expect(response.body).toHaveLength(2);
    });
  });
  describe("When it receives a request with an invalid token", () => {
    test("Then it should reject with status code 401 and a error message ''", async () => {
      const response: Response = await request(app)
        .get(paths.synths)
        .expect(responseStatusCode.unauthorized);

      expect(response.body.message).toBe(responseMessage.missingToken);
    });
  });
});

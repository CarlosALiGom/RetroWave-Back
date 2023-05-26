import "../../../loadEnviroments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import request, { type Response } from "supertest";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User";
import { type UserDbStructure } from "../../types";
import { userDbMock, userMock, wrongUserDbMock } from "../../../mocks/mocks";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData";
import app from "../../app";
import paths from "../../utils/paths/paths";

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
  await User.deleteMany();
});
describe("Given a POST 'user/login'", () => {
  let newUser: UserDbStructure;

  beforeAll(async () => {
    newUser = await User.create(userDbMock);
  });
  describe("When it receives a request with valid user credentials", () => {
    test("Then it should respond with a status 200 and a token", async () => {
      const expectedStatusCode = responseStatusCode.ok;

      const response: { body: { token: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(userMock)
        .expect(expectedStatusCode);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);
      const userId = payload.sub as string;

      expect(userId).toBe(newUser._id.toString());
    });
  });

  describe("When it receives an unvalid user credentials", () => {
    test("Then it should respond with a status 400 and a 'Validation failed' message", async () => {
      const expectedStatusCode = responseStatusCode.badRequest;
      const expectedErrorMessage = responseMessage.badRequest;

      const response: Response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(wrongUserDbMock)
        .expect(expectedStatusCode);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedErrorMessage);
    });
  });
});

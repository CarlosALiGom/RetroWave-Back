import "../../../loadEnviroments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import Synth from "../../../database/models/Synths";
import app from "../../app.js";
import paths from "../../utils/paths/paths.js";
import {
  adminTokenMock,
  adminUserDbMock,
  juditTokenMock,
} from "../../../mocks/mocks.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData.js";
import {
  synthsMock,
  synthsMockAdminId,
  addSynthMock,
  updateObjectIdSynthMock,
} from "../../../mocks/synthMocks.js";
import User from "../../../database/models/User.js";

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
  await User.deleteMany();
});

describe("Given a GET '/synths' endpoint", () => {
  beforeEach(async () => {
    await Synth.create(synthsMockAdminId);
    await User.create(adminUserDbMock);
  });
  describe("When it receives a request with an authorized header", () => {
    test("Then it should responde with a 200 status and a synths list", async () => {
      const response = await request(app)
        .get(paths.synths)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .expect(responseStatusCode.ok);

      expect(response.body.synths).toHaveLength(2);
    });
  });
  describe("When it receives a request with an invalid token", () => {
    test("Then it should reject with status code 401 and a error message ''", async () => {
      const response = await request(app)
        .get(paths.synths)
        .expect(responseStatusCode.unauthorized);

      expect(response.body.message).toBe(responseMessage.missingToken);
    });
  });
});

describe("Given a DELETE '/synths/:synthId' endpoint", () => {
  beforeEach(async () => {
    await Synth.create(synthsMock);
  });
  describe("When it receives a request with param synthId valid", () => {
    test("Then it should respond a status 200 and a message 'Synth deleted succesfully'", async () => {
      const expectedStatusCode = responseStatusCode.ok;
      const expectedMessage = "Synth deleted succesfully";

      const synths = await Synth.find().exec();

      const response = await request(app)
        .delete(`/synths/${synths[0]._id.toString()}`)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with the error 404 and the message 'Synth not found'", async () => {
      const expectedMessage = "Synth not found";
      const expectedStatus = responseStatusCode.notFound;
      const invalidId = "5fbd2a81f4b3c96d54d32c9a";

      const response = await request(app)
        .delete(`/synths/${invalidId}`)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST '/synths' endpoint", () => {
  describe("When it receives a request with a synth and an auth token", () => {
    test("Then it should respod with an status 200 and a message 'Synth added succesfully'", async () => {
      const response = await request(app)
        .post(paths.synths)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .send({ synth: addSynthMock })
        .expect(responseStatusCode.created);

      expect(response.body).toHaveProperty("synth");
    });
  });

  describe("When it receives a request with a synth and an invalid token", () => {
    test("Then it should respod with an status 401 and a message 'Validation Failed'", async () => {
      const expectedMessage = "Validation Failed";

      const response = await request(app)
        .post(paths.synths)
        .set("Authorization", `Bearer ${juditTokenMock}`)
        .send({ synth: addSynthMock })
        .expect(responseStatusCode.unauthorized);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a GET '/synths/:synthId' endpoint", () => {
  beforeEach(async () => {
    await Synth.create(synthsMock);
  });
  describe("When it receives a request with param synthId valid", () => {
    test("Then it should respond a status 200 and the synth that match the synthId inside and object with a property 'synth'", async () => {
      const expectedStatusCode = responseStatusCode.ok;
      const expectedProperty = "synth";

      const synths = await Synth.find().exec();

      const response = await request(app)
        .get(`/synths/${synths[0]._id.toString()}`)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with the error 404 and the message 'Synth not found'", async () => {
      const expectedMessage = "Synth not found";
      const expectedStatus = responseStatusCode.notFound;
      const invalidId = "5fbd2a81f4b3c96d54d32c9a";

      const response = await request(app)
        .get(`/synths/${invalidId}`)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a PUT '/synths/:synthId' endpoint", () => {
  beforeEach(async () => {
    await Synth.create(synthsMock);
  });
  describe("When it receives a request with valids param synthId and synth", () => {
    test("Then it should respond a status 200 and a message 'Synth updated succesfully'", async () => {
      const expectedStatusCode = responseStatusCode.ok;
      const expectedMessage = "Synth updated succesfully";

      const synths = await Synth.find().exec();

      const response = await request(app)
        .put(`/synths/${synths[0]._id.toString()}`)
        .set("Authorization", `Bearer ${adminTokenMock}`)
        .send({ synth: updateObjectIdSynthMock })
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});

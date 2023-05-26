import request from "supertest";
import app from "./app";
import { responseStatusCode } from "./utils/responseData/responseData";
import paths from "./utils/paths/paths";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a statusCode 200 and a 'pong 🏓' message", async () => {
      const expectedStatus = responseStatusCode.ok;
      const message = "pong 🏓";

      const response = await request(app)
        .get(paths.pingController)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual({ message });
    });
  });
});

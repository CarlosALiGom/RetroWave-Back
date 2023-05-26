import { type NextFunction, type Request, type Response } from "express";
import { pingController } from "./pingController";
import { responseStatusCode } from "../../utils/responseData/responseData";

describe("Given a pingController", () => {
  describe("When it receives a request", () => {
    test("Then it should call the status method of the response with a 200 and the json method with a 'pong 🏓' message", () => {
      const req = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const expectedStatusCode = responseStatusCode.ok;
      const message = "pong 🏓";

      pingController(req as Request, res as Response, next as NextFunction);

      expect(res.status).toBeCalledWith(expectedStatusCode);
      expect(res.json).toBeCalledWith({ message });
    });
  });
});

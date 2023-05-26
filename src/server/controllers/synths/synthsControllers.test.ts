import { type NextFunction, type Response, type Request } from "express";
import Synth from "../../../database/models/Synths";
import { responseStatusCode } from "../../utils/responseData/responseData";
import getSynths from "./synthsControllers";
import { synthsMock } from "../../../mocks/synthMocks";

describe("Given a getSynths synthsControllers", () => {
  const request = {};
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with a request", () => {
    const expectedStatusCode = responseStatusCode.ok;

    Synth.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(synthsMock),
    });

    test("Then it should call the status method of the response with a 200", async () => {
      await getSynths(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the status method of the response with a 200", async () => {
      await getSynths(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.json).toBeCalledWith(synthsMock);
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Fatal Error' error", () => {
    test("Then it should call next function with error 'Fatal Error'", async () => {
      const error = new Error("Fatal Error");

      Synth.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getSynths(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

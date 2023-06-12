import { type NextFunction, type Response } from "express";
import { responseStatusCode } from "../../../utils/responseData/responseData";
import { synthsMockAdminId } from "../../../../mocks/synthMocks";
import { type CustomRequest } from "../../../types";
import { getSynths } from "../synthsControllers.js";
import Synth from "../../../../database/models/Synths";

describe("Given a getSynths synthsControllers", () => {
  const request: Partial<CustomRequest> = {
    query: {
      skip: "10",
      limit: "20",
    },
  };
  const totalSynths = 2;
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  Synth.where = jest.fn().mockReturnValue({
    countDocuments: jest.fn().mockResolvedValue(totalSynths),
  });
  describe("When it receives a request", () => {
    const expectedStatusCode = responseStatusCode.ok;

    Synth.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(synthsMockAdminId),
          }),
        }),
      }),
    });

    test("Then it should call the status method of the response with a 200", async () => {
      const request: Partial<CustomRequest> = {
        query: {
          skip: "10",
          limit: "20",
          type: "Analog",
        },
      };

      await getSynths(
        request as CustomRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with a synt list", async () => {
      await getSynths(
        request as CustomRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.json).toBeCalledWith({
        synths: synthsMockAdminId,
        totalSynths,
      });
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Fatal Error' error", () => {
    test("Then it should call next function with error 'Fatal Error'", async () => {
      const error = new Error("Fatal Error");

      Synth.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockRejectedValue(error),
            }),
          }),
        }),
      });

      await getSynths(
        request as CustomRequest,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

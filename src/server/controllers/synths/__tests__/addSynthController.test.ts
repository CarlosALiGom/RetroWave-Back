import { Types } from "mongoose";
import { synthMockSingle } from "../../../../mocks/synthMocks";
import { type CustomRequest } from "../../../types";
import { type NextFunction, type Response } from "express";
import { addSynth } from "../synthsControllers";
import Synth from "../../../../database/models/Synths";
import { responseStatusCode } from "../../../utils/responseData/responseData";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();
const userId = new Types.ObjectId().toString();
const synth = synthMockSingle;

const request: Partial<CustomRequest> = {
  userId,
  body: {
    synth,
  },
};
describe("Given a addSynth controller", () => {
  describe("When it receives a request with a userId and a synth", () => {
    test("Then it should call the status method of the response with a 200 and the json with the synth'", async () => {
      const expectedStatusCode = responseStatusCode.ok;

      Synth.create = jest.fn().mockResolvedValue(synth);

      await addSynth(
        request as CustomRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ synth });
    });
  });

  describe("When it receives a request with an unvalid userId or an unvalid synth", () => {
    test("then it should call the next function with an error 'Synth or user invalid'", async () => {
      const expectedError = new CustomError(
        responseStatusCode.notFound,
        "Synth or user invalid"
      );
      const request: Partial<CustomRequest> = {
        userId: undefined,
        body: {
          synth: undefined,
        },
      };

      await addSynth(
        request as CustomRequest,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

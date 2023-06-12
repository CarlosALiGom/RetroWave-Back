import { Types } from "mongoose";
import { type NextFunction, type Response } from "express";
import { getSelectedSynth } from "../synthsControllers";
import { type IdParamsRequest } from "../../../types";
import {
  responseMessage,
  responseStatusCode,
} from "../../../utils/responseData/responseData";
import { synthMockSingle } from "../../../../mocks/synthMocks";
import Synth from "../../../../database/models/Synths";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const synthId = new Types.ObjectId().toString();

describe("Given a getSelectedSynth synthsControllers", () => {
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const request: Partial<IdParamsRequest> = {
    params: {
      synthId,
    },
  };

  describe("When it receives a request with a valid synthId", () => {
    test("Then it should call the status method of the response with a 200", async () => {
      const expectedStatusCode = responseStatusCode.ok;
      const synth = synthMockSingle;

      Synth.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(synth),
      });

      await getSelectedSynth(
        request as IdParamsRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ synth });
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should call the status method of the response with a 404 and the json with a message 'Synth not found'", async () => {
      const expectedError = new CustomError(
        responseStatusCode.notFound,
        responseMessage.synthNotFound
      );

      Synth.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(false),
      });

      await getSelectedSynth(
        request as IdParamsRequest,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Error connecting to database finding synth' error", () => {
    test("Then it should call next function with error 'Error connecting to database finding synth'", async () => {
      const error = new Error("Error connecting to database finding synth");

      Synth.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getSelectedSynth(
        request as IdParamsRequest,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

import { type NextFunction, type Response } from "express";
import { responseStatusCode } from "../../../utils/responseData/responseData";
import { deleteSynth } from "../synthsControllers";
import Synth from "../../../../database/models/Synths";
import { type IdParamsRequest } from "../../../types";
import { synthMockSingle } from "../../../../mocks/synthMocks";
import { Types } from "mongoose";

beforeEach(() => {
  jest.clearAllMocks();
});

const synthId = new Types.ObjectId().toString();
const userId = new Types.ObjectId().toString();
describe("Given a deleteSynth synthsControllers", () => {
  const request: Partial<IdParamsRequest> = {
    params: {
      synthId,
    },
    userId,
  };
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("when it receives a request with a valid synth id", () => {
    test("Then it should call the status method of the response with a 200 and the json with a message 'Synth deleted succesfully'", async () => {
      const expectedStatusCode = responseStatusCode.ok;
      const expectedMessage = "Synth deleted succesfully";

      Synth.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(synthId),
      });

      Synth.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(synthMockSingle),
      });

      await deleteSynth(
        request as IdParamsRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should call the status method of the response with a 404 and the json with a message 'Synth not found'", async () => {
      const expectedMessage = "Synth not found";
      const expectedStatusCode = responseStatusCode.notFound;

      Synth.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      Synth.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(synthMockSingle),
      });

      await deleteSynth(
        request as IdParamsRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({
        message: expectedMessage,
      });
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Error connecting to database to delete synth' error", () => {
    test("Then it should call next function with error 'Error connecting to database to delete synth'", async () => {
      const error = new Error("Error connecting to database to delete synth");

      Synth.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(synthId),
      });

      Synth.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await deleteSynth(
        request as IdParamsRequest,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

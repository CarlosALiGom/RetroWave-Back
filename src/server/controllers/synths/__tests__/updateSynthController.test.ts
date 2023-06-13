import { type NextFunction, type Response } from "express";
import { Types } from "mongoose";
import { type UpdateSynthRequest } from "../../../types";
import { responseStatusCode } from "../../../utils/responseData/responseData.js";
import { updateSynth } from "../synthsControllers.js";
import Synth from "../../../../database/models/Synths";
import { updateObjectIdSynthMock } from "../../../../mocks/synthMocks";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const synthId = new Types.ObjectId().toString();
const userId = new Types.ObjectId().toString();
describe("Given a updateSynth synthsControllers", () => {
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const request: Partial<UpdateSynthRequest> = {
    params: {
      synthId,
    },
    body: {
      synth: updateObjectIdSynthMock,
    },
    userId,
  };
  describe("when it receives a request with a valid synth id, and a valid synth", () => {
    test("Then it should call the status method of the response with a 200 and the json with a message 'Synth updated succesfully'", async () => {
      const expectedStatusCode = responseStatusCode.ok;
      const expectedMessage = "Synth updated succesfully";

      Synth.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue({ synht: updateObjectIdSynthMock });

      await updateSynth(
        request as UpdateSynthRequest,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request and rejects", () => {
    test("Then it should call the status method of the response with a 500 and the json with a message 'General Error'", async () => {
      const expectedError = new CustomError(
        responseStatusCode.internalServerError,
        "General Error"
      );

      Synth.findByIdAndUpdate = jest.fn().mockRejectedValue(expectedError);

      await updateSynth(
        request as UpdateSynthRequest,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

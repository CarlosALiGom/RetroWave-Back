import { type NextFunction, type Request, type Response } from "express";
import { generalError, notFoundError } from "./errorMiddlewares";
import CustomError from "../../../CustomError/CustomError.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {};
const next = jest.fn();
describe("Given a notFoundError errorMiddleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with the error 'Endpoint not found'", () => {
      const res = {};
      const expectedError = new CustomError(
        responseStatusCode.notFound,
        responseMessage.notFound
      );

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalError errorMiddleware", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request and an unknown error", () => {
    test("Then it should call the status method of the response with a 500 and the json method with an 'General Error' message", () => {
      const error = new Error(responseMessage.generalError);
      const expectedStatus = responseStatusCode.internalServerError;
      const { message } = error;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });

  describe("When it receives a request an error with status 404 and a 'Endpoint not found'", () => {
    test("Then it should call the status method of the response with a 404 and the json method with 'Endpoint not found'", () => {
      const customError = new CustomError(
        responseStatusCode.notFound,
        responseMessage.notFound
      );
      const expectedStatus = responseStatusCode.notFound;
      const message = responseMessage.notFound;

      generalError(
        customError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});

import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware";
import { juditTokenMock } from "../../../mocks/mocks";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData";
import CustomError from "../../../CustomError/CustomError";
import { type CustomRequest } from "../../types";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given an authMiddleware", () => {
  const next = jest.fn();
  const res = {};

  describe("When it receives a request with a valid token", () => {
    test("Then it should call the next function", () => {
      const token = juditTokenMock;

      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };

      jwt.verify = jest.fn();

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with an unvalid token", () => {
    test("Then it should call the next function with an status 401 and a 'Missing Token' message", () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      const error = new CustomError(
        responseStatusCode.unauthorized,
        responseMessage.missingToken
      );

      jwt.verify = jest.fn();

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

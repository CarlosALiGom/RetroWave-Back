import { type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../types";
import { loginUser } from "./userControllers";
import User from "../../../database/models/User";
import { user, userData } from "../../../mocks/mocks";
import { token } from "morgan";
import CustomError from "../../../CustomError/CustomError.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<UserCredentialsRequest> = {
  body: user,
};
const res: Pick<Response, "status" | "json"> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();
describe("Given a loginUser controller", () => {
  describe("When it receives a request with a valid user credentials", () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue(token);

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(userData),
    });
    test("Then it should call the status method of the response with a 200", async () => {
      const expectedStatusCode = responseStatusCode.ok;

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the status method of the response with a 200", async () => {
      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a non valid user credentials", () => {
    test("Then it should call the next function with a custom error with status 401 and message 'Wrong credential'", async () => {
      const error = new CustomError(
        responseStatusCode.unauthorized,
        responseMessage.unauthorized
      );

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

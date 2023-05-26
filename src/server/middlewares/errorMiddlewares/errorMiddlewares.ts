import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData.js";

const debugError = createDebug(
  "retroWave-api:server:middlewares:errorMiddlewares"
);

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    responseStatusCode.notFound,
    responseMessage.notFound
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debugError(error.message);

  const statusCode = error.statusCode || responseStatusCode.internalServerError;

  const message = error.statusCode ? error.message : "General Error";

  res.status(statusCode).json({ message });
};

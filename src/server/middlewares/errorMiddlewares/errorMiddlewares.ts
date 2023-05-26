import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";

const debugError = createDebug(
  "retroWave-api:server:middlewares:errorMiddlewares"
);

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debugError(error.message);

  const statusCode = error.statusCode || 500;

  const message = error.statusCode ? error.message : "General Error";

  res.status(statusCode).json({ message });
};

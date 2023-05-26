import { type NextFunction, type Request, type Response } from "express";
import { responseStatusCode } from "../../utils/responseData/responseData.js";

export const pingController = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(responseStatusCode.ok).json({ message: "pong 🏓" });
};

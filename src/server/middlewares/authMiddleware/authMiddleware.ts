import "../../../loadEnviroments.js";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData.js";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        responseStatusCode.unauthorized,
        responseMessage.missingToken
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET!);

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default auth;

import "../../../loadEnviroments.js";
import createDebug from "debug";
import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData.js";
import chalk from "chalk";
import { type CustomRequest } from "../../types.js";

const debug = createDebug("retroWave-api:servermiddleWares:authMiddleware");
const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      debug(chalk.red("Missing token or invalid format"));
      const error = new CustomError(
        responseStatusCode.unauthorized,
        responseMessage.missingToken
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const newError = new CustomError(
      responseStatusCode.unauthorized,
      responseMessage.badRequest
    );
    const customError =
      (error as Error).name === "JsonWebTokenError" ? newError : error;

    next(customError);
  }
};

export default auth;

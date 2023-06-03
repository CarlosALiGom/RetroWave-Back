import { type NextFunction, type Response } from "express";
import Synth from "../../../database/models/Synths.js";
import { type CustomRequest } from "../../types.js";
import { responseStatusCode } from "../../utils/responseData/responseData.js";

const getSynths = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  try {
    const synths = await Synth.find({ user: userId }).limit(10).exec();

    res.status(responseStatusCode.ok).json(synths);
  } catch (error: unknown) {
    next(error);
  }
};

export default getSynths;

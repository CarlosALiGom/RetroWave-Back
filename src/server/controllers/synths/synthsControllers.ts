import { type NextFunction, type Response, type Request } from "express";
import Synth from "../../../database/models/Synths";
import { responseStatusCode } from "../../utils/responseData/responseData";

const getSynths = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const synths = await Synth.find().exec();

    res.status(responseStatusCode.ok).json(synths);
  } catch (error: unknown) {
    next(error);
  }
};

export default getSynths;

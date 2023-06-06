import { type NextFunction, type Response, type Request } from "express";
import Synth from "../../../database/models/Synths.js";
import { type CustomRequest } from "../../types.js";
import { responseStatusCode } from "../../utils/responseData/responseData.js";

export const getSynths = async (
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

export const deleteSynth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { synthId } = req.params;
    const synthToDelete = await Synth.findById(synthId).exec();

    if (!synthToDelete) {
      return res
        .status(responseStatusCode.notFound)
        .json({ message: "Synth not found" });
    }

    await Synth.findByIdAndDelete(synthId).exec();
    res
      .status(responseStatusCode.ok)
      .json({ message: "Synth deleted succesfully" });
  } catch (error) {
    error.message = "Error connecting to database to delete synth";

    next(error);
  }
};

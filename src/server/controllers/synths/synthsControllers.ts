import { type NextFunction, type Response, type Request } from "express";
import Synth from "../../../database/models/Synths.js";
import { type AddSynthRequest, type CustomRequest } from "../../types.js";
import {
  responseMessage,
  responseStatusCode,
} from "../../utils/responseData/responseData.js";
import CustomError from "../../../CustomError/CustomError.js";
import { Types } from "mongoose";

export const getSynths = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    query: { skip, limit },
  } = req;
  const newLimit = Number(limit);
  const newSkip = Number(skip) * newLimit;
  const totalSynths = await Synth.where({ user: userId }).countDocuments();

  try {
    const synths = await Synth.find({ user: userId })
      .sort({ _id: -1 })
      .skip(newSkip)
      .limit(newLimit)
      .exec();

    res.status(responseStatusCode.ok).json({ synths, totalSynths });
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
      throw new CustomError(
        responseStatusCode.notFound,
        responseMessage.synthNotFound
      );
    }

    await Synth.findByIdAndDelete(synthId).exec();
    res
      .status(responseStatusCode.ok)
      .json({ message: "Synth deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

export const addSynth = async (
  req: AddSynthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, userId } = req;

    if (!body.synth || !userId) {
      throw new CustomError(
        responseStatusCode.badRequest,
        "Synth or user invalid"
      );
    }

    const newSynth = await Synth.create({
      ...body.synth,
      user: new Types.ObjectId(userId),
    });

    res.status(responseStatusCode.created).json({ synth: newSynth });
  } catch (error) {
    next(error);
  }
};

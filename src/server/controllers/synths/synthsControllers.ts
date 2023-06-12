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
    query: { skip, limit, type },
  } = req;
  const newLimit = Number(limit);
  const newSkip = Number(skip) * newLimit;
  let synthQuery = {};

  if (type) {
    synthQuery = { user: userId, type };
  } else {
    synthQuery = { user: userId };
  }

  const totalSynths = await Synth.where(synthQuery).countDocuments();

  try {
    const synths = await Synth.find(synthQuery)
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

export const getSelectedSynth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { synthId } = req.params;

  try {
    const synth = await Synth.findById(synthId).exec();

    if (!synth) {
      throw new CustomError(
        responseStatusCode.notFound,
        responseMessage.synthNotFound
      );
    }

    res.status(responseStatusCode.ok).json({ synth });
  } catch (error: unknown) {
    next(error);
  }
};

import "../../../loadEnviroments.js";
import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../types";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(user.password, password))) {
      throw new CustomError(401, "Wrong credentials");
    }

    const tokenPayload: JwtPayload = {
      name: username,
      sub: user._id.toString(),
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

import { Joi } from "express-validation";
import { type UserCredentials } from "../types";

export const loginSchema = {
  body: Joi.object<UserCredentials>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

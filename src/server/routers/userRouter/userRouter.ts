import Router from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/user/userControllers.js";
import paths from "../../utils/paths/paths.js";
import { loginSchema } from "../../schemas/UserSchema.js";

const userRouter = Router();

userRouter.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;

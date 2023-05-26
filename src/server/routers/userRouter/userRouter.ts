import Router from "express";
import { loginUser } from "../../controllers/user/userControllers.js";
import paths from "../../utils/paths/paths.js";

const userRouter = Router();

userRouter.post(paths.login, loginUser);

export default userRouter;

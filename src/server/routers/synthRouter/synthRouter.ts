import Router from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import { getSynths } from "../../controllers/synths/synthsControllers.js";

const synthRouter = Router();

synthRouter.get("/", auth, getSynths);

export default synthRouter;

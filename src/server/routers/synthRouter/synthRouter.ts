import Router from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware";
import getSynths from "../../controllers/synths/synthsControllers";

const synthRouter = Router();

synthRouter.get("/", auth, getSynths);

export default synthRouter;

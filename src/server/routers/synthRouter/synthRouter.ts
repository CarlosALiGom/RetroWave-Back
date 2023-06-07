import Router from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  deleteSynth,
  getSynths,
} from "../../controllers/synths/synthsControllers.js";

const synthRouter = Router();

synthRouter.get("/", auth, getSynths);

synthRouter.delete("/:synthId", auth, deleteSynth);

export default synthRouter;

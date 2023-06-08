import { Router } from "express";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  addSynth,
  deleteSynth,
  getSynths,
} from "../../controllers/synths/synthsControllers.js";

const synthRouter = Router();

synthRouter.get("/", auth, getSynths);

synthRouter.delete("/:synthId", auth, deleteSynth);

synthRouter.post("/", auth, addSynth);

export default synthRouter;

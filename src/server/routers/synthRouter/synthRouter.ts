import { Router } from "express";
import { validate } from "express-validation";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  addSynth,
  deleteSynth,
  getSelectedSynth,
  getSynths,
} from "../../controllers/synths/synthsControllers.js";
import { SynthSchema } from "../../schemas/SynthSchema.js";

const synthRouter = Router();

synthRouter.get("/", auth, getSynths);

synthRouter.delete("/:synthId", auth, deleteSynth);

synthRouter.post(
  "/",
  auth,
  validate(SynthSchema, {}, { abortEarly: false }),
  addSynth
);

synthRouter.get("/:synthId", auth, getSelectedSynth);

export default synthRouter;

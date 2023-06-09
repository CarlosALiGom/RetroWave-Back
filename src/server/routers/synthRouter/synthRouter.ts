import { Router } from "express";
import { validate } from "express-validation";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  addSynth,
  deleteSynth,
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

export default synthRouter;

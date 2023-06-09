import { Joi } from "express-validation";
import { type AddSynthStructure } from "../../mocks/synthMocks";

export const SynthSchema = {
  body: Joi.object({
    synth: Joi.object<AddSynthStructure>({
      name: Joi.string().required(),
      brand: Joi.string().required(),
      yearOfCreation: Joi.string().required(),
      imageUrl: Joi.string().required(),
      type: Joi.string().valid("Analog", "Hibryd", "Digital").required(),
      description: Joi.string().required(),
    }),
  }),
};

import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const synthSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    yearOfCreation: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Synth = model("Synth", synthSchema, "synths");

export default Synth;

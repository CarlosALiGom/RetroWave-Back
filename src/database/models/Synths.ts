import { Schema, Types, model } from "mongoose";
import User from "./User";

const synthSchema = new Schema({
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
});

const Synth = model("Synth", synthSchema, "synths");

export default Synth;

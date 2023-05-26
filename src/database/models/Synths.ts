import { Schema, model } from "mongoose";

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
});

const Synth = model("Synth", synthSchema, "synths");

export default Synth;

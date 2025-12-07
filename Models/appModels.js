import mongoose from "mongoose";
const { Schema, model } = mongoose;

const appSchema = new Schema(
  {
    name: { type: String, required: true },
    appImage: { type: String,required: true },
    slogan: { type: String, required: true },
    appBanner: { type: String,required: true },
    age: { type: String, required: true }, // changed from Number to String
    description: { type: String, required: true },
    version: { type: String, required: true },
    developer: { type: String, required: true },
    size: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    language: { type: [String], required: true },
  },
  { timestamps: true }
);

const AppModel = model("App", appSchema);

export default AppModel;

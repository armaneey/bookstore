import mongoose from "mongoose";

const tankSchema = mongoose.Schema(
  {
    name: String,
    size: String,
  },
  {
    timestamps: true,
  }
);

export const Tank = mongoose.model("Tank", tankSchema);

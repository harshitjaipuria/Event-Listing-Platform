import mongoose, { Schema } from "mongoose";

const clubSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    department: { type: String, default: "General" },
    eventsHosted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Club || mongoose.model("Club", clubSchema);

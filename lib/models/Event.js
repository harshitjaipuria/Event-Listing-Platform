import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    department: { type: String, required: true },
    type: { type: String, enum: ["workshop", "fest", "hackathon", "seminar"], required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    organizer: { type: String, required: true },
    tags: [{ type: String }],
    bannerImage: { type: String },
    interestedCount: { type: Number, default: 0 },
    trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer_not_say"],
    },
    year: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    department: { type: String, default: "General" },
    interestedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

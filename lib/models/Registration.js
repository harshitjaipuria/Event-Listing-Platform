import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: { type: String, enum: ["registered", "interested"], default: "registered" },
  },
  { timestamps: true }
);

registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.models.Registration || mongoose.model("Registration", registrationSchema);

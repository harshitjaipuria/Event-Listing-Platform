import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema(
  {
    // eventId is a plain string (e.g. "event-1") from the static data file
    eventId: { type: String, required: true },
    // Optional link to a logged-in user account
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    // Participant details collected from the form
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    status: { type: String, enum: ["registered", "interested"], default: "registered" },
  },
  { timestamps: true }
);

// One registration per roll number per event
registrationSchema.index({ rollNumber: 1, eventId: 1 }, { unique: true });

export default mongoose.models.Registration || mongoose.model("Registration", registrationSchema);

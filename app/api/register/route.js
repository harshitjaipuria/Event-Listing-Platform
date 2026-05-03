import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/lib/models/Registration";
import Event from "@/lib/models/Event";
import { getUserFromRequest, unauthorizedResponse } from "@/lib/utils/auth";

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user) return unauthorizedResponse();

  try {
    const { eventId, status = "registered" } = await request.json();
    await connectDB();

    const registration = await Registration.findOneAndUpdate(
      { userId: user.userId, eventId },
      { userId: user.userId, eventId, status },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (status === "interested") {
      await Event.findByIdAndUpdate(eventId, { $inc: { interestedCount: 1 } });
    }

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 400 }
    );
  }
}

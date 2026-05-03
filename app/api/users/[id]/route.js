import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Registration from "@/lib/models/Registration";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const user = await User.findById(id).select("-passwordHash").lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const registrations = await Registration.find({ userId: id }).populate("eventId").lean();
    return NextResponse.json({ ...user, registrations });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 400 });
  }
}

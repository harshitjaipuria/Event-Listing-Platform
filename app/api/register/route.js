import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/lib/models/Registration";
import { getUserFromRequest } from "@/lib/utils/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { eventId, name, email, mobile, rollNumber, year, department, status = "registered" } = body;

    // Validate required fields
    if (!eventId || !name || !email || !mobile || !rollNumber || !year || !department) {
      return NextResponse.json({ message: "All participant details are required." }, { status: 400 });
    }

    await connectDB();

    // Optionally link to a logged-in user
    const user = getUserFromRequest(request);

    // Check for duplicate registration (same roll number + same event)
    const existing = await Registration.findOne({ rollNumber: rollNumber.trim(), eventId });
    if (existing) {
      return NextResponse.json(
        { message: "You have already registered for this event with this roll number." },
        { status: 409 }
      );
    }

    const registration = await Registration.create({
      eventId,
      userId: user?.userId ?? null,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      rollNumber: rollNumber.trim(),
      year,
      department,
      status,
    });

    return NextResponse.json({ message: "Registration successful!", registration }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed.", error: error.message },
      { status: 400 }
    );
  }
}

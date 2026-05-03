import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import { events as dummyEvents } from "@/lib/data";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 }).lean();
    return NextResponse.json(events);
  } catch {
    return NextResponse.json(dummyEvents);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    const event = await Event.create(body);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create event", error: error.message },
      { status: 400 }
    );
  }
}

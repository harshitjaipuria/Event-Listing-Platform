import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import { events as dummyEvents } from "@/lib/data";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const event = await Event.findById(id).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch {
    const { id } = await params;
    const event = dummyEvents.find((item) => item._id === id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Club from "@/lib/models/Club";
import { clubs as dummyClubs } from "@/lib/data";

export async function GET() {
  try {
    await connectDB();
    const clubs = await Club.find().sort({ name: 1 }).lean();
    return NextResponse.json(clubs);
  } catch {
    return NextResponse.json(dummyClubs);
  }
}

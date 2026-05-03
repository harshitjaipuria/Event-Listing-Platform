import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { createToken } from "@/lib/utils/auth";

function formatValidationError(error) {
  if (error instanceof mongoose.Error.ValidationError && error.errors) {
    return Object.values(error.errors).map((e) => e.message);
  }
  return [];
}

export async function POST(request) {
  try {
    if (!process.env.MONGODB_URI?.trim()) {
      return NextResponse.json(
        { message: "Server misconfiguration: MONGODB_URI is not set. Add it to .env and restart the dev server." },
        { status: 500 }
      );
    }
    if (!process.env.JWT_SECRET?.trim()) {
      return NextResponse.json(
        { message: "Server misconfiguration: JWT_SECRET is not set. Add it to .env and restart the dev server." },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: "Invalid request body (expected JSON)" }, { status: 400 });
    }

    const { name, rollNumber, mobile, email, gender, year, password } = body;

    if (!password || String(password).length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    const allowedGender = ["male", "female", "other", "prefer_not_say"];
    if (!allowedGender.includes(gender)) {
      return NextResponse.json({ message: "Invalid gender" }, { status: 400 });
    }

    if (!name?.trim() || !rollNumber?.trim() || !mobile?.trim() || !email?.trim() || !year?.trim()) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingEmail) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 });
    }

    const existingRoll = await User.findOne({ rollNumber: rollNumber.trim() });
    if (existingRoll) {
      return NextResponse.json({ message: "This roll number is already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      gender,
      year: String(year).trim(),
      passwordHash,
    });

    const token = createToken({ userId: user._id.toString(), email: user.email });
    const response = NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        year: user.year,
      },
      token,
    });
    response.cookies.set("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return response;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return NextResponse.json({ message: `Duplicate ${field}` }, { status: 409 });
    }

    const details = formatValidationError(error);
    const isMongoNetwork =
      error.name === "MongooseServerSelectionError" ||
      /MongoNetworkError|ECONNREFUSED|ENOTFOUND|SSL|authentication failed/i.test(String(error.message));

    if (isMongoNetwork) {
      return NextResponse.json(
        {
          message: "Cannot reach MongoDB. Check Atlas Network Access (allow your IP or 0.0.0.0/0 for dev), database user password, and MONGODB_URI.",
          error: error.message,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: "Signup failed",
        error: error.message,
        ...(details.length ? { details } : {}),
      },
      { status: 400 }
    );
  }
}

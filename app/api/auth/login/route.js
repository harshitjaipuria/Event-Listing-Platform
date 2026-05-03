import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { createToken } from "@/lib/utils/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email?.trim() || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });

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
    return NextResponse.json({ message: "Login failed", error: error.message }, { status: 400 });
  }
}

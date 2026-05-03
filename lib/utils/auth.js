import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(payload) {
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in .env.local");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in .env.local");
  return jwt.verify(token, JWT_SECRET);
}

export function getUserFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const cookieToken = request.cookies.get("token")?.value;
  const token = bearerToken || cookieToken;

  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

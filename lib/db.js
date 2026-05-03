import dns from "dns";
import mongoose from "mongoose";

/** Node on some Windows setups fails SRV lookup (querySrv ECONNREFUSED). Set e.g. MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1 in .env */
const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);
if (dnsServers.length) {
  dns.setServers(dnsServers);
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env (or .env.local) and restart the dev server");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "gla-events-platform",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

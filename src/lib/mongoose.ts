import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("Missing MONGODB_URI");

let cached: { conn: typeof mongoose | null } = { conn: null };

export default async function connect() {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

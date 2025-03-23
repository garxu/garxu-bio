import mongoose from "mongoose";
const uri = process.env.MONGODB_URI!;
export default async function connect() {
  if (!mongoose.connection.readyState) await mongoose.connect(uri);
}

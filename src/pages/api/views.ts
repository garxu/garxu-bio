import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/mongoose";
import View from "../../models/View";
export default async function handler(req, res) {
  await connect();
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const doc = await View.findOneAndUpdate(
    { ip },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  res.status(200).json({ count: doc.count });
}

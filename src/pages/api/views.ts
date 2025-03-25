import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../lib/mongoose';
import View from '../../models/view';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    const doc = await View.findOneAndUpdate(
      { ip },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    return res.status(200).json({ count: doc.count });
  } catch (error) {
    console.error('VIEW COUNTER ERROR:', error);
    return res.status(500).json({ count: 0 });
  }
}

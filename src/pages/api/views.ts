import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../lib/mongoose';
import View from '../../models/view';

type Data = { count: number } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connect();

    const ip =
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

    const doc = await View.findOneAndUpdate(
      { ip },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({ count: doc.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update view count' });
  }
}

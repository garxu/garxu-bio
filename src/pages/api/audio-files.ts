import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(_: NextApiRequest, res: NextApiResponse<string[]>) {
  const dir = path.join(process.cwd(), 'public', 'audio');
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.mp3'))
    .map(f => `/audio/${f}`);
  res.status(200).json(files);
}

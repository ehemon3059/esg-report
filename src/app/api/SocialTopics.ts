// pages/api/SocialTopics.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const data = req.body;

    const created = await prisma.socialTopics.create({ data });

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Social Topics error:', err);
    return res.status(500).json({ error: 'Failed to create Social Topics record' });
  }
}

// pages/api/assurance.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const data = req.body;

    const created = await prisma.assurance.create({ data });

    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Assurance error:', err);
    return res.status(500).json({ error: 'Failed to create Assurance record' });
  }
}

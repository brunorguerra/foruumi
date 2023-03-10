import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from '@/lib/next-auth';
import prisma from '@/lib/prisma';

const createPostSchema = z.object({
  id: z.string().min(24),
  title: z.string().min(1),
  content: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  const { id, title, content } = createPostSchema.parse(req.body);

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        user_id: id,
      },
    });

    res.status(201).json({ message: 'Post created!' });
    return;
  } catch (error) {
    res.status(400).json({ message: 'Ocurred error!' });
  }
}

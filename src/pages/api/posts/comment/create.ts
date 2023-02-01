import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from '@/lib/next-auth';
import prisma from '@/lib/prisma';

const createCommentSchema = z.object({
  postId: z.string().min(1),
  userId: z.string().min(24),
  content: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  if (req.method !== 'POST') {
    return res.status(403).end();
  }

  const { userId, postId, content } = createCommentSchema.parse(req.body);

  try {
    await prisma.comment.create({
      data: {
        postId,
        content,
        user_id: userId,
      },
    });

    res.status(201).json({ message: 'Comment created.' });
    return;
  } catch (error) {
    res.status(400).json({ message: 'Erro inesperado' });
  }
}

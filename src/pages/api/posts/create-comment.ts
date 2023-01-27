import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const createCommentSchema = z.object({
  postId: z.string().min(1),
  email: z.string().min(1),
  content: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).end();
  }

  const { email, postId, content } = createCommentSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Erro inesperado' });
  }

  await prisma.comment.create({
    data: {
      postId,
      content,
      user_id: user?.id as string,
    },
  });

  return res.status(201).json({ message: 'Comment created.' });
}

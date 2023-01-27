import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const createPostSchema = z.object({
  email: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).end();
  }

  const { email, title, content } = createPostSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    await prisma.post.create({
      data: {
        title,
        content,
        user_id: user.id,
      },
    });

    return res.status(201).json({ message: 'Post criado!' });
  }

  return res.status(400).json({ message: 'Erro inesperado' });
}

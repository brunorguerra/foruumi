import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(403).end();
  }

  const { postId } = req.query;

  if (!postId) {
    return res.status(400).end();
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId as string,
    },
    include: {
      Comment: true,
      author: true,
    },
  });

  if (!post) {
    return res.status(404).end();
  }

  return res.status(200).json({ post });
}

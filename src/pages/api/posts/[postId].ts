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

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId as string,
      },

      select: {
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },

        Comment: {
          select: {
            content: true,
            createdAt: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(400).json({ message: 'Ocurred error at find post.' });
  }
}

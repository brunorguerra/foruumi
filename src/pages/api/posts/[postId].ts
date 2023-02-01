import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  const { postId } = req.query;

  if (!postId) {
    return res.status(400).end();
  }

  if (req.method === 'GET') {
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
              id: true,
              name: true,
            },
          },

          Comment: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              author: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!post) {
        res.status(404).json({ message: 'Post not found.' });
        return;
      }

      res.status(200).json({ post });
      return;
    } catch (error) {
      res.status(400).json({ message: 'Ocurred error at find post.' });
      return;
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.post.delete({
        where: {
          id: postId as string,
        },
      });

      res.status(200).json({ message: 'Post deleted!' });
      return;
    } catch (error) {
      res.status(400).json({ message: 'Ocurred error at deleting post.' });
      return;
    }
  }

  return res.status(403).end();
}

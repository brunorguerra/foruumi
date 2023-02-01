import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  if (req.method !== 'DELETE') {
    return res.status(403).end();
  }

  const { commentId } = req.query;

  try {
    await prisma.comment.delete({
      where: {
        id: commentId as string,
      },
    });

    res.status(200).json({ message: 'comment deleted!' });
    return;
  } catch (error) {
    res.status(400).json({ message: 'ocurred error at comment deletion' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from '@/lib/next-auth';
import prisma from '@/lib/prisma';

const userFormPutSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  currentPassword: z.string().min(1),
  newPassword: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  const { userId } = req.query;

  if (req.method === 'PUT') {
    const { name, email, currentPassword, newPassword } = userFormPutSchema.parse(req.body);

    try {
      const userExists = await prisma.user.findFirst({
        where: {
          id: userId as string,
          password: currentPassword,
        },
      });

      if (!userExists) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if (newPassword) {
        await prisma.user.update({
          where: {
            id: userId as string,
          },

          data: {
            name,
            email,
            password: newPassword,
          },
        });

        return res.status(200).end();
      }

      await prisma.user.update({
        where: {
          id: userId as string,
        },

        data: {
          name,
          email,
          password: currentPassword,
        },
      });

      return res.status(200).end();
    } catch (error) {
      return res.status(400).json({ message: 'Ocurred error at updated profile' });
    }
  }

  return res.status(403).end();
}

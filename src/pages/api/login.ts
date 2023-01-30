import { type NextApiRequest, type NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(403).end();
  }

  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },

    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  res.status(200).json({ user });
}

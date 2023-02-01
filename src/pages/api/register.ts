import { type NextApiRequest, type NextApiResponse } from 'next';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const LoginSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(3),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).end();
  }

  const { name, email, password } = LoginSchema.parse(req.body);

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400).json({ message: 'Email already taken.' });
    return;
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(201).json(user);
}

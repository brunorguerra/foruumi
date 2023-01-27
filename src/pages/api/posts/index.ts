import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(403).end();
  }

  const { page } = req.query;

  let currentPage;

  if (!page) {
    currentPage = 1;
  } else {
    currentPage = Number(page) === 0 ? 1 : Number(page);
  }

  const amountPosts = (await prisma.post.findMany()).length;
  const amountPages = Math.ceil(amountPosts / 2);

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (currentPage - 1) * 2,
    take: 2,
  });

  return res.status(200).json({
    posts,
    info: {
      currentPage,
      pages: amountPages,
      posts: amountPosts,
    },
  });
}

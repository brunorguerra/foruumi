import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { NEXTAUTH_SECRET } from '@/config';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',

      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        const user = await prisma.user.findFirst({
          where: {
            email,
            password,
          },
        });

        if (user) {
          return { ...user };
        }

        throw new Error('Credenciais incorreto');
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 60 * 60 * 1, // 1 hour
  },
  secret: NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';

interface CredentialsProps {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as CredentialsProps;

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

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 1, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
};

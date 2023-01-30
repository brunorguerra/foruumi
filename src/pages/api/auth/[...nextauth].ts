import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { api } from '@/lib/axios';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',

      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await api.post('/login', { email, password });
        const { user } = await res.data;

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
    session: ({ session, token }) => {
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
    maxAge: 60 * 60 * 1, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

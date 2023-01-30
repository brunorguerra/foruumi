import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends NextAuth.DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

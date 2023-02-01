import NextAuth from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';

export default NextAuth(authOptions);

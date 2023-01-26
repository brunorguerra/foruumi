import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { Login as AuthLogin } from '@/modules/auth';

import { authOptions } from '../api/auth/[...nextauth]';

export default function Login() {
  return <AuthLogin />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: {
        ...session,

        user: {
          image: null,
        },
      },
    },
  };
};

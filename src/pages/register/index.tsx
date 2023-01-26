import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { Register as AuthRegister } from '@/modules/auth';

import { authOptions } from '../api/auth/[...nextauth]';

export default function Register() {
  return <AuthRegister />;
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

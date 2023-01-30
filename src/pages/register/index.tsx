import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';

import { Register as AuthRegister } from '@/modules/auth';

import { authOptions } from '../api/auth/[...nextauth]';

export default function Register() {
  return (
    <>
      <Head>
        <title>Foruumi - Criar conta na plataforma</title>
      </Head>

      <AuthRegister />
    </>
  );
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

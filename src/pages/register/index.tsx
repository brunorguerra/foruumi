import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import { Register as AuthRegister } from '@/modules/auth';

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
  const session = await getServerSession(req, res, authOptions);

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
      session,
    },
  };
};

import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import { Login as AuthLogin } from '@/modules/auth';

export default function Login() {
  return (
    <>
      <Head>
        <title>Foruumi - Fazer login na plataforma</title>
      </Head>
      <AuthLogin />
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

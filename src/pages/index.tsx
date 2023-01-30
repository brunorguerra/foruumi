import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';

import { LastPosts } from '@/modules/forum';

import { authOptions } from './api/auth/[...nextauth]';

export default function Home() {
  return (
    <>
      <Head>
        <title>Foruumi - Página inicial</title>
      </Head>

      <LastPosts />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
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

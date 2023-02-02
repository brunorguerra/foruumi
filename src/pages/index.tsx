import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import { LastPosts } from '@/modules/forum';

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
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const newSession = {
    ...session,
    user: {
      ...session.user,
      image: null,
    },
  };

  return {
    props: {
      session: newSession,
    },
  };
};

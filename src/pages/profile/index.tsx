import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import { Profile as MyProfile } from '@/modules/forum/pages';

export default function Profile() {
  return <MyProfile />;
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

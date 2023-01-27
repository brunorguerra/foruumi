import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { Post as ForumPost } from '@/modules/forum';

import { authOptions } from '../api/auth/[...nextauth]';

export default function Post({ postId }: { postId: string }) {
  return <ForumPost postId={postId} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { postId } = query;
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
      postId,
      session: {
        ...session,

        user: {
          image: null,
        },
      },
    },
  };
};

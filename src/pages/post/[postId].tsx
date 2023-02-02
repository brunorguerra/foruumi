import { type GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/next-auth';
import { Post as ForumPost } from '@/modules/forum';

export default function Post({ postId }: { postId: string }) {
  return <ForumPost postId={postId} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const { postId } = query;

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

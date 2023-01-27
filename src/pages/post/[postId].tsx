import { GetServerSideProps } from 'next';

import { Post as ForumPost } from '@/modules/forum';

export default function Post({ postId }: { postId: string }) {
  return <ForumPost postId={postId} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { postId } = query;

  return {
    props: {
      postId,
    },
  };
};

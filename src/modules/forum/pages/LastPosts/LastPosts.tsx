import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { api } from '@/lib/axios';
import { PostProps } from '@/modules/forum/types/Post';

import { Header } from '../../components';

import { PostBox } from './components';
import { CreatePost } from './components/CreatePost/CreatePost';

export const LastPosts = () => {
  const { data, isLoading } = useQuery(['post-list'], getListPosts);

  async function getListPosts(): Promise<PostProps[]> {
    const req = await api.get('/posts');
    const { posts } = await req.data;
    return posts;
  }

  const isEmptyListPosts = (data?.length ?? 0) <= 0;

  return (
    <Box maxW={1200} margin="0 auto" py={12}>
      <Header />

      <Flex mt={8} mb={16} direction="column" gap={8}>
        <Heading size="lg">Fazer postagem</Heading>
        <CreatePost />
      </Flex>

      <Heading size="xl" mb={8}>
        Últimas Postagens
      </Heading>
      <Flex direction="column" gap={4}>
        {isLoading ? (
          <Spinner mx="auto" mt={8} />
        ) : isEmptyListPosts ? (
          <Text fontSize="lg" mx="auto" mt={8}>
            Nenhum post foi publicado.
          </Text>
        ) : (
          data?.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <PostBox
                title={post.title}
                content={post.content}
                author={post.author.name}
                createdAt={post.createdAt}
              />
            </Link>
          ))
        )}
      </Flex>
    </Box>
  );
};

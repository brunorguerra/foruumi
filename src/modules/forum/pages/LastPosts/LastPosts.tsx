import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { api } from '@/lib/axios';
import { PostProps } from '@/modules/forum/types/Post';

import { Header } from '../../components';

import { PostBox, CreatePost } from './components';

interface ListPostsProps {
  posts: PostProps[];
  info: {
    currentPage: number;
    pages: number;
    posts: number;
  };
}

export const LastPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useQuery(
    ['post-list', currentPage],
    () => getListPosts(currentPage),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  );

  async function getListPosts(page: number): Promise<ListPostsProps> {
    const req = await api.get(`/posts?page=${page}`);
    const data = await req.data;
    return data;
  }

  const isEmptyListPosts = (data?.posts.length ?? 0) <= 0;

  function backPage() {
    setCurrentPage((oldPage) => (oldPage <= 1 ? oldPage : oldPage - 1));
  }

  function nextPage() {
    setCurrentPage((oldPage) => (oldPage >= Number(data?.info.pages) ? oldPage : oldPage + 1));
  }

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
          data?.posts.map((post) => (
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

      {!isEmptyListPosts && (
        <Flex alignItems="center" gap={2} justifyContent="flex-end" mt={4}>
          <Button onClick={backPage} colorScheme="blue" isDisabled={isFetching}>
            Anterior
          </Button>
          <Text>Página Atual: {currentPage}</Text>
          <Button onClick={nextPage} colorScheme="blue" isDisabled={isFetching}>
            Próxima
          </Button>
        </Flex>
      )}
    </Box>
  );
};

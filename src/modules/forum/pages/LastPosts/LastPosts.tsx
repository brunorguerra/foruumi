import { Flex, Heading, IconButton, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { Layout, PostContainer } from '../../components';
import { useGetListPosts } from '../../hooks/useGetListPosts';

import { CreatePost } from './components';

export const LastPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useGetListPosts({ page: currentPage });

  const isEmptyListPosts = (data?.posts.length ?? 0) <= 0;
  const isExistsNextPage = !(currentPage >= Number(data?.info.pages));
  const isExistsBackPage = !(currentPage === 1);

  function backPage() {
    setCurrentPage((oldPage) => (isExistsBackPage ? oldPage - 1 : oldPage));
  }

  function nextPage() {
    setCurrentPage((oldPage) => (isExistsNextPage ? oldPage + 1 : oldPage));
  }

  return (
    <Layout>
      <Flex mt={8} mb={16} direction="column" gap={8}>
        <Heading size="lg">Fazer postagem</Heading>
        <CreatePost />
      </Flex>

      <Heading size="xl" mb={8}>
        Últimas Postagens
      </Heading>

      <Flex direction="column" gap={4}>
        {isLoading ? (
          <Spinner mx="auto" mt={8} size="lg" />
        ) : isEmptyListPosts ? (
          <Text fontSize="lg" mx="auto" mt={8}>
            Nenhum post foi publicado.
          </Text>
        ) : (
          data?.posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <PostContainer
                author={post.author.name}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
              />
            </Link>
          ))
        )}
      </Flex>

      {!isEmptyListPosts && (
        <Flex alignItems="center" gap={2} justifyContent="flex-end" mt={4}>
          {isExistsBackPage && (
            <IconButton
              colorScheme="blue"
              aria-label="Próxima página"
              icon={<IoChevronBack fontSize={20} />}
              isDisabled={isFetching}
              onClick={backPage}
            />
          )}

          <Text>Página {currentPage}</Text>

          {isExistsNextPage && (
            <IconButton
              colorScheme="blue"
              aria-label="Próxima página"
              icon={<IoChevronForward fontSize={20} />}
              isDisabled={isFetching}
              onClick={nextPage}
            />
          )}
        </Flex>
      )}
    </Layout>
  );
};

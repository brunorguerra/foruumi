import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import { api } from '@/lib/axios';

import { Header } from '../../components';
import { publishedDateFormatted } from '../../utils';

import { Comment } from './components';
import { CreateComment } from './components/CreateComment';
import { PostProps } from './types';

export const Post = ({ postId }: { postId: string }) => {
  const [isCommenting, setIsCommenting] = useState(false);

  const { data, isFetching } = useQuery(['post'], getPostData);

  async function getPostData(): Promise<PostProps> {
    const res = await api.get(`/posts/${postId}`);
    const { post } = await res.data;

    return post;
  }

  function handleIsCommenting() {
    setIsCommenting((oldState) => !oldState);
  }

  const isEmptyCommentList = (data?.Comment.length ?? 0) <= 0;

  if (isFetching) {
    return (
      <>
        <Head>
          <title>Foruumi</title>
        </Head>

        <Box maxW={1200} mx="auto" py={8}>
          <Header />
          <Flex mt={12} justifyContent="center" alignItems="center" h={80}>
            <Spinner size="lg" />
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Foruumi - {data?.title}</title>
      </Head>

      <Box maxW={1200} mx="auto" py={8}>
        <Header />

        <Link href="/">
          <Button mt={16} colorScheme="blue">
            Voltar
          </Button>
        </Link>

        <Box
          mt={4}
          w="100%"
          p={4}
          border="2px solid transparent"
          borderRadius={4}
          borderColor="blue.600"
          backgroundColor="gray.100"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="md">Author: {data?.author.name}</Text>
            <Text>{data?.createdAt && publishedDateFormatted(data.createdAt, ptBR)}</Text>
          </Flex>

          <Heading size="lg" marginTop={2}>
            {data?.title}
          </Heading>
          <Text fontSize="xl" marginTop={2}>
            {data?.content}
          </Text>
        </Box>

        <Box mt={4}>
          <Flex justifyContent="space-between" alignItems="center" px={2}>
            <Heading size="md">Comentários</Heading>

            <Button colorScheme="blue" onClick={handleIsCommenting}>
              {isCommenting ? 'Cancelar Adição do comentário' : 'Adicionar comentário'}
            </Button>
          </Flex>

          <Flex mt={8} pl={16} gap={4} direction="column">
            {isCommenting && <CreateComment />}

            {isFetching ? (
              <Spinner mx="auto" size="lg" />
            ) : isEmptyCommentList ? (
              <Text mx="auto">Sem comentários</Text>
            ) : (
              data?.Comment.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    author={comment.author.name}
                    content={comment.content}
                    createdAt={comment.createdAt}
                  />
                );
              })
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

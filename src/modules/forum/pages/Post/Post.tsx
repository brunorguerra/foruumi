import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { IoReturnDownBackSharp } from 'react-icons/io5';

import { useCommentingStore } from '@/store/useCommentingStore';

import { Layout, PostContainer } from '../../components';
import { useDeletePost } from '../../hooks/useDeletePost';
import { useGetPost } from '../../hooks/useGetPost';

import { Comment } from './components';
import { ButtonDeletePost } from './components/ButtonDeletePost';
import { CreateComment } from './components/CreateComment';

export const Post = ({ postId }: { postId: string }) => {
  const session = useSession();
  const router = useRouter();

  const { isCommenting, handleIsCommenting } = useCommentingStore((state) => ({
    isCommenting: state.isCommenting,
    handleIsCommenting: state.handleIsCommenting,
  }));

  const { data, isLoading, isFetching, isError } = useGetPost({ postId });
  const { mutateAsync, isLoading: isDeleting } = useDeletePost();

  const isEmptyCommentList = (data?.Comment.length ?? 0) <= 0;
  const postAuthorIsCurrentUser = data?.author.id === session.data?.user.id;

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Foruumi</title>
        </Head>

        <Layout>
          <Flex mt={12} justifyContent="center" alignItems="center" h={80}>
            <Spinner size="lg" />
          </Flex>
        </Layout>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Head>
          <title>Foruumi - Postagem indisponível</title>
        </Head>

        <Layout>
          <Flex direction="column" alignItems="center" justifyContent="center" h={500} gap={4}>
            <Heading>Postagem Indisponível</Heading>
            <Text fontSize="xl">
              Este Post pode ter sido removido, está temporariamente indisponível ou não existe.
            </Text>

            <Link href="/">
              <Button leftIcon={<IoReturnDownBackSharp fontSize={20} />} mt={16} colorScheme="blue">
                Voltar
              </Button>
            </Link>
          </Flex>
        </Layout>
      </>
    );
  }

  async function handleDeletePost() {
    await mutateAsync({ postId }).then(async () => await router.push('/'));
  }

  return (
    <>
      <Head>
        <title>Foruumi - {data?.title}</title>
      </Head>

      <Layout>
        <Link href="/">
          <Button
            leftIcon={<IoReturnDownBackSharp fontSize={20} />}
            mt={16}
            mb={4}
            colorScheme="blue"
          >
            Voltar
          </Button>
        </Link>

        <PostContainer
          author={data.author.name}
          title={data.title}
          content={data.content}
          createdAt={data.createdAt}
          asButtonDeleted={postAuthorIsCurrentUser}
          hasContentFull
        >
          <ButtonDeletePost isLoading={isDeleting} onClick={handleDeletePost} />
        </PostContainer>

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
              data.Comment.map((comment) => {
                return (
                  <Comment
                    id={comment.id}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    author={comment.author}
                    postAuthorId={data.author.id}
                    key={comment.id}
                  />
                );
              })
            )}
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

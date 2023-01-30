import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { IoReturnDownBackSharp } from 'react-icons/io5';

import { api } from '@/lib/axios';
import { useCommentingStore } from '@/store/useCommentingStore';

import { Header } from '../../components';
import { publishedDateFormatted } from '../../utils';

import { Comment } from './components';
import { CreateComment } from './components/CreateComment';
import { type PostProps } from './types';

export const Post = ({ postId }: { postId: string }) => {
  const { isCommenting, handleIsCommenting } = useCommentingStore((state) => ({
    isCommenting: state.isCommenting,
    handleIsCommenting: state.handleIsCommenting,
  }));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery(
    ['post'],
    getPostData
  );
  const { mutate, isLoading: isDeleting } = useMutation(DeletePost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post-list']);
      await router.push('/');

      return toast({
        title: 'Postagem excluída.',
        description: 'Sua postagem foi excluída com sucesso.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    },
    onError: () => {
      return toast({
        title: 'Não foi possível excluir sua postagem.',
        description: 'Algum erro inesperado aconteceu, tente novamente.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    },
  });

  async function getPostData(): Promise<PostProps> {
    const res = await api.get(`/posts/${postId}`);
    const { post } = await res.data;

    return post;
  }

  async function DeletePost() {
    const res = await api.delete(`/posts/${postId}`);
    return await res.data;
  }

  const isEmptyCommentList = (data?.Comment.length ?? 0) <= 0;
  const postAuthorIsCurrentUser = data?.author.id === session.data?.user.id;

  if (isLoading) {
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

  if (isError) {
    return (
      <>
        <Head>
          <title>Foruumi - Postagem indisponível</title>
        </Head>

        <Box maxW={1200} mx="auto" py={8}>
          <Header />

          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            h={500}
            gap={4}
          >
            <Heading>Postagem Indisponível</Heading>
            <Text fontSize="xl">
              Este Post pode ter sido removido ou está temporariamente
              indisponível.
            </Text>

            <Link href="/">
              <Button
                leftIcon={<IoReturnDownBackSharp fontSize={20} />}
                mt={16}
                colorScheme="blue"
              >
                Voltar
              </Button>
            </Link>
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
          <Button
            leftIcon={<IoReturnDownBackSharp fontSize={20} />}
            mt={16}
            colorScheme="blue"
          >
            Voltar
          </Button>
        </Link>

        <Flex
          direction="column"
          mt={4}
          w="100%"
          p={4}
          border="2px solid transparent"
          borderRadius={4}
          borderColor="blue.600"
          backgroundColor="gray.100"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="md">
              Author:{' '}
              {postAuthorIsCurrentUser
                ? `${data.author.name} (Você)`
                : data.author.name}
            </Text>
            <Text>
              {data.createdAt && publishedDateFormatted(data.createdAt)}
            </Text>
          </Flex>

          <Box>
            <Heading size="lg" marginTop={2}>
              {data.title}
            </Heading>
            <Text fontSize="xl" marginTop={2}>
              {data.content}
            </Text>
          </Box>

          {postAuthorIsCurrentUser && (
            <>
              <Button ml="auto" mt={4} colorScheme="red" onClick={onOpen}>
                Excluir Postagem
              </Button>

              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="white">
                  <ModalHeader color="gray.900">Excluir Postagem</ModalHeader>
                  <ModalBody>
                    <Text color="gray.800" fontSize="lg">
                      Você tem certeza que quer excluir esta postagem? esta ação
                      é irreversível.
                    </Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      colorScheme="red"
                      loadingText="Excluindo"
                      isLoading={isDeleting}
                      onClick={() => {
                        mutate();
                      }}
                    >
                      Excluir Postagem
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </Flex>

        <Box mt={4}>
          <Flex justifyContent="space-between" alignItems="center" px={2}>
            <Heading size="md">Comentários</Heading>

            <Button colorScheme="blue" onClick={handleIsCommenting}>
              {isCommenting
                ? 'Cancelar Adição do comentário'
                : 'Adicionar comentário'}
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
      </Box>
    </>
  );
};

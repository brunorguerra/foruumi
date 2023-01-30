import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { api } from '@/lib/axios';
import { publishedDateFormatted } from '@/modules/forum/utils';

type CommentProps = {
  id: string;
  content: string;
  createdAt: string;
  postAuthorId: string;
  author: {
    id: string;
    name: string;
  };
};

export const Comment = ({ id, content, createdAt, postAuthorId, author }: CommentProps) => {
  const session = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const commentAuthorIsCurrentUser = author.id === session.data?.user.id;
  const commentAuthorOrPostAuthorIsCurrentUser =
    author.id === session.data?.user.id || postAuthorId === session.data?.user.id;

  const { mutate, isLoading } = useMutation(requestDeleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);

      toast({
        title: 'Comentário excluído.',
        description: 'Seu comentário foi excluído com sucesso.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Não foi possível excluir seu comentário.',
        description: 'Algum erro inesperado aconteceu, tente novamente.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    },
  });

  async function requestDeleteComment() {
    const res = await api.delete(`/posts/comment/${id}`);
    return await res.data;
  }

  return (
    <Box
      w="100%"
      p={4}
      border="2px solid transparent"
      borderRadius={20}
      borderTopLeftRadius={0}
      backgroundColor="gray.100"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
          {commentAuthorIsCurrentUser ? `${author.name} (Você)` : author.name}:
        </Text>
        <Text>{publishedDateFormatted(createdAt)}</Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Text fontSize="xl">{content}</Text>

        {commentAuthorOrPostAuthorIsCurrentUser && (
          <>
            <Button colorScheme="red" onClick={onOpen}>
              Excluir Comentário
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent bg="white">
                <ModalHeader color="gray.900">Excluir Comentário</ModalHeader>
                <ModalBody>
                  <Text color="gray.800" fontSize="lg">
                    Você tem certeza que quer excluir este comentário? esta ação é irreversível.
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="red"
                    loadingText="Excluindo"
                    isLoading={isLoading}
                    onClick={() => {
                      mutate();
                    }}
                  >
                    Excluir Comentário
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Flex>
    </Box>
  );
};

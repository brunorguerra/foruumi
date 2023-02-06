import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../api';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deletePost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post-list']);

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
};

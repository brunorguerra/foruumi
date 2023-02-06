import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../api';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post-list']);

      toast({
        title: 'Postagem criada.',
        description: 'Seu post foi publicado com sucesso.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Não foi possível publicar seu post.',
        description: 'Algum erro inesperado aconteceu, tente novamente.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    },
  });
};

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCommentingStore } from '@/store/useCommentingStore';

import { createComment } from '../api';

export const useCreateComment = () => {
  const handleIsCommenting = useCommentingStore((state) => state.handleIsCommenting);

  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      handleIsCommenting();

      toast({
        title: 'Comentário criado.',
        description: 'Seu comentário foi publicado com sucesso.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Não foi possível fazer seu comentário.',
        description: 'Algum erro inesperado aconteceu, tente novamente.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    },
  });
};

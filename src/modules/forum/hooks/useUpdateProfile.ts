import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { updateProfile } from '../api';

export const useUpdateProfile = () => {
  const toast = useToast();

  return useMutation(updateProfile, {
    onSuccess: async () => {
      toast({
        title: 'Dados atualizados!',
        description: 'Suas informações de perfil foram alteradas.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Não foi possível alterar seus dados.',
        description: 'Algum erro inesperado aconteceu, tente novamente.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    },
  });
};

import { Button, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { api } from '@/lib/axios';
import { TextAreaForm } from '@/modules/forum/components';
import { useCommentingStore } from '@/store/useCommentingStore';

import { createCommentFormSchema } from './schema';

type CreateCommentFormData = z.infer<typeof createCommentFormSchema>;

export const CreateComment = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCommentFormData>({
    resolver: zodResolver(createCommentFormSchema),
  });

  const handleIsCommenting = useCommentingStore(
    (state) => state.handleIsCommenting
  );

  const queryClient = useQueryClient();
  const toast = useToast();
  const session = useSession();
  const router = useRouter();
  const { postId } = router.query;

  const { mutateAsync, isLoading } = useMutation(
    async (data: CreateCommentFormData) => await requestCreateComment(data),
    {
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
        reset();
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
    }
  );

  async function requestCreateComment(data: CreateCommentFormData) {
    const res = await api.post('/posts/comment/create', {
      postId,
      userId: session.data?.user.id,
      content: data.content,
    });
    return await res.data;
  }

  async function handleMutateSubmit(data: CreateCommentFormData) {
    await mutateAsync(data);
  }

  return (
    <Flex
      as="form"
      direction="column"
      gap={4}
      onSubmit={handleSubmit(handleMutateSubmit)}
    >
      <TextAreaForm
        placeholder="O que você esta pensando?"
        error={errors.content}
        {...register('content')}
      />

      <Button
        type="submit"
        ml="auto"
        colorScheme="blue"
        loadingText="Comentando"
        isLoading={isLoading}
        isDisabled={!isValid}
      >
        Comentar
      </Button>
    </Flex>
  );
};

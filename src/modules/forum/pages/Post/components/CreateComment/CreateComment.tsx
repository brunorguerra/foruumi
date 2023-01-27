import { Box, Button, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/axios';

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

  const queryClient = useQueryClient();
  const toast = useToast();
  const session = useSession();
  const router = useRouter();
  const { postId } = router.query;

  const { mutateAsync, isLoading } = useMutation(
    async (data: CreateCommentFormData) => requestCreateComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post']);

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
    },
  );

  async function requestCreateComment(data: CreateCommentFormData) {
    const res = await api.post('/posts/create-comment', {
      postId,
      email: session.data?.user?.email,
      content: data.content,
    });
    return await res.data;
  }

  async function handleCreateComment(data: CreateCommentFormData) {
    await mutateAsync(data);
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(handleCreateComment)}>
      <Box>
        <Textarea
          placeholder="O que você esta pensando?"
          backgroundColor="transparent"
          resize="none"
          minH={40}
          errorBorderColor="red.500"
          isInvalid={!!errors.content?.message}
          {...register('content')}
        />

        {errors.content?.message && (
          <Text fontSize="md" color="red.500">
            {errors.content.message}
          </Text>
        )}
      </Box>
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

import { Box, Button, Flex, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/axios';

import { createPostFormSchema } from './schema';

type CreatePostFormData = z.infer<typeof createPostFormSchema>;

export const CreatePost = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostFormSchema),
  });

  const session = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    async (data: CreatePostFormData) => {
      const res = await api.post('/posts/create', {
        email: session.data?.user?.email,
        title: data.title,
        content: data.content,
      });
      return await res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post-list']);

        toast({
          title: 'Postagem criada.',
          description: 'Seu post foi publicado com sucesso.',
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        reset();
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
    },
  );

  async function handleMutateSubmit(data: CreatePostFormData) {
    await mutateAsync(data);
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(handleMutateSubmit)}>
      <Box>
        <Input
          type="text"
          placeholder="Escreva um título"
          size="lg"
          variant="outline"
          errorBorderColor="red.500"
          isInvalid={!!errors.title?.message}
          {...register('title')}
        />

        {errors.title?.message && (
          <Text fontSize="md" color="red.500">
            {errors.title.message}
          </Text>
        )}
      </Box>

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
        colorScheme="blue"
        ml="auto"
        loadingText="Postando"
        isLoading={isLoading}
        isDisabled={!isValid}
      >
        Postar
      </Button>
    </Flex>
  );
};

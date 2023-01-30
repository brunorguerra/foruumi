import { Button, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { api } from '@/lib/axios';
import { TextAreaForm, TextInput } from '@/modules/forum/components';

import { createPostFormSchema } from './schema';

type CreatePostFormData = z.infer<typeof createPostFormSchema>;

export const CreatePost = () => {
  const session = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostFormSchema),
  });

  const { mutateAsync, isLoading } = useMutation(
    async (data: CreatePostFormData) => await requestCreatePost(data),
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
    }
  );

  async function requestCreatePost(data: CreatePostFormData) {
    const res = await api.post('/posts/create', {
      id: session.data?.user.id,
      title: data.title,
      content: data.content,
    });
    return await res.data;
  }

  async function handleMutateSubmit(data: CreatePostFormData) {
    await mutateAsync(data);
  }

  return (
    <Flex
      as="form"
      direction="column"
      gap={4}
      onSubmit={handleSubmit(handleMutateSubmit)}
    >
      <TextInput
        type="text"
        placeholder="Escreva um título"
        error={errors.title}
        {...register('title')}
      />

      <TextAreaForm
        placeholder="O que você esta pensando?"
        error={errors.content}
        {...register('content')}
      />

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

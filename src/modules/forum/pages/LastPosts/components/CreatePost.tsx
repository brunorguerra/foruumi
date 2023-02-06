import { Button, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { TextAreaForm, TextInput } from '@/components';
import { useCreatePost } from '@/modules/forum/hooks/useCreatePost';
import { createPostFormSchema } from '@/modules/forum/schemas';
import { CreatePostFormData } from '@/modules/forum/types';

export const CreatePost = () => {
  const session = useSession();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostFormSchema),
  });

  const { mutateAsync, isLoading } = useCreatePost();

  async function handleMutateSubmit(data: CreatePostFormData) {
    await mutateAsync({ data, userId: session.data?.user.id as string }).then(() => reset());
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(handleMutateSubmit)}>
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

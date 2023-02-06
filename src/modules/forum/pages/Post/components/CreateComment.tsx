import { Button, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { TextAreaForm } from '@/components';
import { useCreateComment } from '@/modules/forum/hooks/useCreateComment';
import { createCommentFormSchema } from '@/modules/forum/schemas';
import { CreateCommentFormData } from '@/modules/forum/types';

export const CreateComment = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCommentFormData>({
    resolver: zodResolver(createCommentFormSchema),
  });

  const session = useSession();
  const router = useRouter();
  const { postId } = router.query;

  const { mutateAsync, isLoading } = useCreateComment();

  async function handleMutateSubmit(data: CreateCommentFormData) {
    await mutateAsync({
      postId: String(postId),
      userId: session.data?.user.id as string,
      data,
    }).then(() => reset());
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(handleMutateSubmit)}>
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

import { Button, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { TextInput } from '@/components';
import { useUpdateProfile } from '@/modules/forum/hooks/useUpdateProfile';
import { updateProfileFormSchema } from '@/modules/forum/schemas';
import { UpdateProfileFormData } from '@/modules/forum/types';

export const FormProfile = () => {
  const { mutateAsync, isLoading } = useUpdateProfile();

  const session = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  });

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await mutateAsync({ data, userId: session.data?.user.id as string }).then(
      async () => await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login` }),
    );
  }

  useEffect(() => {
    setValue('name', session.data?.user.name as string);
    setValue('email', session.data?.user.email as string);
  }, [setValue, session.data?.user.email, session.data?.user.name]);

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={handleSubmit(handleUpdateProfile)}
      gap={8}
      w="100%"
    >
      <Flex direction="column" gap={8}>
        <Flex gap={4}>
          <TextInput type="text" placeholder="Nome" error={errors.name} {...register('name')} />
          <TextInput
            type="password"
            placeholder="Senha atual"
            error={errors.currentPassword}
            {...register('currentPassword')}
          />
        </Flex>

        <Flex gap={4}>
          <TextInput type="text" placeholder="Email" error={errors.email} {...register('email')} />

          <TextInput
            type="password"
            placeholder="Nova senha (Opcional)"
            error={errors.newPassword}
            {...register('newPassword')}
          />
        </Flex>
      </Flex>

      <Button
        type="submit"
        ml="auto"
        colorScheme="blue"
        loadingText="Alterando"
        isLoading={isLoading}
      >
        Alterar dados
      </Button>
    </Flex>
  );
};

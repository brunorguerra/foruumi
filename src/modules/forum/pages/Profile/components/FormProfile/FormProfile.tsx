import { Button, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/axios';
import { TextInput } from '@/modules/forum/components';

import { formProfileSchema } from './schema';

type FormProfileData = z.infer<typeof formProfileSchema>;

export const FormProfile = () => {
  const { mutate, isLoading } = useMutation(updateProfile, {
    onSuccess: async () => {
      toast({
        title: 'Dados atualizados!',
        description: 'Suas informações de perfil foram alteradas.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });

      await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login` });
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

  const session = useSession();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProfileData>({
    resolver: zodResolver(formProfileSchema),
  });

  async function updateProfile(data: FormProfileData) {
    const req = await api.put(`/profile/${session.data?.user.id}`, {
      name: data.name,
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    const { user } = await req.data;

    return user;
  }

  useEffect(() => {
    setValue('name', session.data?.user.name as string);
    setValue('email', session.data?.user.email as string);
  }, [setValue, session.data?.user.email, session.data?.user.name]);

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={handleSubmit((data) => mutate(data))}
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

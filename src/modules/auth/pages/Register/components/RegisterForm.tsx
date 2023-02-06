import { Flex, Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { PasswordInput, TextInput } from '@/components';
import { api } from '@/lib/axios';
import { registerFormSchema } from '@/modules/auth/schemas';
import { RegisterFormData } from '@/modules/auth/types';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const toast = useToast();
  const router = useRouter();

  async function createUser(data: RegisterFormData) {
    try {
      const res = await api.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      await signIn('credentials', {
        email: res.data.email,
        password: res.data.password,
        redirect: false,
      });

      await router.push('/');

      return toast({
        title: 'Conta criada com sucesso!',
        description: 'Você criou uma conta na plataforma Foruumi',
        status: 'success',
        duration: 6000,
        isClosable: true,
        orientation: 'horizontal',
      });
    } catch (error) {
      return toast({
        title: 'Não foi possível criar a conta!',
        description:
          'Os dados que você enviou ja estão sendo utilizados, ou algum erro inesperado aconteceu.',
        status: 'error',
        duration: 6000,
        isClosable: true,
        orientation: 'horizontal',
      });
    }
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(createUser)}>
      <TextInput id="name" label="Nome" error={errors.name} {...register('name')} />
      <TextInput id="email" label="Email" error={errors.email} {...register('email')} />

      <PasswordInput
        id="password"
        label="Senha"
        error={errors.password}
        {...register('password')}
      />
      <PasswordInput
        id="confirmpassword"
        label="Confirmar a senha"
        error={errors.confirmPassword}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        loadingText="Criando conta"
        isLoading={isSubmitting}
        isDisabled={!isValid}
        colorScheme="blue"
      >
        Criar Conta
      </Button>
    </Flex>
  );
};

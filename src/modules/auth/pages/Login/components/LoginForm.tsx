import { Button, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { PasswordInput, TextInput } from '@/components';
import { loginFormSchema } from '@/modules/auth/schemas';
import { LoginFormData } from '@/modules/auth/types';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();
  const toast = useToast();

  async function login(data: LoginFormData) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      await router.push('/');

      return toast({
        title: 'Conectado com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        orientation: 'horizontal',
      });
    }

    return toast({
      title: 'Erro ao tentar se conectar',
      description: 'Credenciais incorreta, tente novamente.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(login)}>
      <TextInput id="email" label="Email" error={errors.email} {...register('email')} />

      <PasswordInput
        id="password"
        label="Senha"
        error={errors.password}
        {...register('password')}
      />

      <Button
        type="submit"
        loadingText="Entrando"
        isLoading={isSubmitting}
        isDisabled={!isValid}
        colorScheme="blue"
      >
        Entrar
      </Button>
    </Flex>
  );
};

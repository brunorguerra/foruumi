import { Box, Flex, Input, Text, Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/axios';

import { registerFormSchema } from './schema';

type RegisterFormData = z.infer<typeof registerFormSchema>;

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

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você criou uma conta na plataforma Foruumi',
        status: 'success',
        duration: 6000,
        isClosable: true,
        orientation: 'horizontal',
      });
    } catch (error) {
      toast({
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
      <Box>
        <Text as="label" htmlFor="name">
          Nome
        </Text>
        <Input
          type="text"
          id="name"
          size="lg"
          variant="filled"
          isInvalid={!!errors.name?.message}
          errorBorderColor="red.500"
          {...register('name')}
        />
        {errors.name?.message && (
          <Text color="red.500" marginLeft={2} marginTop={1}>
            {errors.name.message}
          </Text>
        )}
      </Box>

      <Box>
        <Text as="label" htmlFor="email">
          Email
        </Text>
        <Input
          type="text"
          id="email"
          size="lg"
          variant="filled"
          isInvalid={!!errors.email?.message}
          errorBorderColor="red.500"
          {...register('email')}
        />
        {errors.email?.message && (
          <Text color="red.500" marginLeft={2} marginTop={1}>
            {errors.email.message}
          </Text>
        )}
      </Box>

      <Box>
        <Text as="label" htmlFor="password">
          Senha
        </Text>
        <Input
          type="password"
          id="password"
          size="lg"
          variant="filled"
          isInvalid={!!errors.password?.message}
          errorBorderColor="red.500"
          {...register('password')}
        />
        {errors.password?.message && (
          <Text color="red.500" marginLeft={2} marginTop={1}>
            {errors.password.message}
          </Text>
        )}
      </Box>

      <Box>
        <Text as="label" htmlFor="confirmpassword">
          Confirmar a senha
        </Text>
        <Input
          type="password"
          id="confirmpassword"
          size="lg"
          variant="filled"
          isInvalid={!!errors.confirmPassword?.message}
          errorBorderColor="red.500"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message && (
          <Text color="red.500" marginLeft={2} marginTop={1}>
            {errors.confirmPassword.message}
          </Text>
        )}
      </Box>

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

import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginFormSchema } from './schema';

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
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

    if (res?.ok === true) {
      await router.push('/');
      toast({
        title: 'Logado com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        orientation: 'horizontal',
      });
    }

    if (res?.ok === false) {
      toast({
        title: 'Erro ao tentar se conectar',
        description: res.error,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }

  function handleShowPassword() {
    setIsShowPassword((oldState) => !oldState);
  }

  return (
    <Flex as="form" direction="column" gap={4} onSubmit={handleSubmit(login)}>
      <Box>
        <Text as="label" htmlFor="email">
          Email
        </Text>

        <Input
          type="text"
          id="email"
          size="lg"
          variant="filled"
          errorBorderColor="red.500"
          isInvalid={!!errors.email?.message}
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

        <InputGroup>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            size="lg"
            variant="filled"
            isInvalid={!!errors.password?.message}
            errorBorderColor="red.500"
            {...register('password')}
          />

          <InputRightElement width="4.5rem" h="100%">
            <Button type="button" size="sm" variant="unstyled" onClick={handleShowPassword}>
              {isShowPassword ? 'Ocultar' : 'Mostrar'}
            </Button>
          </InputRightElement>
        </InputGroup>

        {errors.password?.message && (
          <Text color="red.500" marginLeft={2} marginTop={1}>
            {errors.password.message}
          </Text>
        )}
      </Box>

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

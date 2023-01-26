import { Box, Flex, Heading, Link as ChakraLink, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { LoginForm } from './components/LoginForm';

export const Login = () => {
  return (
    <Flex alignItems="center" justifyContent="center" direction="column" height="100vh">
      <Box>
        <Heading marginBottom={8}>Entrar na plataforma</Heading>

        <LoginForm />

        <Text marginTop={2} marginLeft={2}>
          Não tem uma conta ainda?{' '}
          <Link href="/register" legacyBehavior>
            <ChakraLink color="blue">Criar uma conta.</ChakraLink>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

import { Box, Flex, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import { RegisterForm } from './components';

export const Register = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      height="100vh"
    >
      <Box>
        <Heading marginBottom={8}>Criar conta na Plataforma</Heading>

        <RegisterForm />

        <Text marginTop={2} marginLeft={2}>
          Ja tem uma conta?{' '}
          <Link href="/login" legacyBehavior>
            <ChakraLink color="blue">Entrar na plataforma.</ChakraLink>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

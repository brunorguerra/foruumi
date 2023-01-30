import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const Header = () => {
  async function logout() {
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login` });
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading size="lg">Foruumi</Heading>

      <Box>
        <Link href="/profile">
          <Button colorScheme="gray" marginRight={4}>
            Meu Perfil
          </Button>
        </Link>

        <Button colorScheme="blue" onClick={logout}>
          Sair
        </Button>
      </Box>
    </Flex>
  );
};

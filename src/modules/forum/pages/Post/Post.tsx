import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { Header } from '../../components';

import { Comment } from './components';

export const Post = () => {
  return (
    <>
      <Box maxW={1200} mx="auto" py={8}>
        <Header />

        <Link href="/">
          <Button mt={16} colorScheme="blue">
            Voltar
          </Button>
        </Link>

        <Box
          mt={4}
          w="100%"
          p={4}
          border="2px solid transparent"
          borderRadius={4}
          borderColor="blue.600"
          backgroundColor="gray.100"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="md">Author: guerra</Text>
            <Text>Criado em 20 de novembro 2022</Text>
          </Flex>

          <Heading size="lg" marginTop={2}>
            titulo
          </Heading>
          <Text fontSize="xl" marginTop={2}>
            conteudo
          </Text>
        </Box>

        <Box mt={4}>
          <Flex justifyContent="space-between" alignItems="center" px={2}>
            <Heading size="md">Comentários</Heading>

            <Button colorScheme="blue">Adicionar comentário</Button>
          </Flex>

          <Flex mt={8} pl={16} gap={4} direction="column">
            <Comment author="GUERRA" content="ok ok ok" createdAt="25-10" />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

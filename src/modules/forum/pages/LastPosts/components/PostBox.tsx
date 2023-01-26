import { Box, Flex, Heading, Text } from '@chakra-ui/react';

interface PostBoxProps {
  title: string;
  content: string;
  author: string;
  createdAt?: string;
}

export const PostBox = ({ title, content, author, createdAt }: PostBoxProps) => {
  return (
    <Box
      w="100%"
      p={4}
      border="2px solid transparent"
      borderRadius={4}
      backgroundColor="gray.100"
      cursor="pointer"
      transition="all .2s ease"
      _hover={{
        transform: 'translateY(-5%)',
        borderColor: 'blue.600',
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="md">Author: {author}</Text>
        <Text>{createdAt}</Text>
      </Flex>

      <Heading size="lg" marginTop={2}>
        {title}
      </Heading>
      <Text
        fontSize="xl"
        marginTop={2}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        paddingRight={8}
      >
        {content}
      </Text>
    </Box>
  );
};

import { Box, Flex, Text } from '@chakra-ui/react';

interface CommentProps {
  author: string;
  createdAt: string;
  content: string;
}

export const Comment = ({ author, createdAt, content }: CommentProps) => {
  return (
    <Box
      w="100%"
      p={4}
      border="2px solid transparent"
      borderRadius={20}
      borderTopLeftRadius={0}
      backgroundColor="gray.100"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
          {author}:
        </Text>
        <Text>{createdAt}</Text>
      </Flex>

      <Text fontSize="xl" marginTop={2}>
        {content}
      </Text>
    </Box>
  );
};

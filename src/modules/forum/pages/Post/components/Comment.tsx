import { Box, Flex, Text } from '@chakra-ui/react';
import ptBR from 'date-fns/locale/pt-BR';

import { publishedDateFormatted } from '@/modules/forum/utils';

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
        <Text>{publishedDateFormatted(createdAt, ptBR)}</Text>
      </Flex>

      <Text fontSize="xl" marginTop={2}>
        {content}
      </Text>
    </Box>
  );
};

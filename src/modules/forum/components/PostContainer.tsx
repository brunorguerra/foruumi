import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import { publishedDateFormatted } from '@/modules/forum/utils';

type PostProps = {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  children?: ReactNode;
  asButtonDeleted?: boolean;
};

export const PostContainer = ({
  title,
  content,
  author,
  createdAt,
  children,
  asButtonDeleted = false,
}: PostProps) => {
  const session = useSession();
  const postAuthorIsSessionCurrentUser = author === session.data?.user.name;

  return (
    <Box
      w="100%"
      p={4}
      border="2px solid"
      borderColor={asButtonDeleted ? 'blue.600' : 'transparent'}
      borderRadius={4}
      backgroundColor="gray.100"
      cursor={asButtonDeleted ? 'initial' : 'pointer'}
      transition="all .2s ease"
      _hover={
        asButtonDeleted
          ? {}
          : {
              transform: 'translateY(-5%)',
              borderColor: 'blue.600',
            }
      }
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="md" textTransform="capitalize">
          Author: {postAuthorIsSessionCurrentUser ? `${author} (Você)` : author}
        </Text>
        <Text>{publishedDateFormatted(createdAt)}</Text>
      </Flex>

      <Box>
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

      {asButtonDeleted && <Flex justifyContent="flex-end">{children}</Flex>}
    </Box>
  );
};

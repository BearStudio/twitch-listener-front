import { FC } from 'react';

import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { QueryDocumentSnapshot, updateDoc } from '@firebase/firestore';

import { CommentDoc } from './comments.type';

export const CommentCard: FC<{
  document: QueryDocumentSnapshot;
}> = ({ document }) => {
  const comment = document.data() as CommentDoc;

  const handleAddQuestion = async () => {
    await updateDoc(document.ref, {
      isQuestion: !comment.isQuestion,
    });
  };

  const handleShowLive = async () => {
    await updateDoc(document.ref, {
      isLive: !comment.isLive,
    });
  };

  const getBackground = () => {
    if (comment.isLive) {
      return 'red.800';
    }
    if (comment.isQuestion) {
      return 'green.800';
    }

    return 'transparent';
  };
  const background = getBackground();

  return (
    <Flex
      flex="1"
      justify="space-between"
      alignItems="center"
      p="4"
      bg={background}
    >
      <Stack>
        <Text fontWeight="bold" fontSize="sm">
          {comment.username}
        </Text>
        <Text>{comment.message}</Text>
      </Stack>
      <HStack spacing="4">
        <Button
          colorScheme={comment.isQuestion ? 'green' : 'brand'}
          onClick={handleAddQuestion}
          size="sm"
        >
          ❓
        </Button>
        <Button
          colorScheme={comment.isLive ? 'red' : 'brand'}
          onClick={handleShowLive}
          size="sm"
        >
          🔴
        </Button>
      </HStack>
    </Flex>
  );
};

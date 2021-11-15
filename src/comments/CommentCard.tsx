import { FC } from 'react';

import { Button, Flex, HStack, Stack, Text, Tooltip } from '@chakra-ui/react';
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

  const getColorScheme = () => {
    if (comment.isLive) {
      return 'red';
    }
    if (comment.isQuestion) {
      return 'green';
    }

    return 'brand';
  };
  const colorScheme = getColorScheme();

  return (
    <Flex
      flex="1"
      justify="space-between"
      alignItems="center"
      p="4"
      bg={`${colorScheme}.800`}
    >
      <Stack>
        <Text fontWeight="bold" fontSize="sm">
          {comment.username}
        </Text>
        <Text>{comment.message}</Text>
      </Stack>
      <HStack spacing="4">
        <Tooltip
          label={
            comment.isQuestion ? 'Retirer des questions' : 'Ajouter en question'
          }
          openDelay={500}
        >
          <Button
            colorScheme={comment.isQuestion ? 'green' : 'brand'}
            onClick={handleAddQuestion}
          >
            ❓
          </Button>
        </Tooltip>
        <Tooltip
          label={comment.isLive ? 'Retirer du live' : 'Afficher sur le live'}
          openDelay={500}
        >
          <Button
            colorScheme={comment.isLive ? 'red' : 'brand'}
            onClick={handleShowLive}
          >
            🔴
          </Button>
        </Tooltip>
      </HStack>
    </Flex>
  );
};

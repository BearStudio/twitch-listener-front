import { Box, Center, ScaleFade, Stack, Text } from '@chakra-ui/react';

import { useGetCommentLive } from '@/comments/comments.service';
import { CommentDoc } from '@/comments/comments.type';

export default function Live() {
  const [liveComments] = useGetCommentLive();

  if (!liveComments || liveComments.docs.length === 0) {
    return <Center flex="1" bg="green" />;
  }

  // Get only the last comment displayed live
  const comment = liveComments.docs[
    liveComments.docs.length - 1
  ].data() as CommentDoc;

  return (
    <Center flex="1" bg="green">
      <ScaleFade in={comment?.isLive} transition={{ enter: { duration: 0.3 } }}>
        <Stack
          spacing="0"
          minW="40vw"
          border="2px solid white"
          borderRadius="2xl"
          overflow="hidden"
        >
          <Box bg="brand.600" color="brand.50" px="4" py="2">
            <Text fontSize="3xl" fontWeight="bold" color="white">
              {comment.username}
            </Text>
          </Box>
          <Box bg="white" color="brand.900">
            <Text px="4" py="2" fontSize="3xl">
              {comment.message}
            </Text>
          </Box>
        </Stack>
      </ScaleFade>
    </Center>
  );
}

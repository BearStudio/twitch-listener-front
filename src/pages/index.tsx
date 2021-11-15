import {
  Box,
  Center,
  CircularProgress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';

import {
  useGetCommentLive,
  useGetComments,
  useGetCommentsQuestion,
} from '@/comments/comments.service';
import { RowVirtualizerDynamic } from '@/components/RowVirtualizerDynamic';

const Index = () => {
  const [comments, loading, error] = useGetComments();
  const [questions, isQuestionsLoading, questionsError] =
    useGetCommentsQuestion();
  const [live, isLiveLoading, liveError] = useGetCommentLive();

  return (
    <>
      <Head>
        <title>Twitch Listener</title>
      </Head>
      {(loading || isQuestionsLoading || isLiveLoading) && (
        <Center>
          <CircularProgress isIndeterminate color="brand.300" />
        </Center>
      )}
      <SimpleGrid columns={3} spacing={10} m="4">
        {comments && (
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              💬 Messages
            </Text>
            <RowVirtualizerDynamic rows={comments.docs} />
          </Stack>
        )}
        {questions && (
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              ❓ Questions
            </Text>
            <RowVirtualizerDynamic rows={questions.docs} />
          </Stack>
        )}
        {live && (
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              🔴 On Stream
            </Text>
            <RowVirtualizerDynamic rows={live.docs} />
          </Stack>
        )}
      </SimpleGrid>

      {error && (
        <Box bg="red.200" color="red.800">
          {error.message}
        </Box>
      )}
      {questionsError && (
        <Box bg="red.200" color="red.800">
          {questionsError.message}
        </Box>
      )}
      {liveError && (
        <Box bg="red.200" color="red.800">
          {liveError.message}
        </Box>
      )}
    </>
  );
};
export default Index;

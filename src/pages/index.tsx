import {
  Box,
  Center,
  CircularProgress,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';

import {
  useGetCommentLive,
  useGetComments,
  useGetCommentsQuestion,
} from '@/comments/comments.service';
import { RowVirtualizerDynamic } from '@/components/RowVirtualizerDynamic';

const ListWrapper = ({ children }) => (
  <Flex direction="column" minH="0" maxHeight="100vh" p="4">
    {children}
  </Flex>
);

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
      <SimpleGrid columns={3} spacing={4}>
        {comments && (
          <ListWrapper>
            <Text fontSize="lg" fontWeight="bold">
              💬 Messages
            </Text>
            <RowVirtualizerDynamic rows={comments.docs} />
          </ListWrapper>
        )}
        {questions && (
          <ListWrapper>
            <Text fontSize="lg" fontWeight="bold">
              ❓ Questions
            </Text>
            <RowVirtualizerDynamic rows={questions.docs} />
          </ListWrapper>
        )}
        {live && (
          <ListWrapper>
            <Text fontSize="lg" fontWeight="bold">
              🔴 On Stream
            </Text>
            <RowVirtualizerDynamic rows={live.docs} />
          </ListWrapper>
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

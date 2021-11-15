import { useRef } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { QueryDocumentSnapshot } from '@firebase/firestore';
import { useVirtual } from 'react-virtual';

import { CommentCard } from '@/comments/CommentCard';

export function RowVirtualizerDynamic({
  rows,
  ...rest
}: {
  rows: Array<QueryDocumentSnapshot>;
}) {
  const parentRef = useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  return (
    <>
      <Box
        maxH="90vh"
        overflow="auto"
        ref={parentRef}
        borderRadius="md"
        {...rest}
      >
        <Box
          position="relative"
          width="100%"
          height={`${rowVirtualizer.totalSize}px`}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const comment = rows[virtualRow.index];

            return (
              <Flex
                key={virtualRow.index}
                ref={virtualRow.measureRef}
                bg={'brand.700'}
                color="white"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                transform={`translateY(${virtualRow.start}px)`}
                borderTop="1px solid"
                borderColor="brand.500"
              >
                <CommentCard document={comment} />
              </Flex>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

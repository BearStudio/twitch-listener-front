import { useEffect, useRef, useState } from 'react';

import { Box, Button, Checkbox, Flex } from '@chakra-ui/react';
import { QueryDocumentSnapshot } from '@firebase/firestore';
import { useVirtual } from 'react-virtual';

import { CommentCard } from '@/comments/CommentCard';

export function RowVirtualizerDynamic({
  rows,
  ...rest
}: {
  rows: Array<QueryDocumentSnapshot>;
}) {
  const [doesStickToBottom, setDoesStickToBottom] = useState(true);

  const parentRef = useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  useEffect(() => {
    if (doesStickToBottom) {
      rowVirtualizer.scrollToIndex(rows.length - 1);
    }
  }, [doesStickToBottom, rowVirtualizer, rows]);

  return (
    <Flex minH="0" direction="column" flex="1" justifyContent="space-between">
      <Box overflow="auto" ref={parentRef} my="4" {...rest}>
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
                bg={virtualRow.index % 2 === 0 ? 'brand.700' : 'brand.800'}
                color="white"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                transform={`translateY(${virtualRow.start}px)`}
                border="1px solid"
                borderBottom="none"
                _last={{
                  borderBottom: '1px solid',
                }}
                borderColor="white"
              >
                <CommentCard document={comment} />
              </Flex>
            );
          })}
        </Box>
      </Box>

      {rows.length !== 0 && (
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-around"
        >
          <Checkbox
            px="4"
            borderRadius="md"
            bg={doesStickToBottom ? 'brand.200' : 'brand.100'}
            defaultIsChecked={doesStickToBottom}
            onChange={() => setDoesStickToBottom((v) => !v)}
          >
            Stick to bottom
          </Checkbox>
          <Button onClick={() => rowVirtualizer.scrollToIndex(rows.length - 1)}>
            Scroll to bottom
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

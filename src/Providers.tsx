import { ChakraProvider } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/config';
import theme from '@/theme';

import { AVAILABLE_LANGUAGES } from './constants/i18n';

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={{
          ...theme,
          direction:
            AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)?.dir ??
            'ltr',
        }}
      >
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

import { QueryClient } from 'react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
        retry: false,
        // Prevent additional api calls by increasing cache valid time
        staleTime: 30000,
      },
    },
  });
};

import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { fetchClient } from '../../providers/fetchClient';
import { Word } from '../../types';
import { wordKeys } from './queryKeys';

interface UseGetWordsParams {
  status?: Word['status'];
  isRandomOrder?: boolean;
}

const fetchWords = (params: UseGetWordsParams) => {
  const { status, isRandomOrder } = params;

  return fetchClient
    .get(
      '/words',
      status
        ? {
            params: {
              filter: { status },
              per_page: status === 'in_progress' ? 500 : 20,
              is_random_order: isRandomOrder ? 1 : 0,
            },
          }
        : undefined,
    )
    .then((res) => res.data.data);
};

export const useGetWords = (params?: UseGetWordsParams) => {
  const { status: statusProp, isRandomOrder } = params || {};

  const { query } = useRouter();

  let status: Word['status'] = statusProp;

  if (!statusProp) {
    switch (query.scannerPage) {
      case 'list': {
        status = 'unknown';
        break;
      }
      case 'known': {
        status = 'skipped';
        break;
      }
      case 'unknown': {
        status = 'new';
        break;
      }
    }
  }

  return useQuery<Word[], AxiosError<{ message: string }>>(
    wordKeys.list({ filter: { status }, isRandomOrder }),
    () => fetchWords({ status, isRandomOrder }),
    { staleTime: isRandomOrder ? Infinity : 30000 },
  );
};

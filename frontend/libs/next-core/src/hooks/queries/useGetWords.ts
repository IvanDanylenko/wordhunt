import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { fetchClient } from '../../providers';
import { Word } from '../../types';
import { wordKeys } from './queryKeys';

const fetchWords = (status?: Word['status']) => {
  return fetchClient
    .get('/words', status ? { params: { filter: { status } } } : undefined)
    .then((res) => res.data.data);
};

export const useGetWords = (statusProp?: Word['status']) => {
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

  return useQuery<Word[], AxiosError>(wordKeys.list({ filter: { status } }), () =>
    fetchWords(status),
  );
};

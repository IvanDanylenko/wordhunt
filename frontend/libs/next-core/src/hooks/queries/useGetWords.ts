import { useQuery } from 'react-query';
import { fetchClient } from '../../providers';
import { Word } from '../../types';

const fetchWords = (status?: Word['status']) => {
  return fetchClient
    .get('/words', { params: { filter: { status: 'new' } } })
    .then((res) => res.data.data);
};

export const useGetWords = () => {
  return useQuery<Word[]>(['words'], () => fetchWords());
};

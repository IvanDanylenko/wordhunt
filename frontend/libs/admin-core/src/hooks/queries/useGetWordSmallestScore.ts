import { useQuery } from 'react-query';
import { fetchClient } from '../../providers';
import { useParams } from 'react-router-dom';

export interface WordSmallestScore {
  smallest_score: number;
}

const fetchWordSmallestScore = () => {
  return fetchClient.get('words/smallest-score').then((res) => res.data);
};

export const useGetWordSmallestScore = () => {
  const { id: wordId } = useParams();

  return useQuery<WordSmallestScore>(['word-smallest-score'], fetchWordSmallestScore, {
    enabled: !wordId,
  });
};

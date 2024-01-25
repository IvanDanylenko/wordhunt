import { useMutation } from 'react-query';
import { fetchClient } from '../../providers';
import { useNotify } from '../useNotify';

export const useReturnWordsToExercisesMutation = () => {
  const notify = useNotify();

  return useMutation({
    mutationFn: () => {
      return fetchClient.post('/words/return-words-to-exercises');
    },
    onSuccess: () => {
      notify('Success', { type: 'success' });
    },
  });
};

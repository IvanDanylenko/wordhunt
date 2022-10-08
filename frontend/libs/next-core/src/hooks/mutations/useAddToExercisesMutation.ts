import { useMutation, useQueryClient } from 'react-query';
import { useScannerTabContext } from '../../contexts';
import { fetchClient } from '../../providers';
import { wordKeys } from '../queries';

export const useAddToExercisesMutation = () => {
  const { unknownIds } = useScannerTabContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return fetchClient.post('/words/change-status/in-progress', { ids: unknownIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(wordKeys.lists());
    },
  });
};

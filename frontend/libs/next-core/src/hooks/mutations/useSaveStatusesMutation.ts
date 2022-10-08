import { useMutation, useQueryClient } from 'react-query';
import { useScannerTabContext } from '../../contexts';
import { fetchClient } from '../../providers';
import { wordKeys } from '../queries';

export const useSaveStatusesMutation = () => {
  const { unknownIds, knownIds } = useScannerTabContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const promises = [];
      if (knownIds.length) {
        promises.push(fetchClient.post('/words/change-status/skipped', { ids: knownIds }));
      }

      if (unknownIds.length) {
        promises.push(fetchClient.post('/words/change-status/new', { ids: unknownIds }));
      }

      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(wordKeys.lists());
    },
  });
};

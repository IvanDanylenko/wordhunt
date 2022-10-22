import { useMutation } from 'react-query';
import { fetchClient } from '../../providers';

export const useIncreaseLevelMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return fetchClient.post(`/words/${id}/increase-level`);
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorkFeedback } from '../api/work';
import { workKey } from '@/variables/queryKeys';

export function useCreateFeedback(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createWorkFeedback(id, data),
    onSuccess: () => {
      console.log('successMutation: create an feedback');
      queryClient.invalidateQueries({
        queryKey: workKey.feedbacks(id),
      });
    },
  });
}

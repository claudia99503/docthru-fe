import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeedback, updateFeedback } from '../api/feedback';
import { workKey } from '@/variables/queryKeys';

export function useMutateFeedback({ id, workId, action }) {
  const isUpdate = action === 'edit';

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      {
        if (isUpdate) return updateFeedback(id, data);
      }
      return deleteFeedback(id);
    },
    onSuccess: () => {
      console.log('successMutation: create an feedback');
      queryClient.invalidateQueries({
        queryKey: workKey.feedbacks(workId),
      });
    },
  });
}

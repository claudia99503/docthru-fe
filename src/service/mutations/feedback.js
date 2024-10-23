import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeedback, updateFeedback } from '../api/feedback';
import { workKey } from '@/variables/queryKeys';

export function useMutateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { id, action, content } = data;
      if (action === 'edit') {
        return updateFeedback(id, { content });
      } else if (action === 'delete') {
        return deleteFeedback(id);
      }
    },
    onSuccess: (data) => {
      if (data.workId) {
        console.log('successMutation: create an feedback');
        queryClient.invalidateQueries({
          queryKey: workKey.feedbacks(data.workId),
        });
      }
    },
  });
}

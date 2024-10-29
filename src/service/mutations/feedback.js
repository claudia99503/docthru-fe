import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateFeedback,
  deleteFeedback,
  createReply,
  updateReply,
  deleteReply,
} from '../api/feedback';
import { workKey } from '@/variables/queryKeys';

export function useMutateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { id, action, content, isReply, workId } = data;

      if (isReply) {
        if (action === 'edit') {
          return updateReply(id, { content });
        } else if (action === 'delete') {
          return deleteReply(id);
        }
      } else {
        if (action === 'edit') {
          return updateFeedback(id, { content });
        } else if (action === 'delete') {
          return deleteFeedback(id);
        } else if (action === 'reply') {
          return createReply(id, { content, workId });
        }
      }
    },
    onSuccess: (data) => {
      console.log(data);
      console.log('배열', workKey.feedbacks(data.workId));
      if (data.workId) {
        queryClient.invalidateQueries({
          queryKey: workKey.feedbacks(data.workId),
        });

        queryClient.invalidateQueries({
          queryKey: workKey.detail(data.workId),
        });
      }
    },
  });
}

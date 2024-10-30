import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateFeedback,
  deleteFeedback,
  createReply,
  updateReply,
  deleteReply,
} from '../api/feedback';
import { workKey, replyKey } from '@/variables/queryKeys';

export function useMutateReply() {
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
        return createReply(id, { content, workId });
      }
    },
    onSuccess: (data) => {
      console.log('reply', data);
      if (data) {
        const queryKey = replyKey.replies(data.feedbackId);
        queryClient.invalidateQueries(queryKey);
        queryClient.refetchQueries(queryKey, { exact: true });
      }
    },
  });
}

export function useMutateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { id, content, action } = data;
      if (action === 'edit') {
        return updateFeedback(id, { content });
      } else if (action === 'delete') {
        return deleteFeedback(id);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.workId) {
        const queryKey = workKey.feedbacks(data.workId);
        queryClient.invalidateQueries(queryKey);
      }
    },
  });
}

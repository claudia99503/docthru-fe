import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createWorkFeedback,
  createWorkLike,
  deleteWorkUnlike,
} from '../api/work';
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

export function useMutateLikes(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id, isLiked) => {
      return isLiked ? deleteWorkUnlike(id) : createWorkLike(id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: workKey.detail(id),
      });

      const prevData = queryClient.getQueryData({
        queryKey: workKey.detail(id),
      });

      queryClient.setQueryData({
        queryKey: workKey.detail(id),
        updater: (prev) => {
          return {
            ...prev,
            isFavorite: !isLiked,
            favoriteCount: isLiked
              ? prev.favoriteCount + 1
              : prev.favoriteCount - 1,
          };
        },
      });
      return { prevData };
    },
    onError: (context) => {
      queryClient.setQueryData({
        queryKey: workKey.detail(id),
        updater: context.prevData,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: workKey.detail(id) });
    },
  });
}

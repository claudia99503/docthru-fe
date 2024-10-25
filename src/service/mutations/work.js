import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createWork,
  createWorkFeedback,
  createWorkLike,
  deleteWork,
  deleteWorkUnlike,
} from '../api/work';
import { challengeKey, workKey } from '@/variables/queryKeys';
import { useRouter } from 'next/router';

export function useCreateFeedback(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createWorkFeedback(id, data),
    onSuccess: () => {
      console.log('successMutation: 피드백 생성 성공');
      queryClient.invalidateQueries({
        queryKey: workKey.feedbacks(id),
      });
    },
  });
}

export function useMutateLikes(isLiked) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isLiked }) => {
      if (id) {
        return isLiked ? deleteWorkUnlike(id) : createWorkLike(id);
      }
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

export function useCreateWork() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, data }) => createWork(id, data),
    onSuccess: async (data, variables) => {
      console.log('successMutation: 작업물 생성 성공');
      await queryClient.invalidateQueries({
        queryKey: challengeKey.list(variables.id),
      });
      await queryClient.refetchQueries(workKey.detail(variables.id));
      router.push(`/work/${data.id}`);
    },
  });
}

export function useDeleteWork() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id }) => deleteWork(id),
    onSuccess: (_, variables) => {
      console.log('successMutation: 작업물 삭제 성공');
      queryClient.invalidateQueries({
        queryKey: workKey.detail(variables.id),
      });
      router.push(`/me`);
    },
  });
}

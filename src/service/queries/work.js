import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getWorkList, getWork, getWorkFeedbacks } from '@/service/api/work';
import { workKey } from '@/variables/queryKeys';

export function useGetWorkList(id) {
  return useQuery({
    queryKey: ['worksList'],
    queryFn: () => getWorkList(id),
    enabled: !!id,
  });
}

export function useGetWork(id) {
  return useQuery({
    queryKey: workKey.detail(id),
    queryFn: () => getWork(id),
    enabled: !!id,
  });
}

export function useGeWorkFeedbacks(id) {
  return useInfiniteQuery({
    queryKey: workKey.feedbacks(id),
    queryFn: ({ pageParam = null }) =>
      getWorkFeedbacks(id, { cursorId: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNext) {
        return undefined;
      }
      return lastPage.meta.nextCursor;
    },
    keepPreviousData: true,
    enabled: !!id,
  });
}

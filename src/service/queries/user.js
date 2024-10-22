import { useQuery } from '@tanstack/react-query';
import { getOnGoingChallenge, getCompletedChallenge } from '@/service/api/user';

export function useGetOnGoingChallenge(queryParams) {
  return useQuery({
    queryKey: ['onGoingChallenges', queryParams],
    queryFn: () => getOnGoingChallenge(queryParams),
    keepPreviousData: true,
  });
}

export function useGetCompletedChallenge(queryParams) {
  return useQuery({
    queryKey: ['completedChallenges', queryParams],
    queryFn: () => getCompletedChallenge(queryParams),
    keepPreviousData: true,
  });
}

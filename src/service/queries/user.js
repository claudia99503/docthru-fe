import { useQuery } from '@tanstack/react-query';
import { getOnGoingChallenge, getCompletedChallenge } from '@/service/api/challenge';

export function useGetOnGoingChallenge(queryParams) {
  return useQuery({
    queryKey: ['onGoingChallenges'],
    queryFn: () => getOnGoingChallenge(queryParams),
  });
}

export function useGetCompletedChallenge(queryParams) {
  return useQuery({
    queryKey: ['completedChallenges'],
    queryFn: () => getCompletedChallenge(queryParams),
  });
}

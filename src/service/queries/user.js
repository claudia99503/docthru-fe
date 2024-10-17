import { useQuery } from '@tanstack/react-query';
import { getCompletedChallenge } from '@/service/api/challenge';

export function useGetCompletedChallenge(queryParams) {
  return useQuery({
    queryKey: ['completedChallenges'],
    queryFn: () => getCompletedChallenge(queryParams),
  });
}

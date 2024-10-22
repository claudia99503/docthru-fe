import { useQuery } from '@tanstack/react-query';
import { getChallengeList, getChallenge } from '@/service/api/challenge';

export function useGetChallenges(queryParams) {
  return useQuery({
    queryKey: ['challenges', queryParams],
    queryFn: () => getChallengeList(queryParams),
    keepPreviousData: true,
  });
}

export function useGetChallengeDetail(id) {
  return useQuery({
    queryKey: ['detailedChallenge', id],
    queryFn: () => getChallenge(id),
    enabled: !!id,
    cacheTime: 0
  });
}

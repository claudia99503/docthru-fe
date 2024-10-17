import { useQuery } from '@tanstack/react-query';
import { getChallengeList, getChallenge } from '@/service/api/challenge';

export function useGetChallenges(queryParams) {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: () => getChallengeList(queryParams),
  });
}

export function useGetChallengeDetail(id) {
  return useQuery({
    queryKey: ['detailedChallenge'],
    queryFn: () => getChallenge(id),
    enabled: !!id,
  });
}

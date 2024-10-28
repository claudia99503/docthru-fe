import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChallenge, deleteChallengeParticipation } from '../api/challenge';
import { challengeKey } from '@/variables/queryKeys';

export function useMutateChallenge(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const { id, isParticipate } = data;
      if (isParticipate) {
        return createChallenge(id);
      } else {
        return deleteChallengeParticipation(id);
      }
    },
    onSuccess: () => {
      console.log('successMutation');
      queryClient.invalidateQueries({
        queryKey: challengeKey.details(id),
      });
    },
  });
}

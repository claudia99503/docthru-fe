import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChallenge, deleteChallengeParticipation } from '../api/challenge';
import { challengeKey } from '@/variables/queryKeys';
import { useRouter } from 'next/router';

export function useGiveUpChallenge(id) {
  const router = useRouter();

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
      router.push(`/`);
    },
  });
}

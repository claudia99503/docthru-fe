import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createChallengeParticipation,
  deleteChallengeParticipation,
} from '../api/challenge';
import { challengeKey } from '@/variables/queryKeys';
import { useRouter } from 'next/router';

export function useGiveUpChallenge(id) {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      if (id) {
        return deleteChallengeParticipation(id);
      }
    },
    onSuccess: () => {
      console.log('successMutation');
      queryClient.invalidateQueries({
        queryKey: challengeKey.detail(id),
      });
      router.push(`/`);
    },
  });
}

export function useParticipateChallenge(challengeId) {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      if (id) {
        return createChallengeParticipation(id);
      }
    },
    onSuccess: () => {
      console.log('successMutation');
      queryClient.invalidateQueries({
        queryKey: challengeKey.detail(challengeId),
      });
      router.push(`/work/new/${challengeId}`);
    },
  });
}

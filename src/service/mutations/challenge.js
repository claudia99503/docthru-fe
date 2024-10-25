import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChallengeParticipation } from '../api/challenge';
import { challengeKey } from '@/variables/queryKeys';

export function useGiveUpChallenge(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteChallengeParticipation(id),
    onSuccess: () => {
      console.log('successMutation: 챌린지를 포기하였습니다');
      queryClient.invalidateQueries({
        queryKey: challengeKey.details(id),
      });
    },
  });
}

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/context/AuthProvider';
import { useModal } from './useModal';
import { createLogout } from '@/service/api/auth';

export function useAuth(required) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error('Error: not used within AuthProvider');
  }

  useEffect(() => {
    if (required && !context.user && !context.isLoading) {
      context.onModalOpen({
        msg: '로그인 된 유저만 접근할수 있습니다.',
        action: () => router.push('/auth/login'),
      });
    }
  }, [context.user, context.isLoading, router, required]);
  return context;
}

export function useLogout() {
  const queryClient = useQueryClient();

  const { onModalOpen } = useModal();

  const { mutate } = useMutation({
    mutationFn: createLogout,
    onSuccess: (data) => {
      onModalOpen({ msg: data.message });
      localStorage.removeItem('accessToken');
      queryClient.setQueriesData(['user'], null);
      router.push('/');
    },
  });

  return mutate;
}

'use client';

import { useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/context/AuthProvider';
import { createLogout } from '@/service/api/auth';
import { useRouter } from 'next/router';
import { TokenService, resetAxiosAuth } from '@/service/api/axios';

export function useAuth() {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error('Error: not used within AuthProvider');
  }

  const { user, isLoading } = context;

  useEffect(() => {
    if (user && router.pathname === '/auth/login') {
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, router]);

  return context;
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createLogout,
    onMutate: () => {
      const previousUser = queryClient.getQueryData(['user']);
      return { previousUser };
    },
    onSuccess: () => {
      queryClient.removeQueries(['user']); // 'user' 쿼리 데이터를 명확히 제거하게

      TokenService.remove();

      resetAxiosAuth();

      router.push('/'); // 메인 페이지로 리다이렉트하게
    },
    onError: (error, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }
      console.error('Logout failed:', error);

      if (error?.response?.status === 401) {
        TokenService.remove();
        queryClient.removeQueries(['user']); // 401 에러 시에도 'user' 데이터를 정확히 제거
        resetAxiosAuth();
        // 로그아웃 후 이미 리다이렉트가 발생했으므로, 추가적인 리다이렉트는 딱히 안해도 괜찮겠다
      }
    },
    mutationKey: ['logout'],
  });

  const handleLogout = async () => {
    if (isLoading) return;

    try {
      await mutateAsync();
    } catch (error) {}
  };

  return handleLogout;
}

'use client';

import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/context/AuthProvider';
import { createLogout } from '@/service/api/auth';
import { useRouter } from 'next/router';
import { TokenService, resetAxiosAuth } from '@/service/api/axios'; // TokenService와 resetAxiosAuth import

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Error: not used within AuthProvider');
  }
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
      queryClient.clear();

      TokenService.remove();

      resetAxiosAuth();

      router.push('/');
    },
    onError: (error, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }
      console.error('Logout failed:', error);

      if (error?.response?.status === 401) {
        TokenService.remove();
        queryClient.clear();
        resetAxiosAuth();
        router.push('/');
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

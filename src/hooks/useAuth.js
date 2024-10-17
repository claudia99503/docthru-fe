'use client';

import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/context/AuthProvider';
import { useModal } from './useModal';
import { createLogout } from '@/service/api/auth';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Error: not used within AuthProvider');
  }
  return context;
}

export function useLogout() {
  const queryClient = useQueryClient();

  const { onModalOpen } = useModal();

  const { mutateAsync } = useMutation({
    mutationFn: createLogout,
    onSuccess: (data) => {
      queryClient.setQueriesData(['user'], null);
      onModalOpen({ msg: data.message, path: '/' });
      localStorage.removeItem('accessToken');
    },
  });

  return mutateAsync;
}

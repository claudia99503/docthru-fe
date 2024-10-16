import { useModal } from '@/hooks/useModal';
import {
  createLogin,
  createLogout,
  createUser,
  getUserMe,
} from '@/service/api/auth';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState(null);
  const { onModalOpen, Modal: AuthModal } = useModal();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'));
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserMe,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!accessToken,
  });

  const loginMutation = useMutation({
    mutationFn: (data) => createLogin(data),
    onSuccess: (data) => {
      if (data && data.accessToken) {
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        onModalOpen({ msg: data.message, path: '/' });
        queryClient.invalidateQueries('user');
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (data) => {
      console.log('Success:', data);

      if (data && data.accessToken) {
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        queryClient.invalidateQueries('user');

        onModalOpen({ msg: data.message, path: '/' });
        console.log('Access Token:', data.accessToken);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: createLogout,
    onSuccess: (data) => {
      onModalOpen({ msg: data.message });
      localStorage.removeItem('accessToken');
      queryClient.setQueriesData(['user'], null);
      router.push('/');
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        login: loginMutation,
        signUp: signUpMutation,
        logout: logoutMutation,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

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

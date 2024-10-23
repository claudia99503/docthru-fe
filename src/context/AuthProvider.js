import Loader from '@/components/common/Loader';
import { useAlertModal } from '@/hooks/useModal';
import { createLogin, createUser, getUserMe } from '@/service/api/auth';
import CAN_USE_DOM from '@/utils/canUseDom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  login: () => {},
  signUp: () => {},
  isModalOpen: false,
  isRedirecting: false,
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState(null);
  const { onModalOpen, Modal: AuthModal, isModalOpen } = useAlertModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const cachedUser = queryClient.getQueryData(['user']);

  useEffect(() => {
    if (CAN_USE_DOM) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  useEffect(() => {
    if (cachedUser === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cachedUser]);

  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: getMe,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!accessToken && !cachedUser,
  });

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    } else if (isUserLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    console.log('User loading state:', isUserLoading);
  }, [isUserLoading, userData]);

  const loginMutation = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: (data) => createLogin(data),
    onSuccess: async (data) => {
      if (data && data.accessToken) {
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);

        queryClient.invalidateQueries({ queryKey: ['user'] });

        await getMe();
        setIsRedirecting(true);
        onModalOpen({
          msg: '로그인 되었습니다.',
          path: '/',
          action: () => setIsRedirecting(false),
        });
      }
    },
    onSettled: () => setIsLoading(false),
  });

  const signUpMutation = useMutation({
    onMutate: () => setIsLoading(true),
    mutationFn: (data) => createUser(data),
    onSuccess: async (data) => {
      if (data && data.accessToken) {
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);

        queryClient.invalidateQueries({ queryKey: ['user'] });

        await getMe(); // 사용자 정보 가져오기
        setIsRedirecting(true);
        onModalOpen({
          msg: '가입이 완료되었습니다.',
          path: '/',
          action: () => setIsRedirecting(false),
        });
      }
    },
    onSettled: () => setIsLoading(false),
  });

  return (
    <AuthContext.Provider
      value={{
        user: cachedUser || userData || null,
        isLoading,
        login: loginMutation,
        signUp: signUpMutation,
        isModalOpen,
        isRedirecting,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

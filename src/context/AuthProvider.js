import { useModal } from '@/hooks/useModal';
import { createLogin, createUser, getUserMe } from '@/service/api/auth';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: () => {},
  signUp: () => {},
  onModalOpen: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState(null);
  const { onModalOpen, Modal: AuthModal } = useModal();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');

      if (token) {
        setAccessToken(localStorage.getItem('accessToken'));
      }
    }
  }, []);

  const {
    data,
    isLoading,
    refetch: getMe,
  } = useQuery({
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
        queryClient.invalidateQueries({ queryKey: ['user'] });
        onModalOpen({ msg: data.message, path: '/', action: getMe });
        console.log('Access Token:', data.accessToken);
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
        queryClient.invalidateQueries({ queryKey: ['user'] });

        onModalOpen({ msg: data.message, path: '/', action: getMe });
        console.log('Access Token:', data.accessToken);
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        login: loginMutation,
        signUp: signUpMutation,
        onModalOpen,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

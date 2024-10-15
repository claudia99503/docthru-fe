import {
  createLogin,
  createLogout,
  createUser,
  getUserMe,
} from '@/service/api/user';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  isLoading: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState(null);

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

  const logInMutation = useMutation({
    mutationFn: (data) => createLogin(data),
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      queryClient.invalidateQueries('user');
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (data) => {
      const { accessToken } = data;

      localStorage.setItem('accessToken', accessToken);
      queryClient.invalidateQueries('user');
    },
  });

  const logOut = useMutation({
    mutationFn: createLogout,
    onSuccess: () => {
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
        logIn: logInMutation,
        signUp: signUpMutation,
        logOut,
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
      router.push('/auth/login'), console.log('로그인 필요함');
    }
  }, [context.user, context.isLoading, router, required]);
  return context;
}

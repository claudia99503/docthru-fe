import axios from 'axios';
import CAN_USE_DOM from '@/utils/canUseDom';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TokenService = {
  TOKEN_KEY: 'accessToken',
  get: () =>
    CAN_USE_DOM ? localStorage.getItem(TokenService.TOKEN_KEY) : null,
  set: (token) =>
    CAN_USE_DOM && localStorage.setItem(TokenService.TOKEN_KEY, token),
  remove: () => {
    if (CAN_USE_DOM) {
      localStorage.removeItem(TokenService.TOKEN_KEY);
    }
  },
  redirectToLogin: () => {
    if (CAN_USE_DOM && window.location.pathname !== '/auth/login') {
      window.location.href = '/auth/login';
    }
  },
};

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.get();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const resetAxiosAuth = () => {
  delete instance.defaults.headers.common['Authorization'];
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    try {
      const originalRequest = error.config;

      if (!CAN_USE_DOM) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        const subCode = error.response?.data?.error?.subCode;

        switch (subCode) {
          case 1: {
            // 토큰 만료
            if (
              !originalRequest._retry &&
              originalRequest.url !== '/users/token/refresh'
            ) {
              originalRequest._retry = true;
              try {
                const response = await instance.post('/users/token/refresh');
                const { accessToken } = response.data;

                if (accessToken) {
                  TokenService.set(accessToken);
                  instance.defaults.headers.common[
                    'Authorization'
                  ] = `Bearer ${accessToken}`;
                  return instance(originalRequest);
                }
              } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                TokenService.remove();
                resetAxiosAuth();
                TokenService.redirectToLogin();
                return Promise.reject({
                  status: refreshError.response?.status || 401,
                  message: '세션이 만료되었습니다. 다시 로그인해주세요.',
                });
              }
            }
            break;
          }
          case 2:
          case 3: {
            TokenService.remove();
            resetAxiosAuth();
            TokenService.redirectToLogin();
            break;
          }
          default: {
            console.error('Unauthorized access');
            TokenService.remove();
            resetAxiosAuth();
            TokenService.redirectToLogin();
          }
        }

        return Promise.reject({
          status: error.response.status,
          subCode,
          message:
            error.response?.data?.error?.message || '인증에 실패했습니다.',
        });
      }

      if (error.response?.status === 400) {
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.error.message,
          handled: true,
        });
      }

      if (error.response?.status === 409) {
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.error.message,
          handled: true,
        });
      }

      return Promise.reject({
        status: error.response?.status || 0,
        message:
          error.response?.data?.message || '예상치 못한 오류가 발생했습니다.',
      });
    } catch (interceptorError) {
      console.error('Response interceptor error:', interceptorError);
      return Promise.reject({
        status: 0,
        message: '예상치 못한 오류가 발생했습니다.',
      });
    }
  }
);

export default instance;

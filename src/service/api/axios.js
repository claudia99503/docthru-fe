import axios from 'axios';
import CAN_USE_DOM from '@/utils/canUseDom';

const API_URL =
  process.env.NEXT_PUBLIC_DEV_API_URL || process.env.NEXT_PUBLIC_API_URL;

const TokenService = {
  get: () => (CAN_USE_DOM ? localStorage.getItem('accessToken') : null),
  set: (token) => CAN_USE_DOM && localStorage.setItem('accessToken', token),
  remove: () => CAN_USE_DOM && localStorage.removeItem('accessToken'),
  redirectToLogin: () => CAN_USE_DOM && (window.location.href = '/auth/login'),
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
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 400) {
      return Promise.reject({
        status: error.response.status,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        handled: true,
      });
    }

    if (error.response?.status === 409) {
      return Promise.reject({
        status: error.response.status,
        message: '이미 존재하는 이메일입니다.',
        handled: true,
      });
    }

    // 401 에러 처리
    if (CAN_USE_DOM && error.response?.status === 401) {
      const subCode = error.response?.data?.error?.subCode;

      switch (subCode) {
        // 토큰 만료 (401.1)
        case 1: {
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const response = await instance.post(
                '/users/token/refresh',
                {},
                { withCredentials: true }
              );
              const { accessToken } = response.data;

              TokenService.set(accessToken);
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${accessToken}`;
              return instance(originalRequest);
            } catch (refreshError) {
              console.error('토큰 재생성 중 에러:', refreshError);

              // Refresh 토큰도 만료되었거나 서버 에러
              if (
                refreshError.response?.status === 401 ||
                refreshError.response?.status === 500
              ) {
                console.error('액세스 토큰이 유효하지 않거나 만료되었습니다');
                TokenService.remove();
                TokenService.redirectToLogin();
              }

              return Promise.reject({
                status: refreshError.response?.status,
                subCode: refreshError.response?.data?.subCode,
                message:
                  refreshError.response?.data?.message || '토큰 재생성 실패',
              });
            }
          }
          break;
        }

        // 유효하지 않은 토큰 (401.2)
        case 2: {
          console.error('유효하지 않은 토큰입니다.');
          TokenService.remove();
          TokenService.redirectToLogin();
          break;
        }

        // 토큰 누락 (401.3)
        case 3: {
          console.error('토큰이 누락되었습니다.');
          TokenService.remove();
          TokenService.redirectToLogin();
          break;
        }

        // 기본 401 에러
        default: {
          console.error('비인가 접근입니다');

          break;
        }
      }

      return Promise.reject({
        status: error.response.status,
        subCode,
        message: error.response?.data?.error?.message || '인증 실패',
      });
    }

    // 일반 응답 에러 처리
    if (error.response) {
      const { data } = error.response;

      if (data && data.error) {
        return Promise.reject({
          ...data.error,
          status: error.response.status,
          subCode: data.subCode,
          message: data.message,
        });
      }

      return Promise.reject({
        status: error.response.status,
        subCode: data.subCode,
        message: data.message || '예상치 못한 에러',
      });
    }

    // 요청 에러 처리
    if (error.request) {
      console.error('Request failed:', error.request);
      return Promise.reject({
        status: 0,
        message: error.request?.responseText || '네트워크 에러',
      });
    }

    // 예상치 못한 에러
    console.error('Unexpected error:', error.message);
    return Promise.reject({
      status: 0,
      message: error.message || '예상치 못한 에러',
    });
  }
);

export default instance;

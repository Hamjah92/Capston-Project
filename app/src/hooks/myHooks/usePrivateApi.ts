import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { privateApi } from 'src/utils/axios';
import { useRefreshToken } from './useRefreshToken';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';

export const usePrivateApi = () => {
  const refresh = useRefreshToken();
  const { user, logout } = useAuthContext();

  privateApi.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;

  if (user) {
    privateApi.defaults.headers.common['x-tenant-id'] = user.sub;
  }

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      (config: any) => {

        if (!config.headers!.Authorization) {
          config.headers!.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = privateApi.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const { accessToken } = await refresh();
          localStorage.setItem('accessToken', accessToken);
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          return privateApi(prevRequest);
        } else {
          if (error?.response?.status === 403 || error?.response?.status === 401) {
            logout();
          }
          return Promise.reject(error);
        }
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
      privateApi.interceptors.response.eject(responseIntercept);
    };
  }, [user, logout, refresh]);

  return privateApi;
};

import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const publicApi = axios.create({
  baseURL: HOST_API
  ,
  headers: {
    'Content-Type': 'application/json',
  },
});

publicApi.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await publicApi.get(url, { ...config });

  return res.data;
};


const privateApi = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

privateApi.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/auth/me',
    login: '/auth/login',
    register: '/auth/register',
  },
};

export { privateApi, publicApi };

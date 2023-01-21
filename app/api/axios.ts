import {getUser} from '@/utils';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import {ApiResult} from './api-result';
import {baseURL} from './config';

// Config
const config: AxiosRequestConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

// Instance
const axiosInstance = axios.create(config);

//  Interceptor Request
axiosInstance.interceptors.request.use(async requestConfig => {
  const headers: AxiosRequestHeaders | any = {};
  const user = await getUser();
  if (user && user?.access_token) {
    headers.Authorization = `Bearer ${user?.access_token}`;
  }

  requestConfig.headers = {...requestConfig.headers, ...headers};
  return requestConfig;
});

// on Ful Filled
const onFulFilled = async (response: AxiosResponse) => {
  return response;
};

// on Rejected
const onRejected = async (error: AxiosError) => {
  console.warn('onRejected', error.code);
  const apiResult: ApiResult<any> = {
    message: error?.message,
    isSuccess: false,
    data: null,
  };
  return apiResult;
};

//  Interceptor response
axiosInstance.interceptors.response.use(onFulFilled, onRejected);

export default axiosInstance;

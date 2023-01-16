import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from './config';

export const baseApi = createApi({
  reducerPath: 'baseApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, {getState}: any) => {
      const token = getState().user?.access_token || '';
      if (token) {
        headers.set('Authorization', 'Bearer ' + token);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
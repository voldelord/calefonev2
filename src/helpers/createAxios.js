import * as axios from 'axios';
import qs from 'qs';
import {getAuth} from './auth';

const host = 'http://192.168.1.114:3000/api';

export const createAxios = () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const axiosInstance = axios.default.create({
    baseURL: host,
    headers,
    paramsSerializer: params => qs.stringify(params),
  });

  axiosInstance.interceptors.request.use(
    async request => {
      var authInfo = await getAuth();

      if (authInfo !== null) {
        request.headers = {
          ...headers,
          // Authorization: `Bearer ${authInfo.token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiZmNiNTVkLTAzN2YtNDMxMi1hODYyLTdhMWQyOTA2NzQ1MCIsImVtYWlsIjoiYWxleEBnbWFpbC5jb20iLCJpYXQiOjE3MDU5MTkyMTR9.wROeeaMXtl6sor3IOFUSmAXYgIUYiB8kaziEqjgb92s`,
        };
      }

      return request;
    },
    error => Promise.reject(error),
  );

  return axiosInstance;
};

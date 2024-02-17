import * as axios from 'axios';
import qs from 'qs';
import {getAuth} from './auth';

export const hostIp = '192.168.1.114';
// export const hostIp = '54.207.97.89';
const host = `http://${hostIp}:3000/api`;

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
          Authorization: `Bearer ${authInfo.token}`,
        };
      }

      return request;
    },
    error => Promise.reject(error),
  );

  return axiosInstance;
};

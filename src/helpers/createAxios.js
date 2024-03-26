import * as Axios from 'axios';
import qs from 'qs';
import {getAuth} from './auth';
import {SETTINGS} from '../constants/settings';

export const createAxios = () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const axiosInstance = Axios.default.create({
    baseURL: SETTINGS.apiUrl,
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

export const axios = createAxios();

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { tokenManager } from './tokenManager';

export const createFetchClient = (): AxiosInstance => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.NX_API_URL,
    headers: {
      Accept: 'application/json',
    },
  };

  const instance: AxiosInstance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const token = tokenManager.getToken();
    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
  });

  return instance;
};

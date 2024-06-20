import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { getCookieData } from "@/shared/lib/helpers";

export type $AxiosError = {
  code: number;
  message: string;
};

export type $AxiosResponse<T> = {
  id: number;
  error: $AxiosError;
  result: T;
};

const API_URL = import.meta.env.VITE_API_URL;

const sessionHeader = () => {
  const { phone, token, tokenHeaderName } = getCookieData<{
    phone: string;
    token: string;
    tokenHeaderName: string;
  }>();

  return {
    productId: "GEKKARD",
    applicationId: "GEKKARD",
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: phone,
          [tokenHeaderName]: token
        }
      : {})
  };
};

export const $axios = axios.create({
  withCredentials: true,
  headers: sessionHeader(),
  paramsSerializer: {
    indexes: null // by default: false
  },
  responseType: "json",
  baseURL: !!API_URL ? API_URL : window.location.origin
});

function isRejectRequired(config: InternalAxiosRequestConfig<any>): boolean {
  return !config.url.includes("/auth") && !config.headers.AccountId && !config.url.includes("/get_info");
}

$axios.interceptors.request.use(config => (isRejectRequired(config) ? Promise.reject() : config));

export default <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  $axios({
    ...config,
    ...options
  });

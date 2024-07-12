import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const sessionHeader = () => {
  return {
    "Content-Type": "application/json"
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
  return !config.url.includes("/auth") && !config.headers["AccountId"] && !config.url.includes("/get_info");
}

$axios.interceptors.request.use(config => {
  if (isRejectRequired(config)) {
    return Promise.reject();
  }

  return config;
});

export default <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  $axios({
    ...config,
    ...options
  });

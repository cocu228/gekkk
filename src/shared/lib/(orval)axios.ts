import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type $AxiosError = {
    code: number;
    message: string;
}

export type $AxiosResponse<T> = {
    id: number;
    error: $AxiosError;
    result: T;
}

const API_URL = import.meta.env.VITE_API_URL;

const sessionHeaders = {
    'productId': "GEKKARD",
    'applicationId': 'GEKKARD',
    'Content-Type': 'application/json',
};


export const $axios = axios.create({
    withCredentials: true,
    headers: sessionHeaders,
    paramsSerializer: {
        indexes: null // by default: false
    },
    responseType: 'json',
    baseURL: !!API_URL ? API_URL : window.location.origin
});

function isRejectRequired(config: InternalAxiosRequestConfig<any>): boolean {
    return !config.url.includes('/auth') && !config.headers['AccountId'] && !config.url.includes('/get_info');
}

$axios.interceptors.request.use(config => {
    return isRejectRequired(config) ? Promise.reject() : config;
});

export default <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => $axios({
    ...config,
    ...options,
});

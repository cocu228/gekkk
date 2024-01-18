import {$ENV_MODE, getCookieData} from "@/shared/lib/helpers";
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export type $AxiosError = {
    code: number;
    message: string;
}

export type $AxiosResponse<T> = {
    id: number;
    error: $AxiosError;
    result: T;
}

const API_URL = import.meta.env[`VITE_API_URL_${$ENV_MODE}`];

const sessionHeader = () => {

    const {
        phone,
        token,
        tokenHeaderName
    } = getCookieData<{
        phone: string,
        token: string,
        tokenHeaderName: string
    }>();

    return {
        'productId': "GEKKARD",
        'applicationId': 'GEKKARD',
        'Content-Type': 'application/json',
        ...(token ? {
            'Authorization': phone,
            [tokenHeaderName]: token,
        } : {})
    }
}

export const AXIOS_INSTANCE = axios.create({
    withCredentials: true,
    headers: sessionHeader(),
    paramsSerializer: {
        indexes: null // by default: false
    },
    responseType: 'json',
    baseURL: !!API_URL ? API_URL : window.location.origin
});

// Add .then(({data}) => data) to remove basic AxiosResponse class
export const $axios = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => AXIOS_INSTANCE({
    ...config,
    ...options,
});

export default $axios;

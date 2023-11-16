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
        'Content-Type': 'application/json;charset=UTF-8',
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

export const $axios = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
    const source = axios.CancelToken.source();
    
    // Add .then(({data}) => data) to remove basic AxiosResponse class
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    });
    
    // @ts-ignore
    promise.cancel = () => {
        source.cancel();
    };
    
    return promise;
};

export default $axios;

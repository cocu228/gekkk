import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {getCookieData} from "@/shared/lib/helpers";

export type $AxiosError = {
    code: number;
    message: string;
}

export type $AxiosResponse<T> = {
    id: number;
    error: $AxiosError;
    result: T;
}

const {MODE} = import.meta.env
const API_URL_MODE = import.meta.env[`VITE_API_URL_${MODE}`]

const sessionHeader = () => {


    const {phone, token, tokenHeaderName} = getCookieData<{ phone: string, token: string, tokenHeaderName: string }>()

    const keys = token ? {
        'Authorization': phone,
        [tokenHeaderName]: token,
    } : {}

    return {
        'Content-Type': 'application/json;charset=UTF-8',
        'applicationId': 'GEKKARD',
        'productId': "GEKKARD",
        ...keys
    }
}

export const AXIOS_INSTANCE = axios.create({
    withCredentials: true,
    headers: sessionHeader(),
    paramsSerializer: {
        indexes: null // by default: false
    },
    responseType: 'json',
    baseURL: !!API_URL_MODE ? API_URL_MODE : window.location.origin
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

import axios from 'axios';
import {$ENV_MODE, getCookieData} from "@/shared/lib/helpers";

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
// const API_URL_MODE = import.meta.env[`VITE_API_URL_${MODE}`]
const API_URL = import.meta.env[`VITE_API_URL_${$ENV_MODE}`];

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

const $axios = axios.create({
    withCredentials: true,
    headers: sessionHeader(),
    paramsSerializer: {
        indexes: null // by default: false
    },
    responseType: 'json',
    baseURL: !!API_URL ? API_URL : window.location.origin
});

export default $axios;

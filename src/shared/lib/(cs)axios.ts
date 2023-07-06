import axios from 'axios';
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


    const {phone, token } = getCookieData<{ phone: string, token: string }>()

    const keys = token ? {
        'Authorization': phone,
        'token': token,
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
    baseURL: !!API_URL_MODE ? API_URL_MODE : window.location.origin
});

export default $axios;

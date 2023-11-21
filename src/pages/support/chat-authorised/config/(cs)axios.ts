import {$ENV_MODE} from "@/shared/lib/helpers";
import axios, {AxiosRequestConfig} from 'axios';

// type ApiResponse<T> = {
//     status: 'success' | 'error';
//     data: NonNullable<T>;
//     errorMessage?: string;
// };


export type ApiResponse<T, S extends 'success' | 'error'> = S extends 'success'
    ? {
        status: S;
        data: T;
    }
    : {
        status: S;
        errorMessage: string;
    };

export const chat_axios = axios.create({
    paramsSerializer: {
        indexes: null // by default: false
    },
    responseType: 'json',
    baseURL: import.meta.env[`VITE_SUPPORT_URL_${$ENV_MODE}`]
});


export const makeApiRequest = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any, // Request data for POST or PUT requests
    customConfig?: AxiosRequestConfig,
    errorMessage?: string,
): Promise<ApiResponse<T, 'success' | 'error'>> => {

    try {
        const response = await chat_axios.request({
            method,
            url,
            data,
            ...customConfig
        });

        // Check the HTTP status code for success
        if (response.status >= 200 && response.status < 300) {
            return { status: 'success', data: response.data as NonNullable<T> };
        } else {
            return { status: 'error', errorMessage: errorMessage ?? 'Request failed.' };
        }
    } catch (error) {
        console.error(errorMessage ??'Request error:', error);

        return { status: 'error', errorMessage: errorMessage ?? 'Request failed.' };
    }
};

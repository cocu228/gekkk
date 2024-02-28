import {$axios, $AxiosResponse } from "@/shared/lib/(orval)axios";
import { AxiosRequestConfig } from "axios";

export type StatementsByIBAN = {
    reportName: string
    from: string
    to: string
    downloadLink: string
    iban: string
}
export type GetStatementsResponseType = {
    statements: {
        [key: string]: StatementsByIBAN[]
    }
    errors?: { code: number }
};

export const apiGetStatements = (options?: AxiosRequestConfig) =>
    $axios.get<GetStatementsResponseType>('/api/v1/statements', {
        ...options,
        baseURL: import.meta.env.VITE_BANK_API_URL
    });

export const apiDownloadStatements = (reference: string, options?: AxiosRequestConfig) =>
    $axios.get<any>('/api/v1/statements/file/', {
        ...options,
        baseURL: import.meta.env.VITE_BANK_API_URL,
        params: {
            reference
        }
    });

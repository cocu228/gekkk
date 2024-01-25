import {$axios, $AxiosResponse } from "@/shared/lib/(orval)axios";

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

export const apiGetStatements = () =>
    $axios.get<$AxiosResponse<GetStatementsResponseType>>('/api/v1/statements', {
    });

export const apiDownloadStatements = (reference: string) =>
    $axios.get<$AxiosResponse<any>>('/api/v1/statements/file/', {
        params: {
            reference
        }
    });

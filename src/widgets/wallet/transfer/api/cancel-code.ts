import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";


export const apiCancelTxCode = (code: string) =>
    $axios.post<$AxiosResponse<any>>('/gek/v1/cancel_code', {}, {
        params: {
            code: code
        }
    })

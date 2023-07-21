import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export const apiApplyCode = (code: string) =>
    $axios.post<$AxiosResponse<any>>('/gek/v1/apply_code', null, {
        params: {
            code,
        }
    })

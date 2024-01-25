import {AXIOS_INSTANCE as $axios, $AxiosResponse} from "@/shared/lib/(orval)axios";


export const apiPasswordVerify = (password: string) =>
    $axios.post<$AxiosResponse<{ status: string }>>('/api/v1/password/verify', {
        password
    })

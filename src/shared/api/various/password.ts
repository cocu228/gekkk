import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";


export const apiPasswordVerify = (password: string) =>
    $axios.post<$AxiosResponse<{ status: string }>>('/api/v1/password/verify', {
        password
    })

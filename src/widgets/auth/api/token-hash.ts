import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export const apiTokenHash = (hash?: string, sessionData?: string) => $axios.post<$AxiosResponse<any>>('/pub/v1/auth',
    null, {
        params: {
            key: hash
        }
    })
import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResSessionData {
    authorization: string,
    token: string,
    tokenHeaderName: string
}

export const apiTokenHash = (hash?: string, sessionData?: IResSessionData) =>
    $axios.post<$AxiosResponse<IResSessionData | string>>('/pub/v1/auth',
        null, {
            params: {
                key: hash
            }
    });

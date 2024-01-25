import {$axios, $AxiosResponse} from "@/shared/lib/(orval)axios";

export interface IResSessionData {
    authorization: string,
    token: string,
    tokenHeaderName: string
}

export const apiTokenHash = (hash?: string, sessionData?: IResSessionData) =>
    $axios.post<$AxiosResponse<IResSessionData | string>>('/gek/v1/auth',
        sessionData, {
            params: {
                key: hash
            }
        });

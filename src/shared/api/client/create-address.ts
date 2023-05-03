import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResCreateAddress {

}

export const apiCreateNetwork = (token_network: number) =>
    $axios.get<$AxiosResponse<IResCreateAddress>>('/gek/v1/client/create_address', {
        params: {
            token_network
        }
    })

import $axios from "@/shared/lib/(cs)axios";

export interface IResCreateAddress {

}

export const apiCreateNetwork = (token_network: number) =>
    $axios.get<IResCreateAddress>('/gek/v1/client/create_address', {
        params: {
            token_network
        }
    })

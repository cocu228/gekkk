import $axios from "@/shared/lib/(cs)axios";

export interface IResCreateNetwork {

}

export const apiCreateNetwork = (type_network: number) =>
    $axios.get<IResCreateNetwork>('/gek/v1/client/create_address', {
        params: {
            type_network
        }
    })

import $axios from "@/shared/lib/(cs)axios";

export interface IResCreateAddress {

}

export const apiCreateNetwork = (type_network: number) =>
    $axios.get<IResCreateAddress>('/gek/v1/client/create_address', {
        params: {
            type_network
        }
    })

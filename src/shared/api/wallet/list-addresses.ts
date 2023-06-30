import $axios from "@/shared/lib/(cs)axios";

export interface IResListAddresses {
    id: number,
    address: string,
    type_address: string
}

export const apiListAddresses = (token_network: number) =>
    $axios.get<IResListAddresses[]>('/gek/v1/wallet/list_addresses',{
    params: {
        token_network
    }
})


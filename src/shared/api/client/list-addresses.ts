import $axios from "@/shared/lib/(cs)axios";

export interface IResListAddresses {
    id: number,
    address: string,
    type_address: string,
    network: string
}

export const apiListAddresses = () =>
    $axios.get<IResListAddresses[]>('/gek/v1/client/list_addresses')


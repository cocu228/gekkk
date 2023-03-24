import $axios from "@/shared/lib/(cs)axios";

interface IResTokenNetworks {
    id: number,
    type_network: number,
    type_network_name?: string,
    address_contract?: string,
    type_contract?: string,
    withdraw_fee: number,
    name?: string,
    symbol?: string,
    is_operable: boolean,
    min_withdraw: number,
    min_deposit: number,
    max_withdraw: number,
    can_withdraw: boolean,
    can_deposit: boolean,
    type_address?: string
}

export const apiTokenNetworks = (currency: string) =>
    $axios.get<IResTokenNetworks[]>('/gek/v1/tokens_networks', {
        params: {
            currency
        }
    })

import {actionSuccessConstructor} from "@/shared/lib/helpers";
import {IResTokenNetwork} from "@/shared/api";
import {TNetworksForSelector} from "@/widgets/wallet/model/types";
import {AxiosResponse} from "axios";

export const testGekkardAccount = (networksDefault: IResTokenNetwork[], networkIdSelect: number) => Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3

export const helperApiTokenNetworks = function (response: AxiosResponse) {
    const result = Array.isArray(response.data.result) &&
        response.data.result

    return actionSuccessConstructor.call(result, typeof Array.isArray(result))
}

export const helperApiListAddresses = function (response: AxiosResponse) {

    const isEmpty = response.data.result.length === 0

    const result = isEmpty ? undefined : response.data.result[0]?.address

    return actionSuccessConstructor.call(result, typeof Array.isArray(response.data.result))
}


export const sortingNetworksForSelector = function (networks: Array<IResTokenNetwork>): TNetworksForSelector | [] {
    return networks.map(it => ({
        value: it.id,
        label: `${it.contract_name === 'None' ? '' : `${it.contract_name} / `}
        ${!it.network_name ? '' : `${it.network_name} / `} ${it.token_name} (${it.token_symbol})`
    }))
}

// export const getAddressForChose = function (addresses: Array<IResListAddresses>, network: IResTokenNetwork): undefined | IResListAddresses {
//     return addresses.find(item => network.network_type.split(",").some(it => it === item.type_address))
// }

export const getNetworkForChose = function (networks: Array<IResTokenNetwork>, networkId: number): IResTokenNetwork {
    return networks?.find(it => it.id === networkId)
}

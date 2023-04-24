import {actionSuccessConstructor} from "@/shared/lib/helpers";
import {IResListAddresses, IResTokenNetwork} from "@/shared/api";
import {TNetworksForSelector} from "@/widgets/wallet/model/types";
import {AxiosResponse} from "axios";


export const helperApiTokenNetworks = function (response: AxiosResponse) {
    const data = Array.isArray(response.data) &&
        response.data

    return actionSuccessConstructor.call(data, typeof data[0]?.type_address === "string")
}


export const sortingNetworksForSelector = function (networks: Array<IResTokenNetwork>): TNetworksForSelector | [] {
    return networks.map(it => ({label: it.name, value: it.id}))
}

export const getAddressForChose = function (addresses: Array<IResListAddresses>, network: IResTokenNetwork): undefined | IResListAddresses {
    return addresses.find(item => network.type_address.split(",").some(it => it === item.type_address))
}

export const getNetworkForChose = function (networks: Array<IResTokenNetwork>, networkId: number): IResTokenNetwork {
    return networks.find(it => it.id === networkId)
}

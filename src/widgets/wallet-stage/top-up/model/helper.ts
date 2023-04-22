import {actionSuccessConstructor} from "@/shared/lib/helpers";
import {IResListAddresses, IResTokenNetwork} from "@/shared/api";
import {TAddressesForSelector} from "@/widgets/wallet-stage/top-up/model/types";
import {AxiosResponse} from "axios";


export const helperApiTokenNetworks = function (response: AxiosResponse) {
    const data = Array.isArray(response.data) &&
        response.data[0]

    return actionSuccessConstructor.call(data, typeof data.type_address === "string")
}


export const sortingAddressesForSelector = function (addresses: Array<IResListAddresses>): TAddressesForSelector {
    return addresses.map(val => ({label: val.type_address, value: val.address}))
}

export const sortingAddressesForCurrency = function (addresses: Array<IResListAddresses>, data: IResTokenNetwork) {
    return addresses.filter(item => data.type_address.split(",").some(it => it === item.type_address))
}


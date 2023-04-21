import {actionSuccessConstructor} from "@/shared/lib/helpers";


export const helperApiTokenNetworks = function (response) {
    const data = Array.isArray(response.data) &&
        response.data[0]

    return actionSuccessConstructor.call(data, typeof data.type_address === "string")
}


export const helperSortingList = function (list, data) {

    return list.filter(item => data.type_address.split(",").some(it => it === item.type_address))
        .map(val => ({label: val.type_address, value: val.address}))
}


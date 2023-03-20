import {IResBalance} from "@/shared/api";
import $const from "@/shared/config/coins/constants";
import {IListAllCryptoName} from "@/shared/store/crypto-assets";
import Decimal from "decimal.js";

export interface ISortedListBalance {
    availableBalance: Decimal,
    freezeBalance: Decimal,
    id: string,
    const: $const,
    name: string
}

export const sortingListBalance = (data: IResBalance[], assets: IListAllCryptoName['listAllCryptoName']): Array<ISortedListBalance> | null => {

    if (!Array.isArray(data) || data.length === 0) return null

    return data.map((item, i) => {

        return {
            availableBalance: new Decimal(item.free_balance).toDecimalPlaces(4),
            freezeBalance: new Decimal(item.free_balance).toDecimalPlaces(4),
            id: item.currency + "-" + i,
            const: item.currency,
            name: assets.filter(it => it.code === item.currency)[0]?.name ?? "No name"
        }

    })
}
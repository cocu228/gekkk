import {IResBalance} from "@/shared/api";
import $const from "@/shared/config/coins/constants";
import {IListAllCryptoName} from "@/shared/store/crypto-assets";
import Decimal from "decimal.js";

export interface ISortedListBalance {
    decimalPlaces: number;
    availableBalance: Decimal,
    freezeBalance: Decimal,
    id: string,
    const: $const,
    name: string
}

export const sortingListBalance = (data: IResBalance[], assets: IListAllCryptoName['listAllCryptoName']): Array<ISortedListBalance> | null => {

    if (!Array.isArray(data) || data.length === 0) return null

    return data.map((item, i) => {

        const infoToken = assets.find(it => it.code === item.currency)
        const decimalPlaces = infoToken.decimal_prec ?? 4

        return {
            availableBalance: new Decimal(item.free_balance),
            freezeBalance: new Decimal(item.free_balance),
            id: item.currency + "-" + i,
            const: item.currency,
            decimalPlaces,
            name: infoToken.name ?? "No name"
        }

    })
}
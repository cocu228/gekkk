import {IResBalance, IResMarketAssets} from "@/shared/api";
import $const from "@/shared/config/coins/constants";
import {IListAllCryptoName} from "@/shared/store/crypto-assets";
import Decimal from "decimal.js";

export interface ISortedListBalance {
    availableBalance: Decimal,
    freezeBalance: Decimal,
    id: string,
    const: $const,
    name: string,
    balance: IResBalance,
    roundingValue: number,
    defaultInfoToken: IResMarketAssets
}

export const sortingListBalance = (data: IResBalance[], assets: IListAllCryptoName['listAllCryptoName']): Array<ISortedListBalance> | null => {

    if (!Array.isArray(data) || data.length === 0) return null

    return data.map((item, i) => {

        const defaultInfoToken = assets.find(it => it.code === item.currency)

        return {
            availableBalance: new Decimal(item.free_balance),
            freezeBalance: new Decimal((item.lock_orders + item.lock_out_balance)),
            id: item.currency + "-" + i,
            const: item.currency,
            name: defaultInfoToken.name ?? "No name",
            balance: item,
            roundingValue: defaultInfoToken.round_prec,
            defaultInfoToken
        }
    })
}
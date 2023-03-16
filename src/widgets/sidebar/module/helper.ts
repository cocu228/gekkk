import {IApiGetBalance} from "@/shared/api";
import $const from "@/shared/config/coins/constants";
import {randomId} from "@/shared/lib/helpers";
import {IAssetsCoinsName} from "@/shared/store";
import Decimal from "decimal.js";


// const list: Record<TCoinAbbreviation, TCoinsNameListParams> = Coins

export interface IResult {
    eurg: Omit<TParamsResult, "holdBalance" | "name" | "icon">;
    coins: Array<TParamsResult>
}

type TParamsResult = {
    balance: Decimal.Value
    holdBalance: Decimal.Value
    id: string
    abbreviation: $const
    icon: string
    name: string
}
export const generation = (data: IApiGetBalance[], assets: IAssetsCoinsName['assets']): IResult | null => {

    if (!Array.isArray(data) || data.length === 0) return null

    const eurg = data.filter(item => item.currency === $const.EURG)[0]

    const coins = data.filter(item => item.currency !== "EURG").map(item => {

        return {
            balance: new Decimal(item.free_balance).toFixed(4),
            id: randomId(),
            abbreviation: item.currency,
            holdBalance: new Decimal(item.lock_orders).plus(item.lock_out_balance).toFixed(4),
            icon: `${item.currency.toLowerCase().capitalize()}Icon.svg`,
            name: assets.filter(it => it.code === item.currency)[0]?.name ?? "No name"
        }
    })

    return {
        eurg: {
            balance: new Decimal(eurg.free_balance).toFixed(4),
            id: randomId(),
            abbreviation: eurg.currency,
        },
        coins
    }
}


// const test = generation([3, 3, 3, 3], [])
//
// console.log(test)
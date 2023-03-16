import {IApiGetBalance} from "@/shared/api";
import $const from "@/shared/config/coins/constants";
import {randomId} from "@/shared/lib/helpers";
import {IAssetsCoinsName} from "@/shared/store";


// const list: Record<TCoinAbbreviation, TCoinsNameListParams> = Coins

export interface IResult {
    eurg: Omit<TParamsResult, "holdBalance" | "name" | "icon">;
    coins: Array<TParamsResult> | []
}

type TParamsResult = {
    balance: number
    holdBalance: number
    id: string | Array<string>
    abbreviation: $const
    icon: string
    name: string
}
//todo
export const generation: IResult | null = (data: IApiGetBalance[], assets: IAssetsCoinsName['assets']) => {

    if (!Array.isArray(data) || data.length === 0) return null

    const eurg = data.filter(item => item.currency === "EURG")[0]

    const coins = data.filter(item => item.currency !== "EURG").map(item => {

        return {
            balance: item.free_balance.toFixed(4),
            id: randomId(),
            abbreviation: item.currency,
            holdBalance: (item.lock_orders + item.lock_out_balance).toFixed(4),
            icon: item.currency.toLowerCase().capitalize() + "Icon.svg",
            name: assets.filter(it => it.code === item.currency)[0].name || "No Name"
        }
    })


    return {
        eurg: {
            balance: eurg.free_balance.toFixed(4),
            // icon: "",
            // name: "",
            id: randomId(),
            abbreviation: eurg.currency,
        },
        coins
    }
}
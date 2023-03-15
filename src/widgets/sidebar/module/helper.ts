import {IApiGetBalance, TCoinAbbreviation} from "@/shared/api";
import {Coins} from "@/shared/config/coins/coins";
import {randomId} from "@/shared/lib/helpers";


interface TCoinsNameListParams {
    name: string;
    icon: string;
}


const list: Record<TCoinAbbreviation, TCoinsNameListParams> = Coins

export interface IResult {
    eurg: Omit<TParamsResult, "holdBalance">;
    coins: Array<TParamsResult> | []
}

type TParamsResult = {
    balance: number
    holdBalance: number
    id: string | Array<string>
    abbreviation: TCoinAbbreviation
    icon: string
    name: string
}
//todo
export const generation: IResult | null = (data: IApiGetBalance[]) => {

    if (!Array.isArray(data) || data.length === 0) return null

    const eurg = data.filter(item => item.currency === "EURG")[0]

    const coins = data.filter(item => item.currency !== "EURG").map(item => {
        return {
            balance: item.free_balance.toFixed(4),
            id: randomId(),
            abbreviation: item.currency,
            holdBalance: (item.lock_orders + item.lock_out_balance).toFixed(4),
            icon: list[item.currency]?.icon ?? "",
            name: list[item.currency]?.name ?? "No name"
        }
    })


    return {
        eurg: {
            balance: eurg.free_balance.toFixed(4),
            icon: Coins["EURG"].icon,
            name: Coins["EURG"].name,
            id: randomId(),
            abbreviation: eurg.currency,
        },
        coins
    }
}
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import {IResBalance, IResMarketAsset} from "../api";
import Decimal from "decimal.js";
import {isNumber} from "@/shared/lib/helpers";

export const initEmptyCurrenciesCollection = (assets: IResMarketAsset[]): Map<string, ICtxCurrency> => {
    const currencies = new Map();
    assets.forEach(asset => currencies.set(asset.code, new ICtxCurrency(asset)))
    return currencies;
}

export const walletsGeneration = (currencies: Map<string, ICtxCurrency>, wallets: IResBalance[]): Map<string, ICtxCurrency> => {
    wallets.forEach(wallet => {
        currencies.set(wallet.currency, {
            ...currencies.get(wallet.currency),
            lockOrders: wallet.lock_orders,
            lockInBalance: wallet.lock_in_balance,
            lockOutBalance: wallet.lock_out_balance,
            availableBalance: isNumber(wallet.free_balance) ? new Decimal(wallet.free_balance) : null,
            userBalanceEUREqu: wallet?.user_balance_EUR_equ
        })
    })

    return currencies;
}

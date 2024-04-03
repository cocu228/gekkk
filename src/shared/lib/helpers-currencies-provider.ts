import Decimal from "decimal.js";
import { isNumber } from "@/shared/lib/helpers";
import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { GetBalanceOut, CurrencysOut } from "../(orval)api/gek/model";

export const initEmptyCurrenciesCollection = (assets: CurrencysOut[]): Map<string, ICtxCurrency> => {
    const currencies = new Map();
    assets.forEach(asset => currencies.set(asset.code, new ICtxCurrency(asset)))
    return currencies;
}

export const walletsGeneration = (currencies: Map<string, ICtxCurrency>, wallets: GetBalanceOut[]): Map<string, ICtxCurrency> => {
    wallets.forEach(wallet => {
        currencies.set(wallet.currency, {
            ...currencies.get(wallet.currency),
            balance: null
        });
    });

    return currencies;
}

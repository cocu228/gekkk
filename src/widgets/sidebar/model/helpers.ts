import { ICtxCurrency } from "@/processes/CurrenciesContext";

const hasPositiveBalance = (balance: any) => balance && (
    balance.free_balance > 0
    || balance.lock_in_balance > 0
    || balance.lock_orders > 0
    || balance.lock_out_balance > 0
    || balance.user_balance > 0
);

export const helperFilterList = (list: Array<ICtxCurrency>, constantsToFilter: Array<string>) =>
    list.filter(({ $const, balance }) => !constantsToFilter.includes($const) && hasPositiveBalance(balance));

export const helperFilterListGekkard = (list: Array<ICtxCurrency>) => helperFilterList(list, ["EUR", "EURG", "GKE"]);

export const helperFilterListGekwallet = (list: Array<ICtxCurrency>) => helperFilterList(list, ["EUR", "BTC", "USDT", "ETH"]);

export const helperFilterListGekkoin = (list: Array<ICtxCurrency>) => helperFilterList(list, ["EUR"]);

import { ICtxCurrency } from "@/processes/CurrenciesContext";

export const helperFilterListGekkard = (list: Array<ICtxCurrency>) =>
    list.filter(({
        $const,
        balance
    }) => $const !== "EUR" && $const !== "EURG" && $const !== "GKE" && balance && (
        balance.free_balance > 0
        || balance.lock_in_balance > 0
        || balance.lock_orders > 0
        || balance.lock_out_balance > 0
        || balance.user_balance > 0
    ));

export const helperFilterListGekwallet = (list: Array<ICtxCurrency>) =>
    list.filter(({
        $const,
        balance
    }) => $const !== "EUR" && $const !== "BTC" && $const !== "USDT" && $const !== "ETH" && balance && (
        balance.free_balance > 0
        || balance.lock_in_balance > 0
        || balance.lock_orders > 0
        || balance.lock_out_balance > 0
        || balance.user_balance > 0
    ));

export const helperFilterListGekkoin = (list: Array<ICtxCurrency>) =>
    list.filter(({
        $const,
        balance
    }) => $const !== "EUR" && balance && (
        balance.free_balance > 0
        || balance.lock_in_balance > 0
        || balance.lock_orders > 0
        || balance.lock_out_balance > 0
        || balance.user_balance > 0
    ));

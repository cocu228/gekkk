import { ICtxCurrency } from "@/processes/CurrenciesContext";

export const helperFilterList = (list: Array<ICtxCurrency>) =>
    list.filter(({
        $const,
        balance
    }) => $const !== "EURG" && $const !== "GKE" && $const !== "EUR" && balance && (
        balance.free_balance > 0
        || balance.lock_in_balance > 0
        || balance.lock_orders > 0
        || balance.lock_out_balance > 0
        || balance.user_balance > 0
    ));

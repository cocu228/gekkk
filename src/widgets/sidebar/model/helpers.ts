import { ICtxCurrencyData } from "@/processes/RootContext";

export const helperFilterList = (list: Array<ICtxCurrencyData>) =>
    list.filter(({$const, availableBalance, lockInBalance}) =>
        ((($const !== "EURG" && $const !== "GKE" && $const !== "EUR") && availableBalance && !availableBalance.equals(0))) ||
        (($const !== "EURG" && $const !== "GKE" && $const !== "EUR") && (lockInBalance && lockInBalance > 0)));

import { ICtxCurrencyData } from "@/processes/RootContext";

export const helperFilterList = (list: Array<ICtxCurrencyData>) =>
    list.filter(({$const, availableBalance, lockInBalance}) =>
        ((($const !== "EURG" && $const !== "GKE") && availableBalance && !availableBalance.equals(0))) ||
        (($const !== "EURG" && $const !== "GKE") && (lockInBalance && lockInBalance > 0)));

import { ICtxCurrencyData } from "@/processes/RootContext";

export const helperFilterList = (list: Array<ICtxCurrencyData>) =>
    list.filter(({currency, availableBalance, lockInBalance}) =>
        (((currency !== "EURG" && currency !== "GKE") && availableBalance && !availableBalance.equals(0))) ||
        ((currency !== "EURG" && currency !== "GKE") && (lockInBalance && lockInBalance > 0)));

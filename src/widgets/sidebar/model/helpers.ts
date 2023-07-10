import { ICtxCurrencyData } from "@/processes/RootContext";

export const helperFilterList = (list: Array<ICtxCurrencyData>) =>
    list.filter(({ currency, availableBalance }) =>
        (currency !== "EURG" && currency !== "GKE") && availableBalance && !availableBalance.equals(0));

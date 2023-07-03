import { ICtxCurrencyData } from "@/app/RootContext";

export const helperFilterList = (list: Array<ICtxCurrencyData>) =>
    list.filter(({ currency, availableBalance }) =>
        (currency !== "EURG" && currency !== "GKE") && availableBalance && !availableBalance.equals(0));

import { ICtxCurrency } from "@/processes/CurrenciesContext";

export const helperFilterList = (list: Array<ICtxCurrency>) =>
    list.filter(({$const, availableBalance, lockInBalance}) =>
        ((($const !== "EURG" && $const !== "GKE" && $const !== "EUR") && availableBalance && !availableBalance.equals(0))) ||
        (($const !== "EURG" && $const !== "GKE" && $const !== "EUR") && (lockInBalance && lockInBalance > 0)));

export const toLocaleCryptoRounding = (value: number, maximumFractionDigits?: number, minimumFractionDigits?: number): string | null => {
	const newVal = value?.toLocaleString("eu", { maximumFractionDigits, minimumFractionDigits});
    if (!newVal) return null;
    return newVal.replace('.', ' ');
}

export const toLocaleFiatRounding = (value: number): string | null =>{
	const newVal = value?.toLocaleString("eu", { maximumFractionDigits: 2, minimumFractionDigits: 2});
    if (!newVal) return null;
    return newVal.replace('.', ' ');
};

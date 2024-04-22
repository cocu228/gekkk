import {GetDepositOut} from "@/shared/(orval)api/gek/model";

export const helperInvestmentsSort = (investments: Array<GetDepositOut>) =>
    investments.sort((a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime());

export const toLocaleCryptoRounding = (value: number, maximumFractionDigits?: number, minimumFractionDigits?: number): string | null => 
	value?.toLocaleString("eu", { maximumFractionDigits, minimumFractionDigits});

export const toLocaleFiatRounding = (value: number): string | null =>
	value?.toLocaleString("eu", { maximumFractionDigits: 2, minimumFractionDigits: 2});

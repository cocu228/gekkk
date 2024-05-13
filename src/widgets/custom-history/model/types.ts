import { TransactTypeEnum } from "@/shared/(orval)api/gek/model";

export interface ISelectTxTypes {
    t: string;
    label: string;
    value: TransactTypeEnum[];
}

export interface ISelectAssets {
    label: string;
    value: string;
    isFiat?: boolean; 
}

export interface ISelectCard {
    label: string;
    value: string;
}

export interface IDateRange {
    to: Date | null;
    from: Date | null;
}

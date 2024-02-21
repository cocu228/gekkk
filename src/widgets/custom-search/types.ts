import { Card, TransactTypeEnum } from "@/shared/(orval)api/gek/model";

export interface ISelectTxTypes {
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
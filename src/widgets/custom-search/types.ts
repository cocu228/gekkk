import { TransactTypeEnum } from "@/shared/(orval)api/gek/model";

export interface ISelect {
    label: string;
    value: TransactTypeEnum[];
    is_fiat?: boolean;
}
import {GetHistoryTrasactionOut, TransactTypeEnum} from "@/shared/(orval)api/gek/model";

export type HistoryTabs = 'last_txs' | 'custom';

export interface HistoryProps {
    to?: Date;
    from?: Date;
    className: string;
    includeFiat: boolean;
    tab?: HistoryTabs;
    types: TransactTypeEnum[];
    currenciesFilter: string[];
}

export type TxInfoProps = GetHistoryTrasactionOut & {
    handleCancel: () => void;
    onUpdateTxInfo?: (txId: string, senderName: string) => void;
}

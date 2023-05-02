import $axios from "@/shared/lib/(cs)axios";

export interface IResListTxCodes {
    code: string,
    currency: string,
    typeTx: number,
    amount: number,
    state: string,
    dateTxUTC: string,
    dateCodeUTC: null | string
}

export const apiListTxCodes = () =>
    $axios.get<IResListTxCodes>('/gek/v1/list_tx_codes')

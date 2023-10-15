import {$AxiosResponse} from "@/shared/lib/(cs)axios";
import {AxiosResponse} from "axios";

type TDataErrorGekkard = $AxiosResponse<null>

export type TDataErrorsBank = {
    errors: Array<{
        code: number,
        message: string,
        properties: { confirmationToken: string }
    }>
}

export type TDataErrorProvider = TDataErrorsBank & TDataErrorGekkard

export type TResponseErrorProvider = AxiosResponse<TDataErrorProvider>

export interface IStateErrorProvider {
    errors: Array<{
        id: string
        message: string,
        code?: number,
        status?: string,
        type?: string,
        response?: null | TDataErrorProvider
    }> | null,
    trxConfirm: null | TDataErrorsBank
}

export interface IServiceErrorProvider {
    onClick: (val: string) => void,
    message: string,
    id: string
    type: string
}

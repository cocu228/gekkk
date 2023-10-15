import {$AxiosResponse} from "@/shared/lib/(cs)axios";
import {AxiosResponse} from "axios";

type TDataErrorGekkard = $AxiosResponse<null>

type TDataErrorsBank = {
    errors: Array<{
        code: number,
        message: string,
        properties: { confirmationToken: string }
    }>
}

export type TDataErrorProvider = TDataErrorsBank & TDataErrorGekkard

export type TResponseErrorProvider = AxiosResponse<TDataErrorProvider>

export interface IStateErrorProvider {
    id: string,
    message: string,
    res: TDataErrorProvider
}

export interface IServiceErrorProvider {
    onClick: (val: string) => void,
    message: string,
    id: string
}

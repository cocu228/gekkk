import {$AxiosResponse} from "@/shared/lib/(cs)axios";
import {AxiosResponse} from "axios";

type TDataErrorGekkard = $AxiosResponse<null>

export type TDataErrorsBank = {
    errors: Array<{
        code: number,
        message: string,
        properties: {
            confirmationToken: string,
            confirmationCodeLength: number
        }
    }>
}

export type TDataErrorProvider = TDataErrorsBank & TDataErrorGekkard

export type TResponseErrorProvider = AxiosResponse<TDataErrorProvider>

export interface IStateErrorProvider {
    errors: Array<{
        id: string;
        message: string;
        code?: number;
        status?: string;
        type?: string;
        response?: null | TDataErrorProvider;
    }> | null;
    actionConfirmResponse: null | TResponseErrorProvider;
    pending: {
        resolve: (value: AxiosResponse<any, any> | PromiseLike<any>) => void;
        reject: (reason?: any) => void;
    }
}

export interface IServiceErrorProvider {
    onClick: (val: string) => void,
    message: string,
    id: string
    type: string
}

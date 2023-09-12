import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResAccountInfo {
    name: string;
    flags: number;
    phone: string;
    account: string;
    current: boolean;
    date_update: Date;
    account_id: string;
}

export const apiGetAccountInfo = (refresh: boolean = false) =>
    $axios.get<$AxiosResponse<IResAccountInfo[]>>('/gek/v1/wallet/get_info', {
        params: {
            refresh
        }
    });

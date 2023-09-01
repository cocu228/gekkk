import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResAccountInfo {
    account: string;
    name: string;
    date_update: Date;
    flags: number;
    phone: string;
    current: boolean;
}

export const apiGetAccountInfo = (refresh: boolean = false) =>
    $axios.get<$AxiosResponse<IResAccountInfo[]>>('/gek/v1/wallet/get_info', {
        params: {
            refresh
        }
    });

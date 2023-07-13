import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResGetInfoClient {
    id: number,
    external_id: string | null,
    account_id: string | null,
    juridical_id: string | null,
    date_create: string,
    date_update: string,
    referal_id: number,
    flags: number,
    max_addr_count: number,
    phone: string | null
}

export const apiGetInfoClient = () =>
    $axios.get<$AxiosResponse<IResGetInfoClient>>('/gek/v1/wallet/get_info')


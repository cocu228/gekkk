import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResGetInfoClient {
    "id": number,
    "external_id": string,
    "date_create": string,
    "date_update": string,
    "referal_id": number,
    "flags": number,
    "max_addr_count": number
}

export const apiGetInfoClient = (accountId: string) =>
    $axios.get<$AxiosResponse<IResGetInfoClient>>('/gek/v1/wallet/get_info', {
        headers: {
            client_id: "GEKKARD",
            accountId,
        }
    })


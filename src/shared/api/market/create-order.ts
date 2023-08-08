import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface INewOrder {
    from_currency: string,
    to_currency: string,
    from_amount: string,
    to_amount?: string,
    client_nonce?: number,
    is_limit?: boolean,
    post_only?: boolean,
    room_key?: number
}

export const apiCreateOrder = (order: INewOrder) =>
    $axios.post<$AxiosResponse<INewOrder>>('/gek/v1/market/create_order', {
        ...order,
        post_only: false
    });

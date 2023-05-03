import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface INewOrder {
    array?: string,
    from_currency: string,
    to_currency: string,
    from_amount: number,
    to_amount?: number,
    client_nonce?: string,
    is_limit?: boolean,
    post_only?: boolean,
    room_key?: number
}

export const apiCreateOrder = (order: INewOrder) =>
    $axios.post<$AxiosResponse<Array<INewOrder>>>('/gek/v1/market/create_order', order);

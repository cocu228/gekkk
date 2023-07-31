import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResOrder {
    from: string,
    to: string,
    room_key: number,
    volume_source: number,
    volume_dest: number,
    cur_volume_source: number,
    cur_volume_dest: number,
    type_order: string,
    time_updated: string,
    time_created: string,
    id: number,
    state: string
}

export const apiGetOrders = (
    fromOrderId: string,
    roomKey?: string,
    ord_states?: Array<number> | null,
    from?: Date,
    to?: Date,
    limit?: number
) =>
    $axios.get<$AxiosResponse<Array<IResOrder>>>('/gek/v1/market/get_orders', {
        params: {
            from_order_id: fromOrderId,
            room_key: roomKey,
            limit,
            ord_states,
            start: from,
            end: to
        }
    });

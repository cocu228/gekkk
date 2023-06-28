import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export const apiCancelOrder = (orderId: number) =>
    $axios.post<$AxiosResponse<string>>('/gek/v1/market/cancel_order', null, {
        params: {
            id: orderId
        }
    });

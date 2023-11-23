import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IRoomInfo {
    currency1: string;
    currency2: string;
    flags: number;
    to_balance_limit: number;
    timetick?: number;
    room_code?: string;
    count?: number;
}

export const apiCreateRoom = (roomInfo: IRoomInfo) =>
    $axios.post<$AxiosResponse<IRoomInfo>>('/gek/v1/market/create_room', roomInfo);

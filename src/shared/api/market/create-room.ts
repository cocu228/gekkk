import $const from "@/shared/config/coins/constants";
import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IRoomInfo {
    currency1: $const;
    currency2: $const;
    flags: number;
    to_balance_limit: number;
    timetick?: string;
    room_code?: boolean;
    count?: boolean;
}

export const apiCreateRoom = (roomInfo: IRoomInfo) =>
    $axios.post<$AxiosResponse<Array<IRoomInfo>>>('/gek/v1/market/create_room', roomInfo);

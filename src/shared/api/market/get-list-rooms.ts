import {IRoomInfo} from "./create-room";
import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export const apiGetExchangeRooms = () =>
    $axios.get<$AxiosResponse<Array<IRoomInfo>>>('/gek/v1/market/list_rooms');

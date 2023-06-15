import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export const apiCloseRoom = (roomNumber: string) =>
    $axios.post<$AxiosResponse<string>>('/gek/v1/market/close_room', null, {
        headers: {
            roomId: roomNumber
        }
    });

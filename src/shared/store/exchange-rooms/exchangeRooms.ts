import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiListRooms} from "@/shared/(orval)api/shared";
import {RoomInfo} from "@/shared/(orval)api/shared/model";

export interface IStoreListExchangeRooms {
    roomsList: RoomInfo[];
    getRoomsList: () => void;
    addRoom: (info: RoomInfo) => void;
    removeRoom: (roomNumber: number) => void;
}

export const storeListExchangeRooms = create<IStoreListExchangeRooms>()(devtools((set) => ({
    roomsList: null,
    getRoomsList: async () => {
        const {data} = await apiListRooms();

        set((state) => ({
            ...state,
            roomsList: data.result ?? [],
        }));
    },
    addRoom: (info) => {
        set((state) => ({
            ...state,
            roomsList: [
                ...state.roomsList,
                info
            ]
        }));
    },
    removeRoom: (roomNumber) => {
        set((state) => ({
            ...state,
            roomsList: [
                ...state.roomsList.filter(r => r.timetick !== roomNumber)
            ]
        }));
    }
})));

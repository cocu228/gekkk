import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiGetExchangeRooms, IRoomInfo} from "@/shared/api";

export interface IStoreListExchangeRooms {
    roomsList: IRoomInfo[];
    getRoomsList: () => void;
    addRoom: (info: IRoomInfo) => void;
    removeRoom: (roomNumber: string) => void;
}

export const storeListExchangeRooms = create<IStoreListExchangeRooms>()(devtools((set) => ({
    roomsList: null,
    getRoomsList: async () => {
        const {data} = await apiGetExchangeRooms();

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

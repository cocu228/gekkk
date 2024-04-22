import {create} from 'zustand'
import {devtools} from "zustand/middleware";

export interface IToggleSidebar {
    isOpen: boolean;
    toggle: (val: boolean) => void

}

export const storyToggleSidebar = create<IToggleSidebar>()(devtools((set) => ({
    isOpen: true,
    toggle: (val) => {
        set((state) => ({...state, isOpen: val}))
    }
})))
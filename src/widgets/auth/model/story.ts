import {create} from 'zustand'
import {devtools} from "zustand/middleware";

export interface IDisplayAuth {
    stage: "authorization" | "code" | "qr-code" | 'forgot-password';
    toggleStage: (val: IDisplayAuth["stage"], data?: string | null) => void
    // getData: () => null | string,
    data: null | string,

}

export const storyDisplayAuth = create<IDisplayAuth>()(devtools((set) => ({
    stage: "authorization",
    data: null,

    toggleStage: (stage, data = null) => {

        set(state => ({...state, stage, data}))
    }
})))

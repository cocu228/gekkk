import {create} from 'zustand'
import {devtools} from "zustand/middleware";

export interface IDisplayStage {
    stage: "authorization" | "code" | "qr-code";
    toggleStage: (val: IDisplayStage["stage"]) => void

}

export const storyDisplayStage = create<IDisplayStage>()(devtools((set) => ({
    stage: "authorization",
    toggleStage: (stage) => {
        set(state => ({...state, stage}))
    }
})))
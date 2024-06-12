

import {create} from 'zustand'
import {devtools} from "zustand/middleware";

interface CopyContext {
  isCopied: boolean,
  setIsCopied: (value: boolean) => void;
}

export const useCopyStore = create<CopyContext>()(devtools((set) => ({
  isCopied: false,
  setIsCopied: (value) => set({ isCopied: value })
})));

export default useCopyStore;
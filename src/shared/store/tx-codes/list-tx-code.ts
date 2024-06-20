import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { apiListTxCodes } from "@/shared/(orval)api/gek";
import { TxCodesOut } from "@/shared/(orval)api/gek/model";

export interface IListTxCode {
  listTxCode: Array<TxCodesOut>;
  getListTxCode: () => Promise<Array<TxCodesOut>>;
}

export const storeListTxCode = create<IListTxCode>()(
  devtools(set => ({
    listTxCode: [],
    getListTxCode: async () => {
      const { data } = await apiListTxCodes();

      set(state => ({
        ...state,
        listTxCode: data.result ?? []
      }));

      return data.result;
    }
  }))
);

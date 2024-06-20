import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ClientDetails } from "@/shared/(orval)api/gek/model";
import { apiClientDetails } from "@/shared/(orval)api/gek";

export interface IStoreAccounts {
  /**
   * Возвращает информацию о клиенте
   * @param forceRefresh флаг принудительного запроса данных с сервера (при необходимости)
   */
  getAccountDetails: (forceRefresh?: boolean) => Promise<ClientDetails>;
}

/**
Стор, который хранит в себе информацию о клиенте.
Имеет только один публичный метод - *getAccountDetails*,
который сохраняет информацию при первом вызове
и выдаёт сохранённую копию при последующих
*/
export const storeAccountDetails = create<IStoreAccounts>()(
  devtools((setState, getState) => ({
    details: null,
    getAccountDetails: async (forceRefresh?: boolean) => {
      // @ts-ignore
      const { details } = getState();

      const { data } = forceRefresh || !details ? await apiClientDetails() : { data: { result: details } };

      setState(state => ({
        ...state,
        details: data.result
      }));

      return data.result;
    }
  }))
);

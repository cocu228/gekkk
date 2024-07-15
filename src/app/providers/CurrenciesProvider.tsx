import { memo, ReactNode, useContext, useEffect, useState } from "react";

import { CtxRootData } from "@/processes/RootContext";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { apiGetBalance } from "@/shared/(orval)api/gek";
import { actionResSuccess, isNull, randomId, uncoverResponse } from "@/shared/lib/helpers";
import { initEmptyCurrenciesCollection, walletsGeneration } from "@/shared/lib/helpers-currencies-provider";
import { storeAssets } from "@/shared/store/assets";
import { $axios, IS_GEKKARD_APP } from "@/shared/lib";

interface IState {
  currencies: Map<string, ICtxCurrency> | null;
  totalAmount: {
    refreshKey: string;
    EUR: number | null;
  };
}

export default memo(function ({ children }: { children: ReactNode }): JSX.Element | null {
  const { refreshKey } = useContext(CtxRootData);
  const { assets, getAssets } = storeAssets(state => state);

  const [state, setState] = useState<IState>({
    currencies: null,
    totalAmount: {
      EUR: null,
      refreshKey: ""
    }
  });

  useEffect(() => {
    (async function () {
      if (!!$axios.defaults.headers.AccountId) {
        const walletsResponse = await apiGetBalance();
        const assetsResponse = assets ?? (await getAssets());

        let currencies: Map<string, ICtxCurrency>;

        actionResSuccess(walletsResponse)
          .success(async function () {
            currencies = isNull(state.currencies) ? initEmptyCurrenciesCollection(assetsResponse) : state.currencies;

            currencies = walletsGeneration(currencies, uncoverResponse(walletsResponse));

            setState(prev => ({
              ...prev,
              currencies,
              totalAmount: {
                ...prev.totalAmount,
                refreshKey: randomId()
              }
            }));

            if (IS_GEKKARD_APP()) {
              //TODO eurResponse слишком долго приходит ответ от банка, но объект участвует в общей коллекции списка,
              // поэтому его значения не дожидаются выполнения полного цикла CtxCurrency
              const eurResponse = await apiGetBalance({
                currency: "EUR"
              });

              currencies = walletsGeneration(currencies, uncoverResponse(eurResponse));

              setState(prev => ({
                ...prev,
                currencies,
                totalAmount: {
                  ...prev.totalAmount,
                  refreshKey: randomId()
                }
              }));
            }
          })
          .reject(() => {});
      }
    })();
  }, [refreshKey]);

  useEffect(() => {
    if (state.currencies !== null)
      (async () => {
        const value: number = Array.from(state.currencies.values()).reduce((previousValue, currentValue) => {
          if (currentValue.balance?.user_balance_EUR_equ) {
            const value = currentValue.balance.user_balance_EUR_equ;
            return value + previousValue;
          }

          return previousValue;
        }, 0);

        setState(prev => ({
          ...prev,
          totalAmount: {
            ...prev.totalAmount,
            EUR: value
          }
        }));
      })();
  }, [state.totalAmount.refreshKey]);

  return (
    <CtxCurrencies.Provider
      value={{
        currencies: state.currencies,
        totalAmount: state.totalAmount.EUR
      }}
    >
      {children}
    </CtxCurrencies.Provider>
  );
});

import React, { memo, useContext, useEffect, useState } from 'react';
import { CtxRootData } from '@/processes/RootContext';
import { ICtxCurrency } from '@/processes/CurrenciesContext';
import { apiGetBalance, apiGetRates } from '@/shared/api';
import {
    actionResSuccess,
    isNull,
    randomId,
    uncoverResponse
} from '@/shared/lib/helpers';
import {
    initEmptyCurrenciesCollection,
    walletsGeneration
} from "@/shared/lib/helpers-currencies-provider";
import Decimal from 'decimal.js';
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import Loader from "@/shared/ui/loader";
import ETokensConst from "@/shared/config/coins/constants";
import { storeAssets } from "@/shared/store/assets";

interface IState {
    currencies: Map<string, ICtxCurrency> | null,
    ratesEUR: Record<ETokensConst, number>,
    totalAmount: {
        refreshKey: string;
        EUR: Decimal | null;
        BTC: Decimal | null;
    }
}

export default memo(function ({ children }: { children: React.ReactNode }): JSX.Element | null {
    console.log('(5) Currencies provider')
    const { refreshKey } = useContext(CtxRootData);
    const { assets, getAssets } = storeAssets(state => state);

    const [state, setState] = useState<IState>({
        currencies: null,
        ratesEUR: null,
        totalAmount: {
            EUR: null,
            BTC: null,
            refreshKey: ""
        }
    })

    useEffect(() => {

        (async function () {

            const walletsResponse = await apiGetBalance();
            const assetsResponse = assets ? assets : await getAssets()


            let currencies: Map<string, ICtxCurrency>

            actionResSuccess(walletsResponse)
                .success(async function () {

                    currencies = isNull(state.currencies) ? initEmptyCurrenciesCollection(assetsResponse)
                        : state.currencies

                    currencies = walletsGeneration(currencies, uncoverResponse(walletsResponse))



                    setState(prev => ({
                        ...prev,
                        currencies,
                        totalAmount: {
                            ...prev.totalAmount,
                            refreshKey: randomId()
                        }
                    }));

                    //TODO eurResponse слишком долго приходит ответ от банка, но объект участвует в общей коллекции списка,
                    // поэтому его значения не дожидаются выполнения полного цикла CtxCurrency
                    const eurResponse = await apiGetBalance('EUR');

                    currencies = walletsGeneration(currencies, uncoverResponse(eurResponse))

                    setState(prev => ({
                        ...prev, currencies,
                        totalAmount: {
                            ...prev.totalAmount,
                            refreshKey: randomId()
                        }
                    }))



                }).reject(() => null);
        })();

    }, [refreshKey]);


    useEffect(() => {

        if (state.currencies !== null) (async () => {
            const ratesEUR = await apiGetRates()
            const ratesBTC = await apiGetRates("BTC")

            const valueEUR: Decimal = getTotalAmount(state.currencies, uncoverResponse(ratesEUR))
            const valueBTC: Decimal = getTotalAmount(state.currencies, uncoverResponse(ratesBTC))

            setState(prev => ({
                ...prev,
                ratesEUR: uncoverResponse(ratesEUR),
                totalAmount: {
                    ...prev.totalAmount,
                    BTC: valueBTC,
                    EUR: valueEUR
                }
            }))
        })();

    }, [state.totalAmount.refreshKey]);

    return <CtxCurrencies.Provider value={{
        currencies: state.currencies,
        totalAmount: state.totalAmount,
        ratesEUR: state.ratesEUR
    }}>
        {state.currencies === null ? <Loader /> : children}
    </CtxCurrencies.Provider>
});

const getTotalAmount = (list: Map<string, ICtxCurrency>, rates: Record<ETokensConst, number>) => {
    console.log('(6) Total amount')

    return Array.from
        (list.values()).filter(item => item.availableBalance !== null).reduce<Decimal>((previousValue: Decimal, currentValue, i, list) => {

            const course = rates[currentValue.$const]

            if (course) {
                const value = new Decimal(course).times(currentValue.availableBalance)
                return value.plus(previousValue)
            }

            return previousValue;

        }, new Decimal(0))

}

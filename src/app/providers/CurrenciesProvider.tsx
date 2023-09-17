import React, {memo, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {CtxRootData} from '@/processes/RootContext';
import {ICtxCurrency} from '@/processes/CurrenciesContext';
import {apiGetBalance, apiGetRates} from '@/shared/api';
import {
    actionResSuccess, isNull, randomId,
    uncoverResponse
} from '@/shared/lib/helpers';
import {
    initEmptyCurrenciesCollection,
    walletsGeneration
} from "@/shared/lib/helpers-currencies-provider";
import Decimal from 'decimal.js';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import Loader from "@/shared/ui/loader";
import ETokensConst from "@/shared/config/coins/constants";
import {storeAssets} from "@/shared/store/assets";

export default memo(function ({children}: { children: React.ReactNode }): JSX.Element | null {

    const {refreshKey, account} = useContext(CtxRootData);

    const getAssets = storeAssets(state => state.getAssets)
    const assets = storeAssets(state => state.assets)

    const [state, setState] = useState({
        currencies: null,
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

            const valueEUR: Decimal = totalizeAmount(state.currencies, ratesEUR.data.result)
            const valueBTC: Decimal = totalizeAmount(state.currencies, ratesBTC.data.result)

            setState(prev => ({
                ...prev,
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
        totalAmount: state.totalAmount
    }}>
        {state.currencies === null ? <Loader/> : children}
    </CtxCurrencies.Provider>
});

const totalizeAmount = (list: Map<string, ICtxCurrency>, rates: Record<ETokensConst, number>) => {

    return Array.from(list.values()).filter(item => item.availableBalance !== null).reduce<Decimal>((previousValue: Decimal.Value, currentValue, i, list) => {

        const course = rates[currentValue.$const]
        const value = new Decimal(course).times(currentValue.availableBalance)

        return value.plus(previousValue)

    }, new Decimal(0))

}

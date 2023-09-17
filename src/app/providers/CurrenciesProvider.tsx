import React, {memo, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {CtxRootData} from '@/processes/RootContext';
import {ICtxCurrency} from '@/processes/CurrenciesContext';
import {apiGetBalance, apiGetMarketAssets, apiGetRates} from '@/shared/api';
import {
    actionResSuccess,
    uncoverArray,
    uncoverResponse
} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helper-currencies-generation";
import Decimal from 'decimal.js';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import Loader from "@/shared/ui/loader";
import ETokensConst from "@/shared/config/coins/constants";
import {storeAssets} from "@/shared/store/assets";

export default memo(function ({children}: { children: React.ReactNode }): JSX.Element | null {
    const {refreshKey, account} = useContext(CtxRootData);
    const getAssets = storeAssets(state => state.getAssets)
    const [{
        currencies,
        totalAmount
    }, setState] = useState({
        currencies: new Map<string, ICtxCurrency>(),
        totalAmount: {
            EUR: null,
            BTC: null
        }
    })

    useEffect(() => {


        (async function () {

            console.log("currencies")


            const walletsResponse = await apiGetBalance();
            const assetsResponse = await getAssets()

            console.log(assetsResponse)

            actionResSuccess(walletsResponse)
                .success(() => {
                            setState(prev => ({
                                ...prev,
                                currencies: helperCurrenciesGeneration(
                                    assetsResponse,
                                    uncoverResponse(walletsResponse),
                                    // uncoverArray(uncoverResponse(eurResponse))
                                )
                            }));
                }).reject(() => null);
        })();

    }, [refreshKey, account]);

    // useEffect(() => {
    //
    //     const assetsResponse = storeAssets(state => state.assets)
    //
    //     (async () => {
    //         console.log("eurResponse")
    //
    //         const eurResponse = await apiGetBalance('EUR');
    //
    //         currencies.set("EUR", new ICtxCurrency(asset, eurWallet));
    //
    //     })()
    // }, [refreshKey, account])

    useEffect(() => {
        if (currencies.size === 0) return;

        (async () => {
            const ratesEUR = await apiGetRates()
            const ratesBTC = await apiGetRates("BTC")

            const valueEUR: Decimal = totalizeAmount(currencies, ratesEUR.data.result)
            const valueBTC: Decimal = totalizeAmount(currencies, ratesBTC.data.result)

            setState(prev => ({
                ...prev,
                totalAmount: {
                    EUR: valueEUR,
                    BTC: valueBTC
                }
            }))
        })();
    }, [currencies]);

    // useEffect(() => {
    //     (async () => {
    //         const eurWallet = currencies.get('EUR');

    //         if (eurWallet) {
    //             const {data} = await apiGetBalance('EUR');
    //             const {
    //                 lock_orders,
    //                 free_balance,
    //                 lock_in_balance,
    //                 lock_out_balance
    //             } = uncoverArray(data.result);

    //             currencies.set('EUR', {
    //                 ...eurWallet,
    //                 availableBalance: new Decimal(free_balance),
    //                 lockInBalance: lock_in_balance,
    //                 lockOutBalance: lock_out_balance,
    //                 lockOrders: lock_orders
    //             })
    //         }
    //     })();
    // }, [currencies]);

    console.log(currencies.size === 0)

    return <CtxCurrencies.Provider value={{
        currencies,
        totalAmount
    }}>
        {currencies.size === 0 ? <Loader/> : children}
    </CtxCurrencies.Provider>
});

const totalizeAmount = (list: Map<string, ICtxCurrency>, rates: Record<ETokensConst, number>) => {

    return Array.from(list.values()).filter(item => item.availableBalance !== null).reduce<Decimal>((previousValue: Decimal.Value, currentValue, i, list) => {

        const course = rates[currentValue.$const]
        const value = new Decimal(course).times(currentValue.availableBalance)

        return value.plus(previousValue)

    }, new Decimal(0))

}

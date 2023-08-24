import React, {memo, useContext, useEffect, useState} from 'react';
import {CtxRootData} from '@/processes/RootContext';
import {ICtxCurrency} from '@/processes/CurrenciesContext';
import {apiGetBalance, apiGetMarketAssets, apiGetRates} from '@/shared/api';
import {
    actionResSuccess,
    uncoverArray,
    uncoverResponse
} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";
import Decimal from 'decimal.js';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import Loader from "@/shared/ui/loader";
import ETokensConst from "@/shared/config/coins/constants";

export default memo(function ({children}: { children: React.ReactNode }): JSX.Element | null {
    const {refreshKey, account} = useContext(CtxRootData);

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
            setState(prev => ({
                ...prev,
                currencies: new Map<string, ICtxCurrency>()
            }))

            const walletsResponse = await apiGetBalance();
            const eurResponse = await apiGetBalance('EUR');
            const assetsResponse = await apiGetMarketAssets();

            actionResSuccess(walletsResponse)
                .success(() => {
                    actionResSuccess(assetsResponse)
                        .success(() => {
                            setState(prev => ({
                                ...prev,
                                currencies: helperCurrenciesGeneration(
                                    uncoverResponse(assetsResponse),
                                    uncoverResponse(walletsResponse),
                                    uncoverArray(uncoverResponse(eurResponse))
                                )
                            }));
                        }).reject(() => null);
                }).reject(() => null);
        })();

    }, [refreshKey, account]);

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

    return <CtxCurrencies.Provider value={{
        currencies,
        totalAmount
    }}>
        {children}
    </CtxCurrencies.Provider>
});

const totalizeAmount = (list: Map<string, ICtxCurrency>, rates: Record<ETokensConst, number>) => {

    return Array.from(list.values()).filter(item => item.availableBalance !== null).reduce<Decimal>((previousValue: Decimal.Value, currentValue, i, list) => {

        const course = rates[currentValue.$const]
        const value = new Decimal(course).times(currentValue.availableBalance)

        return value.plus(previousValue)

    }, new Decimal(0))

}
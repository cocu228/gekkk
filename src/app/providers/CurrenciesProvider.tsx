import React, {memo, useContext, useEffect, useState} from 'react';
import {CtxRootData} from '@/processes/RootContext';
import {ICtxCurrency} from '@/processes/CurrenciesContext';
import {apiGetBalance, apiGetMarketAssets} from '@/shared/api';
import {
    actionResSuccess,
    uncoverArray,
    uncoverResponse
} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";
import Decimal from 'decimal.js';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import Loader from "@/shared/ui/loader";

export default memo(function ({children}: { children: React.ReactNode }): JSX.Element | null {
    const {refreshKey, account} = useContext(CtxRootData)

    const [{
        currencies,
    }, setState] = useState({
        currencies: new Map<string, ICtxCurrency>()
    })

    useEffect(() => {
        (async function () {
            const walletsResponse = await apiGetBalance();
            const assetsResponse = await apiGetMarketAssets();

            actionResSuccess(walletsResponse)
                .success(() => {
                    actionResSuccess(assetsResponse)
                        .success(() => {
                            setState(prev => ({
                                ...prev,
                                currencies: helperCurrenciesGeneration(
                                    uncoverResponse(assetsResponse),
                                    uncoverResponse(walletsResponse))
                            }));
                        }).reject(() => null);
                }).reject(() => null);
        })();

    }, [refreshKey, account]);

    useEffect(() => {

        (async () => {

            const eurWallet = currencies.get('EUR');

            if (eurWallet) {

                const {data} = await apiGetBalance('EUR');

                const {
                    lock_orders,
                    free_balance,
                    lock_in_balance,
                    lock_out_balance
                } = uncoverArray(data.result);

                currencies.set('EUR', {
                    ...eurWallet,
                    availableBalance: new Decimal(free_balance),
                    lockInBalance: lock_in_balance,
                    lockOutBalance: lock_out_balance,
                    lockOrders: lock_orders
                })
            }
        })();

    }, [currencies]);

    return <CtxCurrencies.Provider value={{currencies}}>
        {currencies.size === 0 ? <Loader/> : children}
    </CtxCurrencies.Provider>
});

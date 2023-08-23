import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useRef, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxRootData, ICtxCurrencyData, ICtxRootData} from '@/processes/RootContext';
import {apiGetBalance, apiGetAccountInfo, apiGetMarketAssets, IAccount, IResponseOrganizations} from '@/shared/api';
import {
    actionResSuccess, getCookieData,
    getFlagsFromMask,
    randomId,
    setCookieData,
    uncoverArray,
    uncoverResponse
} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";
import {storeOrganizations} from "@/shared/store/organizations";
import $axios from "@/shared/lib/(cs)axios";
import Header from "@/widgets/header/ui";
import {maskAccountRights} from '@/shared/config/account-rights';
import {storeInvestTemplates} from '@/shared/store/invest-templates/investTemplates';
import { storeAccounts } from '@/shared/store/accounts/accounts';
import Decimal from 'decimal.js';

export default memo(function () {
    const [{
        account,
        refreshKey,
        currencies,
    }, setState] = useState<Omit<ICtxRootData, "setAccount" | "setRefresh">>({
        account: null,
        refreshKey: "",
        currencies: new Map<string, ICtxCurrencyData>()
    })

    const accounts = storeAccounts(state => state.accounts);
    const getAccounts = storeAccounts(state => state.getAccounts);
    const getOrganizations = storeOrganizations(state => state.getOrganizations);
    const getInvestTemplates = storeInvestTemplates(state => state.getInvestTemplates);

    useEffect(() => {
        (async () => {
            getOrganizations();
            getInvestTemplates();
            await getAccounts();
        })();
    }, []);

    useEffect(() => {
        if (accounts && !account) {
            const cookieData = getCookieData<{accountId?: string}>();
            const activeAccount = accounts.find(a => a.current === true);

            setAccount(cookieData.hasOwnProperty("accountId")
                ? cookieData.accountId
                : activeAccount.number
            );
        }
    }, [accounts]);

    useEffect(() => {
        if (account !== null) {
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
        }
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

    const setRefresh = () => {
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));
    }

    const setAccount = (number: string) => {
        $axios.defaults.headers['AccountId'] = number;
        setCookieData([{key: "accountId", value: number}]);

        setState(prev => ({
            ...prev,
            account: accounts.find(a => a.number === number)
        }));
    }

    return <CtxRootData.Provider value={{
        account,
        currencies,
        setAccount: setAccount,
        setRefresh: setRefresh,
        refreshKey
    }}>
        {(currencies.size === 0 || !account) ? <Loader/> : (<>
            <Header/>

            <Main>
                <Sidebar/>
                <Content>
                    <Outlet/>
                </Content>
            </Main>

        </>)}
    </CtxRootData.Provider>
});

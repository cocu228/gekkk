import { Outlet } from 'react-router';
import Loader from "@/shared/ui/loader";
import Header from "@/widgets/header/ui/";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import { memo, useEffect, useState } from 'react';
import Content from "@/app/layouts/content/Content";
import { apiGetBalance, apiGetMarketAssets } from '@/shared/api';
import { CtxCurrencyData, ICtxCurrencyData } from '../CurrenciesContext';
import { actionResSuccess } from '@/shared/lib/helpers';
import PageProblems from '@/pages/page-problems/PageProblems';

export default memo(function () {
    const [{
        error,
        loading,
        refreshKey,
        listWallets,
        currenciesData,
        listCryptoAssets
    }, setState] = useState({
        error: false,
        loading: true,
        refreshKey: false,
        listWallets: null,
        listCryptoAssets: null,
        currenciesData: new Map<string, ICtxCurrencyData>()
    })

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: !prev.refreshKey
        }));

    const handleError = () =>
        setState(prev => ({
            ...prev,
            error: true
        }));

    useEffect(() => {
        (async function () {

            const walletsRequest = await apiGetBalance();
            const assetsRequest = await apiGetMarketAssets();

            actionResSuccess(walletsRequest)
                .success(() => {
                    actionResSuccess(assetsRequest)
                        .success(() => {
                            setState(prev => ({
                                ...prev,
                                listWallets: walletsRequest.data.result,
                                listCryptoAssets: assetsRequest.data.result
                            }));
                        }).reject(() => handleError());
                }).reject(() => handleError());
        })()
    }, [refreshKey]);

    useEffect(() => {
        if (!(listWallets && listCryptoAssets)) return;

        setState(prev => {
            listCryptoAssets.forEach(asset => {
                const wallet = listWallets.find(w => w.currency === asset.code);

                prev.currenciesData.set(asset.code, new ICtxCurrencyData(asset, wallet));
            });

            return ({
                ...prev,
                loading: false
            });
        });
    }, [listWallets, listCryptoAssets])

    return <CtxCurrencyData.Provider value={{
        currenciesData: currenciesData,
        setRefresh: setRefresh
    }} >
        {error ? <PageProblems code={500} /> : <>
            <Header />

            {loading ? <Loader /> : (
                <Main>
                    <Sidebar />

                    <Content>
                        <Outlet />
                    </Content>
                </Main>
            )}
        </>}
    </CtxCurrencyData.Provider>
});

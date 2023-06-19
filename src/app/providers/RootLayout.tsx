import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Header from "@/widgets/header/ui/";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {apiGetBalance, apiGetInfoClient, apiGetMarketAssets} from '@/shared/api';
import {CtxCurrencyData, ICtxCurrencyData} from '../CurrenciesContext';
import {actionResSuccess, randomId} from '@/shared/lib/helpers';

export default memo(function () {
    const [{
        refreshKey,
        currencies,
    }, setState] = useState({
        refreshKey: "",
        currencies: new Map<string, ICtxCurrencyData>()
    })

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));

    useEffect(() => {
        (async function () {

            // const infoClient = await apiGetInfoClient();
            const walletsRequest = await apiGetBalance();
            const assetsRequest = await apiGetMarketAssets();

            // console.log(infoClient)

            actionResSuccess(walletsRequest)
                .success(() => {
                    actionResSuccess(assetsRequest)
                        .success(() => {
                            setState(prev => {

                                let currencies = prev.currencies

                                assetsRequest.data.result.forEach(asset => {
                                    const walletInfo = walletsRequest.data.result.find(wallet => asset.code === wallet.currency)
                                    currencies.set(asset.code, new ICtxCurrencyData(asset, walletInfo))
                                })

                                return {
                                    ...prev,
                                    loading: false,
                                    currencies
                                }
                            });
                        }).reject(() => null);
                }).reject(() => null);
        })()
    }, [refreshKey]);

    return <CtxCurrencyData.Provider value={{
        currencies,
        setRefresh: setRefresh,
        refreshKey
    }}>
        <>
            <Header/>
            {currencies.size === 0 ? <Loader/> : (
                <Main>
                    <Sidebar/>

                    <Content>
                        <Outlet/>
                    </Content>
                </Main>
            )}
        </>
    </CtxCurrencyData.Provider>
});

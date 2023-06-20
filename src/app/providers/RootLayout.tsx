import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Header from "@/widgets/header/ui/";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {apiGetBalance, apiGetMarketAssets} from '@/shared/api';
import {CtxCurrencyData, ICtxCurrencyData} from '../CurrenciesContext';
import {actionResSuccess, randomId, uncoverResponse} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";

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
        })()
    }, [refreshKey]);


    useEffect(() => {

        (async function () {
            // const infoClient = await apiGetInfoClient();
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

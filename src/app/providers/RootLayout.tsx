import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Header from "@/widgets/header/ui/";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {apiGetBalance, apiGetInfoClient, apiGetMarketAssets, apiOrganizations} from '@/shared/api';
import {CtxRootData, ICtxCurrencyData} from '../RootContext';
import {actionResSuccess, randomId, uncoverResponse} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";

export default memo(function () {
    const [{
        person: account,
        refreshKey,
        currencies,
    }, setState] = useState({
        refreshKey: "",
        person: null,
        currencies: new Map<string, ICtxCurrencyData>()
    })

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));

    const setPerson = ({id, name, type}) =>
        setState(prev => ({
            ...prev,
            person: {
                id,
                type,
                name
            }
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
        (async () => {
            const response = await apiOrganizations()
            console.log(response)
            console.log("wait resInfoClient")
            const resInfoClient = await apiGetInfoClient(response.data[0].accounts[0].id)
            console.log(response.data[0].accounts[0].id)
            console.log("resInfoClient ready")
            console.log(resInfoClient)
        })()
    }, [])


    return <CtxRootData.Provider value={{
        currencies,
        account,
        setPerson: setPerson,
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
    </CtxRootData.Provider>
});

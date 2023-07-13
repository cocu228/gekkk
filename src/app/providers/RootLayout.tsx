import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useRef, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxRootData, ICtxCurrencyData} from '@/processes/RootContext';
import {apiGetBalance, apiGetInfoClient, apiGetMarketAssets} from '@/shared/api';
import {actionResSuccess, randomId, uncoverResponse} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";
import {storeOrganizations} from "@/shared/store/organizations";
import $axios from "@/shared/lib/(cs)axios";
import Header from "@/widgets/header/ui";

export default memo(function () {

    const [{
        account,
        refreshKey,
        currencies,
    }, setState] = useState({
        refreshKey: "",
        account: {
            id: null,
            rights: null
        },
        currencies: new Map<string, ICtxCurrencyData>()
    })

    const prevAccountRef = useRef<null | string>(null);

    const getOrganizations = storeOrganizations(state => state.getOrganizations);
    const organizations = storeOrganizations(state => state.organizations);


    useEffect(() => {
        (async () => {
            await getOrganizations()
        })()
    }, [])


    const getInfoClient = async (id) => {

        $axios.defaults.headers['accountId'] = id;

        const response = await apiGetInfoClient()

        actionResSuccess(response).success(() => {
            setState(prev =>
                ({...prev, account: {id: id, rights: uncoverResponse(response).flags}}))
        })
    }


    useEffect(() => {

        (async () => {
            if (organizations && account.id === null) {
                await getInfoClient(organizations.accounts[0].number)
            } else if (prevAccountRef.current !== null && prevAccountRef.current !== account.id) {
                await getInfoClient(account.id)
            }
        })()

        prevAccountRef.current = account.id

    }, [account.id, organizations])


    useEffect(() => {

        if (account.id) {

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
        }

    }, [refreshKey, account.id]);

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));

    const setAccount = (id: null | string) =>
        setState(prev => ({
            ...prev,
            account: {id: id, rights: null}
        }));


    return <CtxRootData.Provider value={{
        currencies,
        account,
        setAccount: setAccount,
        setRefresh: setRefresh,
        refreshKey
    }}>
        {currencies.size === 0 ? <Loader/> : (<>
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

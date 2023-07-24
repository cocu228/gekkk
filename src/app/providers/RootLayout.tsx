import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useRef, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxRootData, ICtxCurrencyData} from '@/processes/RootContext';
import {apiGetBalance, apiGetInfoClient, apiGetMarketAssets} from '@/shared/api';
import {actionResSuccess, getFlagsFromMask, randomId, uncoverArray, uncoverResponse} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";
import {storeOrganizations} from "@/shared/store/organizations";
import $axios from "@/shared/lib/(cs)axios";
import Header from "@/widgets/header/ui";
import {maskAccountRights} from '@/shared/config/account-rights';

export default memo(function () {

    const [{
        account,
        refreshKey,
        currencies,
    }, setState] = useState({
        refreshKey: "",
        account: {
            id: null,
            number: null,
            client: null,
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


    const getInfoClient = async (number: null | string, id: null | string, client: null | string) => {

        $axios.defaults.headers['AccountId'] = number;

        const response = await apiGetInfoClient()

        actionResSuccess(response).success(() => {
            setState(prev =>
                ({
                    ...prev,
                    account:
                    {
                        ...prev.account,
                        id,
                        client,
                        number,
                        rights: getFlagsFromMask(uncoverResponse(response).flags, maskAccountRights)
                    }
                })
            )
        })
    }


    useEffect(() => {

        (async () => {
            if (organizations && account.number === null) {
                await getInfoClient(
                    uncoverArray(organizations.accounts).number,
                    uncoverArray(organizations.accounts).id,
                    uncoverArray(organizations.accounts).clientId)
            } else if (prevAccountRef.current !== null && prevAccountRef.current !== account.number) {
                await getInfoClient(
                    account.number,
                    account.id,
                    account.client,
                )
            }
        })()

        prevAccountRef.current = account.number

    }, [account.number, organizations])


    useEffect(() => {

        if (account.number) {
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

    }, [refreshKey, account.number]);

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));

    const setAccount = (number: null | string, id: null | string, client: null | string) => {
        setState(prev => {
            if (prev.account.number === number) return prev;

            return ({
                ...prev,
                account: {number, id, client, rights: null}
            })
        });
    }


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

import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxRootData, ICtxAccount, ICtxCurrencyData} from '@/processes/RootContext';
import {apiGetBalance, apiGetInfoClient, apiGetMarketAssets} from '@/shared/api';
import {actionResSuccess, randomId, uncoverResponse} from '@/shared/lib/helpers';
import helperCurrenciesGeneration from "@/shared/lib/helperCurrenciesGeneration";
import {storeOrganizations} from "@/shared/store/organizations";
import $axios from "@/shared/lib/(cs)axios";

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

    const getOrganizations = storeOrganizations(state => state.getOrganizations);
    const organizations = storeOrganizations(state => state.organizations);


    useEffect(() => {
        (async () => {
            await getOrganizations()
        })()
    }, [])


    useEffect(() => {
        if (account.id !== null) {
            (async () => {
                const response = await apiGetInfoClient(account.id)
                actionResSuccess(response).success(() => {
                    setState(prev =>
                        ({...prev, account: {id: prev.account.id, rights: uncoverResponse(response).flags}}))
                })

                $axios.defaults.headers['accountId'] = account.id;

            })()
        } else if (organizations) {
            (async () => {
                console.log(organizations.accounts[0].number)
                console.log("organizations.accounts[0].number")
                const response = await apiGetInfoClient(organizations.accounts[0].number)

                actionResSuccess(response).success(() => {
                    setState(prev =>
                        ({...prev, account: {id: organizations.accounts[0].number, rights: uncoverResponse(response).flags}}))
                })

                $axios.defaults.headers['accountId'] = organizations.accounts[0].number;

            })()
        }

    }, [account.id, organizations])


    useEffect(() => {
        console.log(account.id)
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

            //
            // console.log(account.id)
            // console.log("account.id")

        }

    }, [refreshKey, account.id]);

    console.log("state")
    console.log(account)

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));

    const setAccount = (account: ICtxAccount) =>
        setState(prev => ({
            ...prev,
            account: account
        }));


    return <CtxRootData.Provider value={{
        currencies,
        account,
        setAccount: setAccount,
        setRefresh: setRefresh,
        refreshKey
    }}>
        <>
            {/*<Header/>*/}
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

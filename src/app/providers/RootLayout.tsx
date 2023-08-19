import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useRef, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxRootData, ICtxCurrencyData, ICtxRootData} from '@/processes/RootContext';
import {apiGetBalance, apiGetInfoClient, apiGetMarketAssets, IAccount, IResponseOrganizations} from '@/shared/api';
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

export default memo(function () {

    const [{
        account,
        refreshKey,
        currencies,
    }, setState] = useState<Omit<ICtxRootData, "setAccount" | "setRefresh">>({
        refreshKey: "",
        account: {
            id: null,
            idInfoClient: null,
            number: null,
            client: null,
            rights: null
        },
        currencies: new Map<string, ICtxCurrencyData>()
    })

    const prevAccountRef = useRef<null | IResponseOrganizations["accounts"][0]["number"]>(null);

    const getOrganizations = storeOrganizations(state => state.getOrganizations);
    const getInvestTemplates = storeInvestTemplates(state => state.getInvestTemplates);
    const organizations = storeOrganizations(state => state.organizations);


    useEffect(() => {
        (async () => {
            await getOrganizations();
        })();
    }, []);


    const getInfoClient = async (
        number: IResponseOrganizations["accounts"][0]["number"],
        id: IResponseOrganizations["accounts"][0]["id"],
        client: IResponseOrganizations["accounts"][0]["clientId"]
    ) => {

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
                        idInfoClient: uncoverResponse(response).id,
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
                const cookieData = getCookieData<{
                    accountId?: string
                    phone: string
                    token: string
                    tokenHeaderName: string
                    username: string
                }>()

                if (cookieData.hasOwnProperty("accountId")) {

                    const account: IAccount = organizations.accounts.find(it => it.number === cookieData.accountId) ||
                        uncoverArray(organizations.accounts)

                    await getInfoClient(
                        account.number,
                        account.id,
                        account.clientId)


                } else {
                    await getInfoClient(
                        uncoverArray(organizations.accounts).number,
                        uncoverArray(organizations.accounts).id,
                        uncoverArray(organizations.accounts).clientId)
                }



            } else if (prevAccountRef.current !== null && prevAccountRef.current !== account.number) {
                setCookieData([{key: "accountId", value: account.number}])
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

        if (account.number && organizations) {
            (async function () {
                await getInvestTemplates();
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
                                        uncoverResponse(walletsResponse),
                                        account.number,
                                        organizations)
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
        if (prevAccountRef.current !== number) {

            setState(prev => ({
                ...prev,
                account: {number, id, client, rights: null, idInfoClient: null}
            }));
        }
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

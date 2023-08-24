import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {memo, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxRootData, ICtxRootData} from '@/processes/RootContext';
import {
    getCookieData,
    randomId,
    setCookieData,
} from '@/shared/lib/helpers';
import {storeOrganizations} from "@/shared/store/organizations";
import $axios from "@/shared/lib/(cs)axios";
import Header from "@/widgets/header/ui";
import {storeInvestTemplates} from '@/shared/store/invest-templates/investTemplates';
import { storeAccounts } from '@/shared/store/accounts/accounts';
import CurrenciesProvider from "@/app/providers/CurrenciesProvider";

export default memo(function () {
    const [{
        account,
        refreshKey,

    }, setState] = useState<Omit<ICtxRootData, "setAccount" | "setRefresh">>({
        account: null,
        refreshKey: "",
    })

    const accounts = storeAccounts(state => state.accounts);
    const getOrganizations = storeOrganizations(state => state.getOrganizations);
    const getInvestTemplates = storeInvestTemplates(state => state.getInvestTemplates);
    const getAccounts = storeAccounts(state => state.getAccounts);

    useEffect(() => {
        (async () => {
            await getOrganizations();
            await getAccounts();
            await getInvestTemplates();
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
        setAccount: setAccount,
        setRefresh: setRefresh,
        refreshKey
    }}>
        {!account ? <Loader/> : (<>
            <CurrenciesProvider>
                <>
                    <Header/>

                    <Main>
                        <Sidebar/>
                <Content>
                    <Outlet/>
                </Content>
                    </Main>
                </>
            </CurrenciesProvider>
        </>)}
    </CtxRootData.Provider>
});

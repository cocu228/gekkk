import {Outlet} from 'react-router';
import Header from "@/widgets/header/ui";
import Main from "@/app/layouts/main/Main";
import Sidebar from "@/widgets/sidebar/ui/";
import {$axios} from "@/shared/lib/(orval)axios";
import {useLocation, useMatch} from 'react-router-dom';
import {memo, useContext, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {storeAccounts} from '@/shared/store/accounts/accounts';
import {CtxRootData, ICtxRootData} from '@/processes/RootContext';
import CurrenciesProvider from "@/app/providers/CurrenciesProvider";
import {getCookieData, randomId, setCookieData} from '@/shared/lib/helpers';
import {BottomMenu} from '@/widgets/bottom-mobile/ui/BottomMenu';
import {BreakpointsContext} from './BreakpointsProvider';
// import {useAuth} from "@/app/providers/AuthRouter";
import {apiGetInfo} from "@/shared/(orval)api/gek";

export default memo(function () {
    // const {logout} = useAuth();
    const location = useLocation();
    const isNewLayout = location.pathname.startsWith('/new');
    const {md} = useContext(BreakpointsContext);
    const homePage = useMatch("/")
    const dashboardPage = useMatch("")
    const isHomePage = !!homePage || !!dashboardPage
    const [{
        account,
        refreshKey
    }, setState] = useState<Omit<ICtxRootData, "setAccount" | "setRefresh">>({
        account: null,
        refreshKey: ""
    })

    const {accounts, setAccounts} = storeAccounts(state => state);

    // TODO: move handler to ErrorsProvider.tsx
    useEffect(() => {
        (async () => {
            try {
                const {data} = await apiGetInfo({refresh: false});
                
                setAccounts(data.result);
            }
            catch (AxiosError) {
                // logout();
            }
        })();
    }, []);

    useEffect(() => {
        if (accounts && !account) {
            const cookieData = getCookieData<{ accountId?: string }>();
            const activeAccount = accounts.find(a => a.current) ?? accounts[0];

            console.log(accounts[0].number)
            setAccount(cookieData.hasOwnProperty("accountId")
                ? cookieData.accountId
                : activeAccount.number
            );

            setRefresh()
        }
    }, [accounts]);

    const setRefresh = () => {
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));
    }

    const setAccount = (number: string) => {
        console.log(`Selected account: ${number}`);
        
        $axios.defaults.headers['AccountId'] = number;
        setCookieData([{key: "accountId", value: number}]);
        setState(prev => ({
            ...prev,
            account: accounts?.find(a => a.number === number)
        }));
    }

    return (
        <CtxRootData.Provider value={{
            account,
            setAccount: setAccount,
            setRefresh: setRefresh,
            refreshKey
        }}>
            {(<>
                <CurrenciesProvider>
                    {isNewLayout ? <>
                        <Outlet/>
                    </> : <>

                        <Header/>

                        <Main>
                            {md ?
                                (isHomePage ?
                                        <>
                                            <Sidebar/>

                                        </>
                                        :
                                        <>
                                            <Content>
                                                <Outlet/>
                                            </Content>

                                        </>
                                )
                                :
                                (<>
                                        <Sidebar/>

                                        <Content>
                                            <Outlet/>
                                        </Content>
                                    </>
                                )
                            }
                        </Main>
                        {md && <BottomMenu/>}
                    </>}
                </CurrenciesProvider>
            </>)
            }
        </CtxRootData.Provider>
    )
});

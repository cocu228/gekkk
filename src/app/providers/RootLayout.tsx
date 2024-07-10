import {Outlet} from "react-router";
import Header from "@/widgets/header/ui";
import Main from "@/app/layouts/main/Main";
//@ts-ignore
import Sidebar from "@VAR/widgets/{{mode-}}sidebar/ui/index.tsx";
import {$axios} from "@/shared/lib/(orval)axios";
import {useLocation, useMatch} from "react-router-dom";
import {memo, useContext, useEffect, useState} from "react";
//@ts-ignore
import Content from "@VAR/app/layouts/content/{{MODE}}Content.tsx";
import {storeAccounts} from "@/shared/store/accounts/accounts";
import {CtxRootData, ICtxRootData} from "@/processes/RootContext";
import CurrenciesProvider from "@/app/providers/CurrenciesProvider";
import {getCookieData, randomId, setCookieData} from "@/shared/lib/helpers";
import {BottomMenu} from "@/widgets/bottom-mobile/ui/BottomMenu";
import {BreakpointsContext} from "./BreakpointsProvider";
// import {useAuth} from "@/app/providers/AuthRouter";
import {apiGetInfo} from "@/shared/(orval)api/gek";
import SystemNotifications from "./SystemNotifications";
import ReactPullToRefresh from "react-simple-pull-to-refresh";
import {IconApp} from "@/shared/ui/icons/icon-app";
import { CopyModal } from "@/shared/ui/copyModal/CopyModal";

export default memo(function () {
    // const {logout} = useAuth();
    const location = useLocation();
    const isNewLayout = location.pathname.startsWith("/new");
    const {md} = useContext(BreakpointsContext);
    const homePage = useMatch("/");
    const dashboardPage = useMatch("");
    const isHomePage = !!homePage || !!dashboardPage;
    const [{account, refreshKey}, setState] = useState<
        Omit<ICtxRootData, "setAccount" | "setRefresh">
    >({
        account: null,
        refreshKey: "",
    });

    const {accounts, setAccounts} = storeAccounts((state) => state);

    // TODO: move handler to ErrorsProvider.tsx
    useEffect(() => {
        (async () => {
            try {
                const {data} = await apiGetInfo({refresh: false});
                setAccounts(data.result);
            } catch (AxiosError) {
                // logout();
            }
        })();
    }, []);


    useEffect(() => {
        if (accounts && !account) {
            const cookieData = getCookieData<{ accountId?: string }>();
            const activeAccount = accounts.find((a) => a.current) ?? accounts[0];

            setAccount(
                cookieData.hasOwnProperty("accountId")
                    ? cookieData.accountId
                    : activeAccount.number
            );

            setRefresh();
        }
    }, [accounts]);

    const setRefresh = () => {
        setState((prev) => ({
            ...prev,
            refreshKey: randomId(),
        }));
    };

    const setAccount = (number: string) => {
        $axios.defaults.headers["AccountId"] = number;
        setCookieData([{key: "accountId", value: number}]);
        setState((prev) => ({
            ...prev,
            account: accounts?.find((a) => a.number === number),
        }));
    };

    //   const { setRefresh } = useContext(CtxRootData);

    const handleRefresh = async () => {
        setRefresh();
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
        <CtxRootData.Provider value={{ account, refreshKey, setAccount, setRefresh }}>
            <SystemNotifications>
                <CurrenciesProvider>
                    {isNewLayout ? (
                        <Outlet/>
                    ) : (
                        <>
                            <Header/>
                             <CopyModal />
                            {md ? (
                                <ReactPullToRefresh
                                    canFetchMore
                                    pullDownThreshold={50}
                                    maxPullDownDistance={75}
                                    onRefresh={handleRefresh}
                                    refreshingContent={
                                        <IconApp code="t01" color="#29354C" size={20}/>
                                    }
                                >
                                    <Main>
                                        {isHomePage ? (
                                            <>
                                                <Sidebar/>
                                            </>
                                        ) : (
                                            <Content>
                                                <Outlet/>
                                            </Content>
                                        )}
                                    </Main>
                                </ReactPullToRefresh>
                            ) : (
                                <Main>
                                    <Sidebar/>
                                    <Content>
                                        <Outlet/>
                                    </Content>
                                </Main>
                            )}
                            {md && <BottomMenu />}
                        </>
                    )}
                </CurrenciesProvider>
            </SystemNotifications>
        </CtxRootData.Provider>
    );
});

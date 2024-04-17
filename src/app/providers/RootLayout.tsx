import { Outlet } from "react-router";
import Header from "@/widgets/header/ui";
import Main from "@/app/layouts/main/Main";
//@ts-ignore
import Sidebar from "@VAR/widgets/{{MODE}}sidebar/ui/index.tsx";
import { $axios } from "@/shared/lib/(orval)axios";
import { useLocation, useMatch } from "react-router-dom";
import { memo, useContext, useEffect, useState } from "react";
import Content from "@/app/layouts/content/Content";
import { storeAccounts } from "@/shared/store/accounts/accounts";
import { CtxRootData, ICtxRootData } from "@/processes/RootContext";
import CurrenciesProvider from "@/app/providers/CurrenciesProvider";
import { getCookieData, randomId, setCookieData } from "@/shared/lib/helpers";
import { BottomMenu } from "@/widgets/bottom-mobile/ui/BottomMenu";
import { BreakpointsContext } from "./BreakpointsProvider";
// import {useAuth} from "@/app/providers/AuthRouter";
import { apiGetInfo } from "@/shared/(orval)api/gek";
import SystemNotifications from "./SystemNotifications";
import ReactPullToRefresh from "react-simple-pull-to-refresh";

export default memo(function () {
  // const {logout} = useAuth();
  const location = useLocation();
  const isNewLayout = location.pathname.startsWith("/new");
  const { md } = useContext(BreakpointsContext);
  const homePage = useMatch("/");
  const dashboardPage = useMatch("");
  const isHomePage = !!homePage || !!dashboardPage;
  const [{ account, refreshKey }, setState] = useState<
    Omit<ICtxRootData, "setAccount" | "setRefresh">
  >({
    account: null,
    refreshKey: "",
  });

  const { accounts, setAccounts } = storeAccounts((state) => state);

  // TODO: move handler to ErrorsProvider.tsx
  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiGetInfo({ refresh: false });

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
    setCookieData([{ key: "accountId", value: number }]);
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
    <CtxRootData.Provider
      value={{
        account,
        setAccount: setAccount,
        setRefresh: setRefresh,
        refreshKey,
      }}
    >
      {
        <SystemNotifications>
          <CurrenciesProvider>
            {isNewLayout ? (
              <>
                <Outlet />
              </>
            ) : (
              <>
                <Header />
                {md ? (
                  <ReactPullToRefresh
                    canFetchMore
                    pullDownThreshold={50}
                    maxPullDownDistance={75}
                    onRefresh={handleRefresh}
                    refreshingContent={
                        <svg width={20} height={20} fill="none" stroke="#29354C"
                          viewBox="0 0 24 24" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                    }
                  >
                    <Main>
                      {md ? (
                        isHomePage ? (
                          <>
                            <Sidebar />
                          </>
                        ) : (
                          <>
                            <Content>
                              <Outlet />
                            </Content>
                          </>
                        )
                      ) : (
                        <>
                          <Sidebar />

                          <Content>
                            <Outlet />
                          </Content>
                        </>
                      )}
                    </Main>
                  </ReactPullToRefresh>
                ) : (
                  <Main>
                    {md ? (
                      isHomePage ? (
                        <>
                          <Sidebar />
                        </>
                      ) : (
                        <>
                          <Content>
                            <Outlet />
                          </Content>
                        </>
                      )
                    ) : (
                      <>
                        <Sidebar />

                        <Content>
                          <Outlet />
                        </Content>
                      </>
                    )}
                  </Main>
                )}

                {md && <BottomMenu />}
              </>
            )}
          </CurrenciesProvider>
        </SystemNotifications>
      }
    </CtxRootData.Provider>
  );
});

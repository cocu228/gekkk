import { memo, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useLocation, useMatch } from "react-router-dom";
import ReactPullToRefresh from "react-simple-pull-to-refresh";
// @ts-ignore
// eslint-disable-next-line import/extensions
import Sidebar from "@VAR/widgets/{{mode-}}sidebar/ui/index.tsx";
// @ts-ignore
// eslint-disable-next-line import/extensions
import Content from "@VAR/app/layouts/content/{{MODE}}Content.tsx";

import Header from "@/widgets/header/ui";
import Main from "@/app/layouts/main/Main";
import { $axios } from "@/shared/lib/(orval)axios";
import { storeAccounts } from "@/shared/store/accounts/accounts";
import { CtxRootData, ICtxRootData } from "@/processes/RootContext";
import CurrenciesProvider from "@/app/providers/CurrenciesProvider";
import { getCookieData, randomId, setCookieData } from "@/shared/lib/helpers";
import { BottomMenu } from "@/widgets/bottom-mobile/ui/BottomMenu";
import { apiGetInfo } from "@/shared/(orval)api/gek";
import { IconApp } from "@/shared/ui/icons/icon-app";
import ActionConfirmationWindow from "@/widgets/action-confirmation-window/ui/ActionConfirmationWindow";
import { CopyModal } from "@/shared/ui/copyModal/CopyModal";

import { BreakpointsContext } from "./BreakpointsProvider";
// import {useAuth} from "@/app/providers/AuthRouter";
import SystemNotifications from "./SystemNotifications";

export default memo(function () {
  // const {logout} = useAuth();
  const location = useLocation();
  const isNewLayout = location.pathname.startsWith("/new");
  const { md } = useContext(BreakpointsContext);
  const homePage = useMatch("/");
  const dashboardPage = useMatch("");
  const isHomePage = !!homePage || !!dashboardPage;
  const [{ account, refreshKey }, setState] = useState<Omit<ICtxRootData, "setAccount" | "setRefresh">>({
    account: null,
    refreshKey: ""
  });

  const { accounts, setAccounts } = storeAccounts(state => state);

  const setAccount = (number: string) => {
    $axios.defaults.headers.AccountId = number;
    setCookieData([{ key: "accountId", value: number }]);
    setState(prev => ({
      ...prev,
      account: accounts?.find(a => a.number === number)
    }));
  };

  const setRefresh = () => {
    setState(prev => ({
      ...prev,
      refreshKey: randomId()
    }));
  };

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
      const activeAccount = accounts.find(a => a.current) ?? accounts[0];

      setAccount(cookieData.hasOwnProperty("accountId") ? cookieData.accountId : activeAccount.number);

      setRefresh();
    }
  }, [accounts]);

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
            <Outlet />
          ) : (
            <>
              <Header />
              <CopyModal />
              {md ? (
                <ReactPullToRefresh
                  canFetchMore
                  pullDownThreshold={50}
                  maxPullDownDistance={75}
                  onRefresh={handleRefresh}
                  refreshingContent={<IconApp code='t01' color='#29354C' size={20} />}
                >
                  <Main>
                    {md ? (
                      <>
                        <ActionConfirmationWindow />
                        {isHomePage ? (
                          <Sidebar />
                        ) : (
                          <Content>
                            <Outlet />
                          </Content>
                        )}
                      </>
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
                      <Sidebar />
                    ) : (
                      <Content>
                        <Outlet />
                      </Content>
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
    </CtxRootData.Provider>
  );
});

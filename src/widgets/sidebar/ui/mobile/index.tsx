import styles from "./style.module.scss";
import { scrollToTop } from "@/shared/lib/helpers";
import { CtxRootData } from "@/processes/RootContext";
import { storyToggleSidebar } from "../../model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useCallback, useContext, useEffect, useRef } from "react";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import BalanceBar from "../BalanceBar";
import PendingTransactions from "@/widgets/pending-transactions";

const SidebarMobile = () => {
  const { account } = useContext(CtxRootData);
  const refreshCont = useRef<HTMLDivElement>();
  const { sm, md } = useContext(BreakpointsContext);
  const { currencies } = useContext(CtxCurrencies);
  const { getActiveCards } = storeActiveCards((state) => state);
  const { getRoomsList } = storeListExchangeRooms((state) => state);
  const toggleSidebar = useRef(storyToggleSidebar((state) => state.toggle));

  const NavLinkEvent = useCallback(() => {
    scrollToTop();
    return sm || md ? toggleSidebar.current(false) : null;
  }, [sm, md]);

  useEffect(() => {
    if (account) {
      getRoomsList();
      getActiveCards();
    }
  }, [account]);

  let eurWallet: ICtxCurrency = null;
  let eurgWallet: ICtxCurrency = null;
  let gkeWallet: ICtxCurrency = null;
  let secondaryWallets: ICtxCurrency[] = [];

  if (currencies !== null) {
    eurWallet = currencies.get("EUR");
    eurgWallet = currencies.get("EURG");
    gkeWallet = currencies.get("GKE");
    secondaryWallets = Array.from(currencies.values());
  }

  return (
    <div id="sidebar" className={`${styles.Sidebar} flex flex-col`}>
      {Notification?.permission !== 'granted' ? null : <>
        <UnconfirmedTransactions/>
        <PendingTransactions/>
      </>}

      <div className="flex flex-col" ref={refreshCont} >
        <BalanceBar NavLinkEvent={NavLinkEvent} />
      </div>
    </div>
  );
};

export default SidebarMobile;

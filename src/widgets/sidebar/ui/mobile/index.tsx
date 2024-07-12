import { useCallback, useContext, useEffect, useRef } from "react";

import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { CtxRootData } from "@/processes/RootContext";
import { scrollToTop } from "@/shared/lib/helpers";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import PendingTransactions from "@/widgets/pending-transactions";
import { IS_GEKKARD_APP } from "@/shared/lib";

import { storyToggleSidebar } from "../../model/story";
import BalanceBar from "../BalanceBar";
import styles from "./style.module.scss";

const SidebarMobile = () => {
  const { account } = useContext(CtxRootData);
  const refreshCont = useRef<HTMLDivElement>();
  const { sm, md } = useContext(BreakpointsContext);
  const { currencies } = useContext(CtxCurrencies);
  const { getActiveCards } = storeActiveCards(state => state);
  const { getRoomsList } = storeListExchangeRooms(state => state);
  const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));

  const NavLinkEvent = useCallback(() => {
    scrollToTop();
    return sm || md ? toggleSidebar.current(false) : null;
  }, [sm, md]);

  useEffect(() => {
    if (account && IS_GEKKARD_APP()) {
      getRoomsList();
      getActiveCards();
    }
  }, [account]);

  // let eurWallet: ICtxCurrency = null;
  // let eurgWallet: ICtxCurrency = null;
  // let gkeWallet: ICtxCurrency = null;
  // let secondaryWallets: ICtxCurrency[] = [];

  if (currencies !== null) {
    // eurWallet = currencies.get("EUR");
    // eurgWallet = currencies.get("EURG");
    // gkeWallet = currencies.get("GKE");
    // secondaryWallets = Array.from(currencies.values());
  }

  return (
    <div id='sidebar' className={`${styles.Sidebar} flex flex-col`}>
      <UnconfirmedTransactions />
      {IS_GEKKARD_APP() && <PendingTransactions />}

      <div className='flex flex-col' ref={refreshCont}>
        <BalanceBar NavLinkEvent={NavLinkEvent} />
      </div>
    </div>
  );
};

export default SidebarMobile;

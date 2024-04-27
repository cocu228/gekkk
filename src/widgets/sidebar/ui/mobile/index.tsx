import styles from "./style.module.scss";
import {
  getCookieData,
  pull,
  pullStart,
  scrollToTop,
} from "@/shared/lib/helpers";
import { CtxRootData } from "@/processes/RootContext";
import { NavLink, useNavigate } from "react-router-dom";
import { helperFilterList } from "@/widgets/sidebar/model/helpers";
import { storyToggleSidebar } from "../../model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { ParentClassForCoin, IconCoin } from "@/shared/ui/icons/icon-coin";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { useTranslation } from "react-i18next";
import BankCardsCarousel from "@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import NewBankCard from "@/widgets/dashboard/ui/cards/bank-card/NewBankCard";
import { Carousel } from "antd";
import {
  toLocaleCryptoRounding,
  toLocaleFiatRounding,
} from "@/shared/lib/number-format-helper";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import { IconApp } from "@/shared/ui/icons/icon-app";
import TokenBar from "../TokenBar";
import BalanceBar from "../BalanceBar";

const SidebarMobile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { account } = useContext(CtxRootData);
  const refreshCont = useRef<HTMLDivElement>();
  const { setRefresh } = useContext(CtxRootData);
  const { sm, md } = useContext(BreakpointsContext);
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number>();
  const isOpen = storyToggleSidebar((state) => state.isOpen);
  const { currencies, totalAmount } = useContext(CtxCurrencies);
  const toggleSidebar = useRef(storyToggleSidebar((state) => state.toggle));
  const [isRefreshingFunds, setIsRefreshingFunds] = useState<boolean>(false);
  const { notificationsEnabled } = getCookieData<{
    notificationsEnabled: string;
  }>();

  const { getRoomsList } = storeListExchangeRooms((state) => state);
  const {
    activeCards,
    loading: cardsLoading,
    getActiveCards,
  } = storeActiveCards((state) => state);

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

  // const initLoading = () => {
  //     refreshCont.current?.classList.add(styles.Loading);
  //     setRefresh()
  //     setIsRefreshingFunds(true)
  //     setTimeout(() => {
  //         setIsRefreshingFunds(false)
  //     }, 3000);
  // };

  // function endPull() {
  //     setStartPoint(0);
  //     setPullChange(0);
  //     if (pullChange > 220) initLoading();
  // }

  // useEffect(() => {
  //     window.addEventListener("touchstart", (e) => { pullStart(e, setStartPoint) });
  //     window.addEventListener("touchmove", (e) => { pull(e, setPullChange, startPoint) });
  //     window.addEventListener("touchend", endPull);
  //     return () => {
  //         window.removeEventListener("touchstart", (e) => { pullStart(e, setStartPoint) });
  //         window.removeEventListener("touchmove", (e) => { pull(e, setPullChange, startPoint) });
  //         window.removeEventListener("touchend", endPull);
  //     };
  // });'

  return (
    <div id="sidebar" className={`${styles.Sidebar} flex flex-col`}>
      {notificationsEnabled !== "true" ? null : <UnconfirmedTransactions />}

      <div className="flex flex-col" ref={refreshCont} >
        <BalanceBar NavLinkEvent={NavLinkEvent} />
      </div>
    </div>
  );
};

export default SidebarMobile;

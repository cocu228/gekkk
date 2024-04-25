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
import { TokenBar } from "../TokenBar";

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

        <div className="flex flex-col"
          ref={refreshCont} >
          <div
            className="flex justify-center">
            <div className={styles.CardInfo}>
              {cardsLoading ? (
                <div className="mb-[14px]">
                  <SkeletonCard />
                </div>
              ) : !activeCards ? null : activeCards?.length === 0 ? (
                <Carousel>
                  <div onClick={() => navigate("/card-menu")}>
                    <NewBankCard />
                  </div>
                </Carousel>
              ) : (
                <div onClick={() => navigate("/card-menu")}>
                  <BankCardsCarousel cards={activeCards} />
                </div>
              )}
            </div>
          </div>
          <NavLink onClick={NavLinkEvent} to={"wallet?currency=EUR"}>
            <div className={styles.AssetInfo1}>
              <span>{t("fiat")}</span>
            </div>

            <div className={styles.ItemWrapper}>
              <div className={`${styles.ItemEuro}`}>
                <div className="col flex items-center pl-4">
                  <IconCoin code="EUR" />
                </div>
                <div className="col flex items-center flex-col pl-5 pt-2 relative">
                  <div className="row w-full">
                    <span className={styles.Name}>Euro</span>
                  </div>
                  <div className="row w-full font-mono">
                    <span className={styles.Sum}>
                      {(eurWallet?.balance &&
                        toLocaleFiatRounding(eurWallet.balance.user_balance)) ??
                        "-"}{" "}
                      €
                    </span>
                  </div>
                </div>
                <div className={styles.ArrowMobileSidebar}>
                  <IconApp code="t08" size={11} color="#285E69" />
                </div>
              </div>
            </div>
          </NavLink>
          <div className={styles.AssetInfo1}>
            <span>{t("crypto_assets.title")}</span>
          </div>
          <NavLink
            className={!currencies ? "disabled" : ""}
            onClick={NavLinkEvent}
            to={!currencies ? "" : "wallet?currency=EURG"}
          >
            <div className={styles.ItemWrapper}>
              <div className={`${styles.Item}`}>
                <div className="col flex items-center pl-4">
                  <IconCoin code="EURG" />
                </div>
                <div className="col flex items-center justify-center flex-col pl-5">
                  <div className="row text-gray-400 w-full mb-1">
                    <span className={styles.Name}>Gekkoin euro token</span>
                  </div>
                  <div className="row w-full font-mono">
                    <span className={styles.Sum}>
                      {(eurgWallet?.balance &&
                        toLocaleFiatRounding(
                          eurgWallet.balance.user_balance
                        )) ??
                        "-"}{" "}
                      EURG
                    </span>
                  </div>
                  {eurgWallet && (
                    <div className={"row w-full flex justify-between pr-5"}>
                      <div>
                        {!eurgWallet.balance?.lock_in_balance ? null : (
                          <span className={styles.Income}>
                            +
                            {toLocaleFiatRounding(
                              eurgWallet?.balance.lock_in_balance
                            ) ?? "-"}
                          </span>
                        )}
                      </div>
                      <div className=" text-gray-500 font-mono">
                        {!eurgWallet.balance?.user_balance_EUR_equ ? null : (
                          <span className={styles.Balance}>
                            ~{" "}
                            {toLocaleFiatRounding(
                              eurgWallet.balance.user_balance_EUR_equ
                            )}{" "}
                            €
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className={styles.ArrowMobileSidebar}>
                    <IconApp code="t08" size={11} color="#285E69" />
                  </div>
                </div>
              </div>
            </div>
          </NavLink>

          {/* GKE wallet */}
          <NavLink
            className={!currencies ? "disabled" : ""}
            onClick={NavLinkEvent}
            to={!currencies ? "" : "wallet?currency=GKE"}
          >
            <div className={styles.ItemWrapper}>
              <div className={`${styles.Item}`}>
                <div className="col flex items-center pl-4">
                  <IconCoin code="GKE" />
                </div>
                <div className="col flex items-center justify-center flex-col pl-5">
                  <div className="row text-gray-400 w-full mb-1">
                    <span className={styles.Name}>Gekkoin invest token</span>
                  </div>
                  <div className="row w-full font-mono">
                    <span className={styles.Sum}>
                      {(gkeWallet?.balance &&
                        toLocaleCryptoRounding(
                          gkeWallet.balance.user_balance,
                          gkeWallet.roundPrec
                        )) ??
                        "-"}{" "}
                      GKE
                    </span>
                  </div>
                  {gkeWallet && (
                    <div className={"row w-full flex justify-between pr-5"}>
                      <div>
                        {!gkeWallet.balance?.lock_in_balance ? null : (
                          <span className={styles.Income}>
                            +
                            {toLocaleCryptoRounding(
                              gkeWallet.balance.lock_in_balance,
                              gkeWallet.roundPrec
                            ) ?? "-"}
                          </span>
                        )}
                      </div>
                      <div className=" text-gray-500 font-mono">
                        {!gkeWallet.balance?.user_balance_EUR_equ ? null : (
                          <span className={styles.Balance}>
                            ~{" "}
                            {toLocaleFiatRounding(
                              gkeWallet.balance.user_balance_EUR_equ
                            )}{" "}
                            €
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className={styles.ArrowMobileSidebar}>
                    <IconApp code="t08" size={11} color="#285E69" />
                  </div>
                </div>
              </div>
            </div>
          </NavLink>

          {!secondaryWallets.length
            ? null
            : helperFilterList(secondaryWallets).map((item) =>
              <TokenBar key={item.id} currency="" NavLinkEvent={NavLinkEvent} item={item} />
            )}
          <div className={styles.AssetInfo5}>
            <span>{t("total_balance").capitalize()}</span>
            <span>
              ~{" "}
              <span data-testid="TotalAmount">
                {toLocaleFiatRounding(totalAmount?.toNumber()) ?? "-"}
              </span>{" "}
              €
            </span>
          </div>
        </div>
      </div> 
  );
};

export default SidebarMobile;

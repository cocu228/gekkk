import styles from "./style.module.scss";
import { pull, pullStart, scrollToTop } from "@/shared/lib/helpers";
import { CtxRootData } from "@/processes/RootContext";
import { NavLink, useNavigate } from 'react-router-dom';
import { helperFilterList } from "@/widgets/sidebar/model/helpers";
import { storyToggleSidebar } from "../../model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { ParentClassForCoin, IconCoin } from "@/shared/ui/icons/icon-coin";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';
import BankCardsCarousel from "@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import NewBankCard from "@/widgets/dashboard/ui/cards/bank-card/NewBankCard";
import { Carousel } from "antd";
import { toLocaleCryptoRounding, toLocaleFiatRounding } from "@/shared/lib/number-format-helper";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import Loader from "@/shared/ui/loader";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";

const SidebarMobile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { account } = useContext(CtxRootData);
    const refreshCont = useRef<HTMLDivElement>();
    const { setRefresh } = useContext(CtxRootData);
    const { sm, md } = useContext(BreakpointsContext);
    const [startPoint, setStartPoint] = useState(0);
    const [pullChange, setPullChange] = useState<number>();
    const isOpen = storyToggleSidebar(state => state.isOpen);
    const { currencies, totalAmount } = useContext(CtxCurrencies);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));
    const [isRefreshingFunds, setIsRefreshingFunds] = useState<boolean>(false);

    const {
        getRoomsList
    } = storeListExchangeRooms(state => state);
    const {
        activeCards,
        loading: cardsLoading,
        getActiveCards,
    } = storeActiveCards(state => state);

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md])

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

    const initLoading = () => {
        refreshCont.current?.classList.add(styles.Loading);
        setRefresh()
        setIsRefreshingFunds(true)
        setTimeout(() => {
            setIsRefreshingFunds(false)
        }, 3000);
    };

    function endPull() {
        setStartPoint(0);
        setPullChange(0);
        if (pullChange > 220) initLoading();
    }

    useEffect(() => {
        window.addEventListener("touchstart", (e) => { pullStart(e, setStartPoint) });
        window.addEventListener("touchmove", (e) => { pull(e, setPullChange, startPoint) });
        window.addEventListener("touchend", endPull);
        return () => {
            window.removeEventListener("touchstart", (e) => { pullStart(e, setStartPoint) });
            window.removeEventListener("touchmove", (e) => { pull(e, setPullChange, startPoint) });
            window.removeEventListener("touchend", endPull);
        };
    });

    return (
        <div id="sidebar" className={`${styles.Sidebar} ${isOpen ? "active" : ""}`}>
            <div className={`${styles.Sidebar} flex flex-col justify-between`}>
                {!md ? null : <UnconfirmedTransactions />}

                <div className="wrapper" ref={refreshCont} style={{ marginTop: pullChange / 3.118 || "" }}>
                    <div className="p-2 rounded-full w-full flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`w-6 h-6 ` + (isRefreshingFunds && "animate-spin")}
                            style={{
                                justifyContent: "center",
                                display: (!(!!pullChange || isRefreshingFunds) && "none"),
                                transform: `rotate(${pullChange}deg)`
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    </div>
                    <div style={{ backgroundColor: "#f7f7f0" }} className="flex justify-center">
                        <div className={styles.CardInfo}>
                            {cardsLoading ? <div className="mb-[14px]">
                                <SkeletonCard />
                            </div> : activeCards?.length === 0 ? (
                                <Carousel>
                                    <div onClick={() => navigate('/card-menu')}>
                                        <NewBankCard />
                                    </div>
                                </Carousel>
                            ) : (
                                <div onClick={() => navigate('/card-menu')}>
                                    <BankCardsCarousel cards={activeCards} />
                                </div>
                            )}
                        </div>
                    </div>
                    <NavLink onClick={NavLinkEvent} to={"wallet/EUR"}>


                        <div className={styles.AssetInfo1}>
                            <span>{t("fiat")}</span>
                        </div>


                        <div className={styles.ItemWrapper}>

                            <div className={`${styles.ItemEuro}`}>
                                <div className="col flex items-center pl-4">
                                    <IconCoin code='EUR' />
                                </div>
                                <div className="col flex items-center flex-col pl-5 pt-2 relative">
                                    <div className="row w-full">
                                        <span className={styles.Name}>Euro</span>
                                    </div>
                                    <div className="row w-full font-mono">
                                        <span
                                            className={styles.Sum}>{(eurWallet && toLocaleFiatRounding(eurWallet.balance?.user_balance)) ?? '-'} €</span>
                                    </div>

                                </div>
                                <div className={styles.ArrowMobileSidebar}>
                                    <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt="" />
                                </div>
                            </div>
                        </div>


                    </NavLink>
                    <div className={styles.AssetInfo1}>
                        <span>{t("crypto_assets.title")}</span>
                    </div>
                    <NavLink className={!currencies ? "disabled" : ""} onClick={NavLinkEvent}
                        to={!currencies ? "" : "wallet/EURG"}>
                        <div className={styles.ItemWrapper}>
                            <div className={`${styles.Item}`}>
                                <div className="col flex items-center pl-4">
                                    <IconCoin code='EURG' />
                                </div>
                                <div className="col flex items-center justify-center flex-col pl-5">
                                    <div className="row text-gray-400 w-full mb-1">
                                        <span className={styles.Name}>Gekkoin euro token</span>
                                    </div>
                                    <div className="row w-full font-mono">
                                        <span
                                            className={styles.Sum}>{(eurgWallet && toLocaleFiatRounding(eurgWallet.balance.user_balance)) ?? '-'} EURG</span>
                                    </div>
                                    {eurgWallet && <div className={"row w-full flex justify-between pr-5"}>
                                        <div>
                                            {!eurgWallet.balance.lock_in_balance ? null : <span className={styles.Income}>
                                                +{toLocaleFiatRounding(eurgWallet.balance.lock_in_balance) ?? '-'}
                                            </span>}
                                        </div>
                                        <div className=" text-gray-500 font-mono">
                                            {eurgWallet.balance.user_balance_EUR_equ === null ? null :
                                                <span className={styles.Balance}>
                                                    ~ {toLocaleFiatRounding(eurgWallet.balance.user_balance_EUR_equ)} €
                                                </span>}
                                        </div>
                                    </div>}
                                    <div className={styles.ArrowMobileSidebar}>
                                        <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </NavLink>

                    {/* GKE wallet */}
                    <NavLink className={!currencies ? "disabled" : ""} onClick={NavLinkEvent}
                        to={!currencies ? "" : "wallet/GKE"}>
                        <div className={styles.ItemWrapper}>
                            <div className={`${styles.Item}`}>
                                <div className="col flex items-center pl-4">
                                    <IconCoin code='GKE' />
                                </div>
                                <div className="col flex items-center justify-center flex-col pl-5">
                                    <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin invest token</span>
                                    </div>
                                    <div className="row w-full font-mono"><span
                                        className={styles.Sum}>{(gkeWallet && toLocaleCryptoRounding(gkeWallet.balance.user_balance, gkeWallet.roundPrec)) ?? '-'} GKE</span>
                                    </div>
                                    {gkeWallet && <div className={"row w-full flex justify-between pr-5"}>
                                        <div>
                                            {!gkeWallet.balance.lock_in_balance ? null : <span className={styles.Income}>
                                                +{toLocaleCryptoRounding(gkeWallet.balance.lock_in_balance, gkeWallet.roundPrec) ?? '-'}
                                            </span>}
                                        </div>
                                        <div className=" text-gray-500 font-mono">
                                            {gkeWallet.balance.user_balance_EUR_equ === null ? null :
                                                <span className={styles.Balance}>
                                                    ~ {toLocaleFiatRounding(gkeWallet.balance.user_balance_EUR_equ)} €
                                                </span>}
                                        </div>
                                    </div>}
                                    <div className={styles.ArrowMobileSidebar}>
                                        <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    {!secondaryWallets.length ? null : (
                        helperFilterList(secondaryWallets).map((item) =>
                            <NavLink onClick={NavLinkEvent} to={`wallet/${item.$const}`} key={item.id}>
                                <div className={styles.ItemWrapper}>
                                    <div
                                        className={`${styles.Item + " " + ParentClassForCoin + " " + styles.SecondaryItem}`}>
                                        <div className="col flex items-center pl-4 w-[85px]">
                                            {/* <SvgArrow width={14} height={14} className={styles.SvgArrow} /> */}
                                            <IconCoin code={item.$const} />
                                        </div>
                                        <div className={"col flex items-center justify-center flex-col"}>
                                            <div className="row w-full mb-1"><span
                                                className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span>
                                            </div>
                                            <div className="row w-full font-mono"><span
                                                className={styles.Sum}>{`${toLocaleCryptoRounding(item.balance.user_balance, item.roundPrec)} ${item.$const == 'BTC' ? '₿' : item.$const}`}</span>
                                            </div>
                                            <div className={"row w-full flex justify-between pr-5"}>
                                                <div>
                                                    {!item.balance.lock_in_balance ? null : <span className={styles.Income}>
                                                        +{toLocaleCryptoRounding(item.balance.lock_in_balance, item.roundPrec) ?? '-'}
                                                    </span>}
                                                </div>
                                                <div className=" text-gray-500 font-mono">
                                                    {item.balance.user_balance_EUR_equ === null ? null :
                                                        <span className={`${md ? styles.Balance : styles.EuroEqv} font-mono`}>
                                                            ~ {toLocaleFiatRounding(item.balance.user_balance_EUR_equ)} €
                                                        </span>}
                                                </div>
                                            </div>
                                            <div className={styles.ArrowMobileSidebar}>
                                                <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </NavLink>)
                    )}
                    <div className={styles.AssetInfo5}>
                        <span >{t("total_balance").capitalize()}</span>
                        <span>~ <span
                            data-testid="TotalAmount"
                        >{toLocaleFiatRounding(totalAmount?.toNumber()) ?? '-'}</span> €</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SidebarMobile
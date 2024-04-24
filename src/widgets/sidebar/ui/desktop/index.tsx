import Footer from "@/widgets/footer";
import styles from "./style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import { scrollToTop } from "@/shared/lib/helpers";
import { CtxRootData } from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import UpdateAmounts from "../../../../features/update-amounts";
import { helperFilterList } from "@/widgets/sidebar/model/helpers";
import { storyToggleSidebar } from "@/widgets/sidebar/model/story";
import { apiCloseRoom } from "@/shared/(orval)api/gek";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/sidebar/ui/nav-collapse/NavCollapse";
//import { CtxOfflineMode } from "@/processes/errors-provider-context";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';
import { RoomInfo } from "@/shared/(orval)api/gek/model";
import BankCardsCarousel from "@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import NewBankCard from "@/widgets/dashboard/ui/cards/bank-card/NewBankCard";
import { Carousel } from "antd";
import { toLocaleCryptoRounding, toLocaleFiatRounding } from "@/shared/lib/number-format-helper";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { TokenBar } from "../TokenBar";

const SidebarDesktop = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const roomInfoModal = useModal();
    const roomCloseModal = useModal();
    const [params] = useSearchParams();
    const roomId = params.get('roomId');
    const currency = params.get('currency');
    const { account } = useContext(CtxRootData);
    const { sm, md, xxxl } = useContext(BreakpointsContext);
    const { currencies, totalAmount } = useContext(CtxCurrencies);
    const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))

    const {
        getRoomsList,
        roomsList: privateRooms,
        removeRoom: removeExchangeRoom
    } = storeListExchangeRooms(state => state);
    const { activeCards, loading: cardsLoading, getActiveCards } = storeActiveCards(state => state);

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

    return (
        <div className={`${styles.Sidebar} flex flex-col justify-between`}>

            <div className="wrapper">
                {/* Account total balance
                        <div className={styles.TotalVal}>
                            <div className="right-0 absolute mr-4 mt-3"><UpdateAmounts /></div>
                            <div className={`wrapper flex-col ml-4 pt-4 pb-4 flex ${styles.Wrapper}`}>
                                <div className="row mb-2 flex justify-center">
                                    <span className="text-white font-semibold mr-3">{t("asset_valuation")}</span>
                                </div>
                                <div style={{ color: "#e2ffee" }} className="TotalSum text-right">
                                    <span className="text-lg font-bold mr-5">
                                        ~ <span data-testid="TotalAmount">{toLocaleFiatRounding(totalAmount?.toNumber()) ?? '-'}</span> €
                                    </span>
                                </div>
                            </div>
                        </div>*/}
                {/* Wrapper */}
                {/* <div style={{ backgroundColor: "#f7f7f0" }} className="h-[8px] w-full" /> */}
                <div style={{ backgroundColor: "#f7f7f0" }} className="flex justify-center">
                    <div className={styles.CardInfo}>
                        {cardsLoading ? <div className="mb-[14px]">
                            <SkeletonCard />
                        </div> : !activeCards ? null : activeCards?.length === 0 ? (
                            <Carousel>
                                <div onClick={() => navigate('/wallet?currency=EUR&tab=bank_cards&new')}>
                                    <NewBankCard />
                                </div>
                            </Carousel>
                        ) : (
                            <div onClick={() => navigate('/wallet?currency=EUR&tab=bank_cards')}>
                                <BankCardsCarousel cards={activeCards} />
                            </div>
                        )}
                    </div>
                </div>
                {/* fiat-currency wallet */}
                <NavLink onClick={NavLinkEvent} to={"wallet?currency=EUR"}
                    className={({ isActive }) => (isActive && currency === 'EUR') ? 'active' : ''}>
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
                                    <span
                                        className={styles.Sum}>{(eurWallet?.balance && toLocaleFiatRounding(eurWallet.balance.user_balance)) ?? '-'} €</span>
                                </div>
                                <div className="right-0 absolute mr-4 "><UpdateAmounts /></div>
                            </div>
                            <div className={styles.ArrowMobileSidebar}>
                            </div>
                        </div>
                    </div>
                </NavLink>

                {/* Crypto wallets wrapper */}

                <div className={styles.AssetInfo1}>
                    <span>{t("crypto_assets.title").toLowerCase()}</span>
                </div>

                {/* EURG wallet */}
                <NavLink onClick={NavLinkEvent}
                    className={({ isActive }) => !currencies
                        ? "disabled"
                        : (isActive && currency === 'EURG')
                            ? 'active'
                            : ''
                    }
                    to={!currencies ? "" : "wallet?currency=EURG"}>
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
                                    <span
                                        className={styles.Sum}>{(eurgWallet?.balance && toLocaleCryptoRounding(eurgWallet.balance.user_balance, eurgWallet.roundPrec)) ?? '-'} EURG</span>
                                </div>
                                {eurgWallet && <div className={"row w-full flex justify-between "}>
                                    <div>
                                        {!eurgWallet.balance?.lock_in_balance ? null : <span className={styles.Income}>
                                            +{toLocaleCryptoRounding(eurgWallet.balance.lock_in_balance, eurgWallet.roundPrec) ?? '-'}
                                        </span>}
                                    </div>
                                    <div className=" text-gray-500 font-mono">
                                        {!eurgWallet.balance?.user_balance_EUR_equ ? null : <span className={styles.EuroEqv}>
                                            ~ {toLocaleFiatRounding(eurgWallet.balance.user_balance_EUR_equ)} €
                                        </span>}
                                    </div>

                                </div>}

                            </div>
                        </div>
                    </div>

                </NavLink>

                {/* GKE wallet */}
                <NavLink onClick={NavLinkEvent}
                    className={({ isActive }) => !currencies
                        ? "disabled"
                        : (isActive && currency === 'GKE')
                            ? 'active'
                            : ''
                    }
                    to={!currencies ? "" : "wallet?currency=GKE"}>
                    <div className={styles.ItemWrapper}>
                        <div className={`${styles.Item}`}>
                            <div className="col flex items-center pl-4">
                                <IconCoin code="GKE" />
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-5">
                                <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin invest token</span>
                                </div>
                                <div className="row w-full font-mono"><span
                                    className={styles.Sum}>{(gkeWallet?.balance && toLocaleCryptoRounding(gkeWallet.balance.user_balance, gkeWallet.roundPrec)) ?? '-'} GKE</span>
                                </div>
                                {gkeWallet && <div className={"row w-full flex justify-between"}>
                                    <div>
                                        {!gkeWallet.balance?.lock_in_balance ? null : <span className={styles.Income}>
                                            +{toLocaleCryptoRounding(gkeWallet.balance.lock_in_balance, gkeWallet.roundPrec) ?? '-'}
                                        </span>}
                                    </div>
                                    <div className=" text-gray-500 font-mono">
                                        {!gkeWallet.balance?.user_balance_EUR_equ ? null : <span className={styles.EuroEqv}>
                                            ~ {toLocaleFiatRounding(gkeWallet.balance.user_balance_EUR_equ)} €
                                        </span>}
                                    </div>
                                </div>}
                            </div>
                        </div>

                    </div>
                </NavLink>

                {/* Secondary options wrapper */}
                <div style={{ backgroundColor: "#f7f7f0" }} className="h-[8px] w-full" />

                {/* User assets collapse */}
                {!secondaryWallets.length ? null : (
                    <NavCollapse header={t("assets")} id={"assets"}>
                        {helperFilterList(secondaryWallets).map((item, i) =>
                            <TokenBar key={item.id} currency={currency} NavLinkEvent={NavLinkEvent} item={item}/>)}
                    </NavCollapse>
                )}

                <div className={styles.AssetInfo2 + " text-gray-500 font-mono"}>
                    <span>{t("total_balance")}</span>
                    <span>~ <span
                        data-testid="TotalAmount">{toLocaleFiatRounding(totalAmount?.toNumber()) ?? '-'}</span> €</span>
                </div>
                {/* Assets link */}

                <div className={`${!currencies ? "disabled" : ""} ${styles.AssetInfo3}`}>
                    <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                        <div className={styles.AssetInfo4}>
                            {t("new_asset")}
                        </div>
                        {/* <div className={`${styles.Item}`}>
                                <div className="col flex items-center pl-4">
                                    <img width={50} height={50} className={styles.Icon} src={`/img/icon/Invest.svg`}
                                        alt="Invest" />
                                </div>
                                <div className="col flex items-center justify-center flex-col pl-5">
                                    <div className="row w-full mb-1 font-medium"><span
                                        className={styles.NavName}>{t("crypto_assets.title")}</span></div>
                                </div>
                            </div> */}
                    </NavLink>
                </div>

                {/* Exchange page link */}

                <NavLink className={!currencies ? "disabled" : ""}
                    onClick={NavLinkEvent}
                    to={!currencies ? "" : "exchange"}>
                    <div className={styles.ItemExchange}>
                        <div className="absolute self-center place-self-center"><span
                            className={styles.NavName}>{t("exchange.title")}</span>
                        </div>
                        <div className="absolute right-4 self-center">
                            {/* <img width={50} height={50} className={styles.Icon} src={`/img/icon/ExchangeIcon.svg`}
                                            alt="ExchangeIcon" /> */}
                            <IconApp code="t68" className={styles.Icon} color="#285E69" size={34} />
                        </div>
                    </div>
                </NavLink>

                {/* Private exchange rooms collapse */}
                {!(privateRooms && privateRooms.length) ? null :
                    <NavCollapse header={t("private_exchange_rooms")} id={"exchange"}>
                        {privateRooms.map((item, i) => (
                            <NavLink onClick={NavLinkEvent} to={`private-room?roomId=${item.timetick}`}
                                className={({ isActive }) => (isActive && +roomId === item.timetick) ? 'active' : ''}
                                key={item.timetick}>
                                <div className={styles.Item}>
                                    <div className="col flex items-center pl-4 w-[85px]">
                                        <IconApp color="#DEE2E7" code="t66" size={14} className={styles.SvgArrow} />
                                        <img
                                            width={50}
                                            height={50}
                                            className={styles.Icon}
                                            src={`/img/icon/PrivateExchangeShield.svg`}
                                            alt="ExchangeIcon"
                                        />
                                    </div>
                                    <div className="col flex items-center justify-center flex-col pl-6">
                                        <div className="flex w-full row mb-1 justify-between">
                                            <div className={styles.RoomName}>
                                                {!xxxl
                                                    ? `${item.currency1} - ${item.currency2}`
                                                    : `${item.currency1} - ${item.currency2}`
                                                }
                                            </div>

                                            <div
                                                className="mr-3 hover:cursor-pointer group"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedRoom(item);
                                                    roomCloseModal.showModal();
                                                }}
                                            >
                                                <IconApp color="#fa94a9" code="t69" size={16} className="text-[12px] group-hover:stroke-red-500" />
                                            </div>
                                        </div>

                                        <div className="flex row w-full mb-1 justify-between"><span
                                            className={`text-gray-500 text-xs`}>
                                            {!xxxl ? t("number_of_participants") : t("participants")}
                                        </span>
                                            <span
                                                className='mr-[17px] text-gray-500 text-xs font-semibold'>{item.count}</span>
                                        </div>

                                        {!item.room_code ? null : (
                                            <div className="flex row w-full justify-between"><span
                                                className={`underline text-gray-500 text-xs hover:text-blue-300`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedRoom(item);
                                                    roomInfoModal.showModal();
                                                }}
                                            >
                                                {t("invite_link")}
                                            </span>

                                                <div
                                                    className="mr-3 hover:cursor-pointer fill-gray-500 hover:fill-blue-400 group"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedRoom(item);
                                                        roomInfoModal.showModal();
                                                    }}
                                                >
                                                     <IconApp color="gray-500" code="t63" size={16} className="text-[12px] group-hover:stroke-blue-400" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </NavCollapse>
                }

                {/*<NavLink onClick={NavLinkEvent} to={"new-deposit"}>*/}
                {/*    <div className={`${styles.Item}`}>*/}
                {/*        <div className="col flex items-center pl-4">*/}
                {/*            <img width={50} height={50} src={`/img/icon/NewDepositIcon.svg`}*/}
                {/*                 alt="NewDepositIcon"/>*/}
                {/*        </div>*/}
                {/*        <div className="col flex items-center justify-center flex-col pl-6">*/}
                {/*            <div className="row w-full mb-1 font-medium"><span className={styles.NavName}>New deposit</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</NavLink>*/}
                {/*{!(investments && investments.length) ? null : <NavCollapse header={"Current deposit"} id={"deposit"}>*/}
                {/*    {investments.map((item, i) =>*/}
                {/*        <NavLink onClick={NavLinkEvent} to={`/deposit/${item.id}`} key={item.id}>*/}
                {/*            <div className={`${styles.Item + " " + ParentClassForCoin}`}>*/}
                {/*                <div className="col flex items-center pl-4 w-[85px]">*/}
                {/*                    <SvgArrow width={14} height={14} className={styles.SvgArrow}/>*/}
                {/*                    <img alt={"DepositIcon.svg"} className={styles.Icon}*/}
                {/*                         src={"/img/icon/DepositIcon.svg"}/>*/}
                {/*                </div>*/}
                {/*                <div className="col w-[calc(100%-85px)] flex items-center justify-center flex-col pl-6 pr-2">*/}
                {/*                    <div className="row w-full mb-1"><span*/}
                {/*                        className={`${styles.Name} text-gray-400 text-xs`}>*/}
                {/*                            {item.dep_type === 1 ? 'Fixed rate' : 'Structured'} deposit, until {formatDate(new Date(item.date_end))}*/}
                {/*                        </span>*/}
                {/*                    </div>*/}
                {/*                    <div className="row w-full"><span*/}
                {/*                        className={styles.Sum}>{item.amount} €</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="row w-full ellipsis ellipsis-c-none">*/}
                {/*                        <span className="text-gray-400 text-xs">{getDepositTitle(item.dep_type)}</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </NavLink>)}*/}
                {/*</NavCollapse>}*/}

            </div>
            <Footer textAlight={"text-left"} />

            <Modal
                width={450}
                open={roomInfoModal.isModalOpen}
                onCancel={roomInfoModal.handleCancel}
                title={t("invite_link")}
                padding
            >
                <InviteLink roomInfo={selectedRoom} />
            </Modal>

            <Modal
                width={450}
                open={roomCloseModal.isModalOpen}
                onCancel={roomCloseModal.handleCancel}
                title={t("invite_link")}
                padding
            >
                <div className="pt-5 text-sm">
                    {selectedRoom ?
                        t("are_you_sure_close", { currency1: selectedRoom?.currency1, currency2: selectedRoom?.currency2 })
                        :
                        t("are_you_sure_leave", { currency1: selectedRoom?.currency1, currency2: selectedRoom?.currency2 })
                    }
                </div>
                <div className="mt-16 sm:mt-14">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={() => {
                            if (window.location.pathname === `/private-room?roomId=${selectedRoom.timetick}`) {
                                navigate('/exchange');
                            }

                            apiCloseRoom({
                                roomId: selectedRoom.timetick
                            }).then(() => {
                                removeExchangeRoom(selectedRoom.timetick);
                                roomCloseModal.handleCancel();
                            }).catch(roomCloseModal.handleCancel);
                        }}
                    >{t("close_private_exchange_room")}</Button>
                </div>
            </Modal>
        </div>
    )
}
export default SidebarDesktop;

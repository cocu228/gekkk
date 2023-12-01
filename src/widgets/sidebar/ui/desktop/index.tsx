import Footer from "@/widgets/footer";
import styles from "./style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import { scrollToTop } from "@/shared/lib/helpers";
import { CtxRootData } from "@/processes/RootContext";
import IconClose from "@/shared/ui/icons/IconClose";
import useModal from "@/shared/model/hooks/useModal";
import { NavLink, useNavigate } from 'react-router-dom';
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import SvgArrow from "@/shared/ui/icons/DepositAngleArrowIcon";
import UpdateAmounts from "../../../../features/update-amounts";
import IconParticipant from '@/shared/ui/icons/IconParticipant';
import { helperFilterList } from "@/widgets/sidebar/model/helpers";
import { storyToggleSidebar } from "@/widgets/sidebar/model/story";
import { apiCloseRoom } from "@/shared/api/(gen)new";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/sidebar/ui/nav-collapse/NavCollapse";
import { storeInvestments } from "@/shared/store/investments/investments";
import { ParentClassForCoin, IconCoin } from "@/shared/ui/icons/icon-coin";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';
import { RoomInfo } from "@/shared/api/(gen)new/model";
import Decimal from "decimal.js";

const SidebarDesktop = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const roomInfoModal = useModal();
    const roomCloseModal = useModal();
    const { account } = useContext(CtxRootData);
    const { sm, md, xxxl } = useContext(BreakpointsContext);
    const { currencies, totalAmount } = useContext(CtxCurrencies);

    const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))

    const privateRooms = storeListExchangeRooms(state => state.roomsList);
    const getRoomsList = storeListExchangeRooms(state => state.getRoomsList);
    const getInvestments = storeInvestments(state => state.getInvestments);
    const removeExchangeRoom = storeListExchangeRooms(state => state.removeRoom);

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md])

    useEffect(() => {
        getInvestments();
        getRoomsList();
    }, [account]);

    const eurgWallet = currencies.get("EURG");
    const gkeWallet = currencies.get("GKE");
    const eurWallet = currencies.get("EUR");

    const secondaryWallets = Array.from(currencies.values())

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            {/* Account total balance */}
            <div className={styles.TotalVal}>
                <div className="right-0 absolute mr-4 mt-3"><UpdateAmounts /></div>
                <div className={`wrapper flex-col ml-4 pt-4 pb-4 flex ${styles.Wrapper}`}>
                    <div className="row mb-2 flex justify-center">
                        <span className="text-white font-semibold mr-3">{t("asset_valuation")}</span>
                    </div>
                    <div style={{ color: "#e2ffee" }} className="TotalSum text-right">
                        <span className="text-lg font-bold mr-5">~ <span data-testid="TotalAmount">{Intl.NumberFormat("eu", { maximumFractionDigits: 2, minimumFractionDigits:2}).format(totalAmount.EUR?.toNumber())}</span> €
                            {/* ({totalAmount.BTC?.toDecimalPlaces(6).toNumber()} ₿) */}
                        </span>
                    </div>
                </div>
            </div>
            {/* Crypto wallets wrapper */}
            <div style={{ backgroundColor: "#f7f7f0" }} className="h-[8px] w-full" />
            {/* fiat-currency wallet */}
            <NavLink onClick={NavLinkEvent} to={"wallet/EUR"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <svg className={styles.Icon} width="50" height="50" viewBox="0 0 31 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.0396 42C21.739 42 19.5553 41.7042 17.4887 41.1127C15.422 40.4817 13.5308 39.5549 11.8151 38.3324C10.0994 37.1099 8.61761 35.6113 7.36981 33.8366C6.16101 32.062 5.26415 29.9916 4.67924 27.6254H0V22.893H3.91887C3.87987 22.5775 3.86038 22.262 3.86038 21.9465C3.86038 21.631 3.86038 21.3155 3.86038 21C3.86038 20.6451 3.86038 20.3296 3.86038 20.0535C3.86038 19.738 3.87987 19.4028 3.91887 19.0479H0V14.3155H4.67924C5.26415 11.9887 6.16101 9.93803 7.36981 8.16338C8.61761 6.3493 10.0799 4.8507 11.7566 3.6676C13.4723 2.44507 15.3635 1.53803 17.4302 0.946477C19.4969 0.315492 21.7195 0 24.0981 0C25.3459 0 26.5547 0.0788734 27.7245 0.23662C28.9333 0.394365 30.0252 0.630984 31 0.946477V7.33521C30.2591 7.05915 29.4013 6.84225 28.4264 6.68451C27.4906 6.48732 26.4962 6.38873 25.4434 6.38873C23.5717 6.38873 21.817 6.70423 20.1792 7.33521C18.5805 7.92676 17.1962 8.81408 16.0264 9.99718C14.8566 11.1803 13.9403 12.6197 13.2774 14.3155H26.5547V19.0479H12.166C12.127 19.3239 12.1075 19.6394 12.1075 19.9944C12.1075 20.3099 12.1075 20.6254 12.1075 20.9408C12.1075 21.2958 12.1075 21.6507 12.1075 22.0056C12.1075 22.3211 12.127 22.6169 12.166 22.893H26.5547V27.6254H13.2774C13.9403 29.3211 14.8566 30.7606 16.0264 31.9437C17.2352 33.1268 18.639 34.0338 20.2377 34.6648C21.8365 35.2958 23.5717 35.6113 25.4434 35.6113C26.4962 35.6113 27.4906 35.5127 28.4264 35.3155C29.4013 35.1183 30.2591 34.8817 31 34.6056V40.9352C29.9862 41.2507 28.8748 41.507 27.666 41.7042C26.4962 41.9014 25.2874 42 24.0396 42Z" fill="#3A5E66" />
                        </svg>

                        {/*<img width={50} height={50} className={styles.Icon} src={`/img/tokens/EurIcon.svg`}
                            alt="EUR" />*/}
                    </div>
                    <div className="col flex items-center flex-col pl-5 pt-3">
                        <div className="row w-full">
                            <span className={styles.Name}>Euro account</span>
                        </div>
                        <div className="row w-full text-right">
                            <span className={styles.SumEUR}>{Intl.NumberFormat("eu", { maximumFractionDigits: 2, minimumFractionDigits:2}).format(eurWallet.availableBalance?.toNumber())?? '-'} €</span>
                        </div>
                    </div>
                </div>
            </NavLink>

            {/* Crypto wallets wrapper */}
            <div style={{ backgroundColor: "#f7f7f0" }} className="h-[8px] w-full" />

            {/* EURG wallet */}
            <NavLink onClick={NavLinkEvent} to={"wallet/EURG"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/EurgIcon.svg`} alt="EURG" />
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-5">
                        <div className="row text-gray-400 w-full mb-1">
                            <span className={styles.Name}>Gekkoin euro token</span>
                        </div>
                        <div className="row w-full">
                            <span className={styles.Sum}>{eurgWallet.availableBalance?.toNumber().toLocaleString("eu", { maximumFractionDigits: 2}) ?? 0} EURG</span>
                        </div>
                        <div className="row w-full flex justify-between">
                            <div>
                                {eurgWallet.lockInBalance !== 0 ? <span className={styles.Income}>+{(new Decimal(eurgWallet.lockInBalance)).toDecimalPlaces(eurgWallet.roundPrec).toNumber()}</span> : null}
                            </div>
                            <div>
                                <span className={styles.EuroEqv}>~ {Intl.NumberFormat("eu", { maximumFractionDigits: 2, minimumFractionDigits: 2}).format(eurgWallet.userBalanceEUREqu)} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            {/* GKE wallet */}
            <NavLink onClick={NavLinkEvent} to={"wallet/GKE"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/GkeIcon.svg`}
                            alt="GKE" />
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-5">
                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin invest token</span>
                        </div>
                        <div className="row w-full">   <span
                            className={styles.Sum}>{gkeWallet.availableBalance?.toNumber().toLocaleString("eu", { maximumFractionDigits: gkeWallet.roundPrec}) ?? 0} GKE</span>
                        </div>
                        <div className="row w-full flex justify-between">
                            <div>
                                {gkeWallet.lockInBalance !== 0 ? <span className={styles.Income}>+{(new Decimal(gkeWallet.lockInBalance)).toDecimalPlaces(gkeWallet.roundPrec).toNumber()}</span> : null}
                            </div>
                            <div>
                                <span className={styles.EuroEqv}>~ {Intl.NumberFormat("eu", { maximumFractionDigits: 2, minimumFractionDigits: 2}).format(gkeWallet.userBalanceEUREqu)} €</span>
                            </div>
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
                        <NavLink onClick={NavLinkEvent} to={`wallet/${item.$const}`} key={item.id}>
                            <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                                <div className="col flex items-center pl-4 w-[85px]">
                                    <SvgArrow width={14} height={14} className={styles.SvgArrow} />
                                    <IconCoin className={styles.Icon} code={item.$const} />
                                </div>
                                <div className="col flex items-center justify-center flex-col pl-6">
                                    <div className="row w-full mb-1"><span
                                        className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span></div>
                                    <div className="row w-full"><span
                                        className={styles.Sum}>{`${item.availableBalance?.toNumber().toLocaleString("eu", { maximumFractionDigits: item.roundPrec})} ${item.$const == 'BTC' ? '₿' : item.$const}`}</span>
                                    </div>
                                    <div className="row w-full flex justify-between">
                                        <div>
                                            {item.lockInBalance !== 0 ? <span className={styles.Income}>+{(new Decimal(item.lockInBalance)).toNumber().toLocaleString("eu", { maximumFractionDigits: item.roundPrec})}</span> : null}
                                        </div>
                                        <div>
                                            <span className={styles.EuroEqv}>~ {Intl.NumberFormat("eu", { maximumFractionDigits: 2, minimumFractionDigits: 2}).format(item.userBalanceEUREqu)} €</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </NavLink>)}
                </NavCollapse>
            )}

            {/* Assets link */}
            <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/Invest.svg`}
                            alt="Invest" />
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-5">
                        <div className="row w-full mb-1 font-medium"><span
                            className={styles.NavName}>{t("crypto_assets.title")}</span></div>
                    </div>
                </div>
            </NavLink>

            {/* Exchange page link */}
            <NavLink onClick={NavLinkEvent} to={"exchange"}>
                <div className={styles.Item}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/ExchangeIcon.svg`}
                            alt="ExchangeIcon" />
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1 font-medium"><span
                            className={styles.NavName}>{t("exchange.title")}</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            {/* Private exchange rooms collapse */}
            {!(privateRooms && privateRooms.length) ? null :
                <NavCollapse header={t("private_exchange_rooms")} id={"exchange"}>
                    {privateRooms.map((item, i) => (
                        <NavLink onClick={NavLinkEvent} to={`private-room/${item.timetick}`} key={item.timetick}>
                            <div className={styles.Item}>
                                <div className="col flex items-center pl-4 w-[85px]">
                                    <SvgArrow
                                        width={14}
                                        height={14}
                                        className={styles.SvgArrow}
                                    />
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
                                            className="mr-3 hover:cursor-pointer fill-[#fa94a9] hover:fill-red-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedRoom(item);
                                                roomCloseModal.showModal();
                                            }}
                                        >
                                            <IconClose fill="inherit" size={16} />
                                        </div>
                                    </div>

                                    <div className="flex row w-full mb-1 justify-between"><span className={`text-gray-500 text-xs`}>
                                        {!xxxl ? t("number_of_participants") : t("participants")}
                                    </span>
                                        <span className='mr-[17px] text-gray-500 text-xs font-semibold'>{item.count}</span>
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
                                                className="mr-3 hover:cursor-pointer fill-gray-500 hover:fill-blue-400"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedRoom(item);
                                                    roomInfoModal.showModal();
                                                }}
                                            >
                                                <IconParticipant fill="inherit" />
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
        {!sm && !md && <Footer textAlight={"text-left"} />}

        <Modal
            width={450}
            open={roomInfoModal.isModalOpen}
            onCancel={roomInfoModal.handleCancel}
            title='Invite link'
        >
            <InviteLink roomInfo={selectedRoom} />
        </Modal>

        <Modal
            width={450}
            open={roomCloseModal.isModalOpen}
            onCancel={roomCloseModal.handleCancel}
            title='Invite link'
        >
            <div className="pt-5 text-sm">
                Are you sure you want to {selectedRoom ?
                    `close ${selectedRoom?.currency1} - ${selectedRoom?.currency2} private
                exchange room? All `
                    : `leave ${selectedRoom?.currency1} - ${selectedRoom?.currency2} private
                exchange room? Your `}
                unclosed orders will be canceled.
            </div>
            <div className="mt-16 sm:mt-14">
                <Button
                    size="xl"
                    className="w-full"
                    onClick={() => {
                        if (window.location.pathname === `/private-room/${selectedRoom.timetick}`) {
                            navigate('/exchange');
                        }

                        apiCloseRoom({
                            roomId: selectedRoom.timetick
                        }).then(() => {
                            removeExchangeRoom(selectedRoom.timetick);
                            roomCloseModal.handleCancel();
                        }).catch(roomCloseModal.handleCancel);
                    }}
                >Close private exchange room</Button>
            </div>
        </Modal>
    </div>;
}

export default SidebarDesktop;

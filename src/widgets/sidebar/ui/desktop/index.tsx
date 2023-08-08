import Decimal from "decimal.js";
import Footer from "@/widgets/footer";
import styles from "./style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import {scrollToTop} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import IconClose from "@/shared/ui/icons/IconClose";
import $const from "@/shared/config/coins/constants";
import useModal from "@/shared/model/hooks/useModal";
import {NavLink, useNavigate} from 'react-router-dom';
import totalizeAmount from "../../model/totalize-amount";
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import SvgArrow from "@/shared/ui/icons/DepositAngleArrowIcon";
import UpdateAmounts from "../../../../features/update-amounts";
import IconParticipant from '@/shared/ui/icons/IconParticipant';
import {helperFilterList} from "@/widgets/sidebar/model/helpers";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {IRoomInfo, apiCloseRoom, apiGetRates} from "@/shared/api";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/sidebar/ui/nav-collapse/NavCollapse";
import {storeInvestments} from "@/shared/store/investments/investments";
import {ParentClassForCoin, IconCoin} from "@/shared/ui/icons/icon-coin";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {storeListExchangeRooms} from "@/shared/store/exchange-rooms/exchangeRooms";

const SidebarDesktop = () => {
    const roomInfoModal = useModal();
    const roomCloseModal = useModal();
    const {account} = useContext(CtxRootData);
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState<IRoomInfo>(null);
    const removeExchangeRoom = storeListExchangeRooms(state => state.removeRoom);

    const {currencies, refreshKey} = useContext(CtxRootData);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))

    const [totalSum, setTotalSum] = useState<{ EUR: Decimal, BTC: Decimal }>({EUR: new Decimal(0), BTC: new Decimal(0)})

    const {sm, md, xxxl} = useContext(BreakpointsContext)

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md])

    const getRoomsList = storeListExchangeRooms(state => state.getRoomsList);
    const privateRooms = storeListExchangeRooms(state => state.roomsList);

    const getInvestments = storeInvestments(state => state.getInvestments);
    //const investments = storeInvestments(state => state.investments);

    useEffect(() => {
        getInvestments();
        getRoomsList();
    }, [account]);

    useEffect(() => {

        (async () => {

            const ratesEUR = await apiGetRates()
            const ratesBTC = await apiGetRates("BTC")


            const valueEUR: Decimal = totalizeAmount(currencies, ratesEUR.data.result)
            const valueBTC: Decimal = totalizeAmount(currencies, ratesBTC.data.result)

            setTotalSum({EUR: valueEUR, BTC: valueBTC})


        })()

    }, [refreshKey]);

    const eurgWallet = currencies.get("EURG");
    const gkeWallet = currencies.get("GKE");

    const secondaryWallets = Array.from(currencies.values())

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            {/* Account total balance */}
            <div className={`wrapper flex-col ml-4 pt-4 pb-5 flex ${styles.Wrapper}`}>
                <div className="row flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2 flex">
                            <span className="text-gray-400 text-sm font-semibold mr-3">Asset valuation</span>
                            <UpdateAmounts/>
                        </div>
                        <div className="row"></div>
                        <span
                            className="text-lg font-bold">{totalSum.EUR.toDecimalPlaces(2).toNumber()} € ({totalSum.BTC.toDecimalPlaces(6).toNumber()} ₿)</span>
                    </div>

                </div>
            </div>
            {/* EURG wallet */}
            <NavLink onClick={NavLinkEvent} to={"wallet/EURG"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/EurgIcon.svg`}
                             alt="EURG"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span
                            className={styles.Name}>Gekkoin Europe</span>
                        </div>
                        <div className="row w-full">
                            <span
                                className={styles.Sum}>{eurgWallet.availableBalance?.toDecimalPlaces(eurgWallet.roundPrec).toNumber() ?? 0} EURG</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            {/* EUR wallet */}
            <NavLink onClick={NavLinkEvent} to={"wallet/EUR"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/EurIcon.svg`}
                             alt="EURG"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span
                            className={styles.Name}>Europe</span>
                        </div>
                        <div className="row w-full">
                            <span className={styles.Sum}>0 EUR</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            {/* GKE wallet */}
            <NavLink onClick={NavLinkEvent} to={"wallet/GKE"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/GkeIcon.svg`}
                             alt="GKE"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin Invest Token</span>
                        </div>
                        <div className="row w-full">   <span
                            className={styles.Sum}>{gkeWallet.availableBalance?.toDecimalPlaces(gkeWallet.roundPrec).toNumber() ?? 0} GKE</span>
                        </div>
                    </div>
                </div>
            </NavLink>

            {/* Secondary options wrapper */}
            <div className="h-[8px] w-full bg-gray-300"/>

            {/* Assets link */}
            <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/Invest.svg`}
                             alt="Invest"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1 font-medium"><span
                            className={styles.NavName}>Crypto assets</span></div>
                    </div>
                </div>
            </NavLink>
            {/* User assets collapse */}
            {!secondaryWallets.length ? null : (
                <NavCollapse header={"Assets"} id={"assets"}>
                    {helperFilterList(secondaryWallets).map((item, i) =>
                        <NavLink onClick={NavLinkEvent} to={`wallet/${item.currency}`} key={item.id}>
                            <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                                <div className="col flex items-center pl-4 w-[85px]">
                                    <SvgArrow
                                        width={14}
                                        height={14}
                                        className={styles.SvgArrow}
                                    />
                                    <IconCoin
                                        className={styles.Icon}
                                        code={item.currency}
                                    />
                                </div>
                                <div className="col flex items-center justify-center flex-col pl-6">
                                    <div className="row w-full mb-1"><span
                                        className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span></div>
                                    <div className="row w-full"><span
                                        className={styles.Sum}>{`${item.availableBalance?.toDecimalPlaces(item.roundPrec)} ${item.currency}`}</span>
                                    </div>
                                    <div className="row w-full">
                                        {item.lockInBalance !== 0 ? <span
                                            className={styles.Sum}>{`lock in: ${item.lockInBalance}`}</span> : null}
                                    </div>
                                </div>
                            </div>
                        </NavLink>)}
                </NavCollapse>
            )}
            {/* Exchange page link */}
            <NavLink onClick={NavLinkEvent} to={"exchange"}>
                <div className={styles.Item}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/ExchangeIcon.svg`}
                             alt="ExchangeIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1 font-medium"><span className={styles.NavName}>Exchange</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            {/* Private exchange rooms collapse */}
            {!(privateRooms && privateRooms.length) ? null : 
                <NavCollapse header={"Private exchange rooms"} id={"exchange"}>
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
                                                ? `${item.currency1} - ${item.currency2}: exchange room`
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
                                            <IconClose fill="inherit" size={16}/>
                                        </div>
                                    </div>

                                    <div className="flex row w-full mb-1 justify-between">
                                        <span className={`text-gray-500 text-xs`}>
                                            {!xxxl ? 'Number of participants' : 'Participants'}
                                        </span>
                                        <span className='mr-[17px] text-gray-500 text-xs font-semibold'>
                                            {item.count}
                                        </span>
                                    </div>
                                    
                                    {!item.room_code ? null : (
                                        <div className="flex row w-full justify-between">
                                            <span
                                                className={`underline text-gray-500 text-xs hover:text-blue-300`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedRoom(item);
                                                    roomInfoModal.showModal();
                                                }}
                                            >
                                                Invite link
                                            </span>

                                            <div
                                                className="mr-3 hover:cursor-pointer fill-gray-500 hover:fill-blue-400"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedRoom(item);
                                                    roomInfoModal.showModal();
                                                }}
                                            >
                                                <IconParticipant fill="inherit"/>
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
        {!sm && !md && <Footer textAlight={"text-left"}/>}

        <Modal
            width={450}
            open={roomInfoModal.isModalOpen}
            onCancel={roomInfoModal.handleCancel}
            title='Invite link'
        >
            <InviteLink roomInfo={selectedRoom}/>
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
                        if(window.location.pathname === `/private-room/${selectedRoom.timetick}`) {
                            navigate('/exchange');
                        }

                        apiCloseRoom(selectedRoom.timetick).then(() => {
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

import styles from "./style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import {pull, pullStart, scrollToTop} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import {NavLink, useNavigate} from 'react-router-dom';
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import {helperFilterList, toLocaleCryptoRounding, toLocaleFiatRounding} from "@/widgets/sidebar/model/helpers";
import { storyToggleSidebar } from "../../model/story";
import {apiCloseRoom} from "@/shared/(orval)api/gek";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {CtxOfflineMode} from "@/processes/errors-provider-context";
import {storeInvestments} from "@/shared/store/investments/investments";
import {ParentClassForCoin, IconCoin} from "@/shared/ui/icons/icon-coin";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {storeListExchangeRooms} from "@/shared/store/exchange-rooms/exchangeRooms";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {useTranslation} from 'react-i18next';
import {RoomInfo} from "@/shared/(orval)api/gek/model";
import BankCardsCarousel from "@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import NewBankCard from "@/widgets/dashboard/ui/cards/bank-card/NewBankCard";
import {Carousel} from "antd";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";




const SidebarMobile = () => {
    const isOpen = storyToggleSidebar(state => state.isOpen)
    const {t} = useTranslation();

    const navigate = useNavigate();
    const roomInfoModal = useModal();
    const roomCloseModal = useModal();
    const {account} = useContext(CtxRootData);
    const {sm, md} = useContext(BreakpointsContext);
    const {currencies, totalAmount} = useContext(CtxCurrencies);
    const {setRefresh} = useContext(CtxRootData);
    const {offline} = useContext(CtxOfflineMode);
    const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))

    const [isRefreshingFunds, setIsRefreshingFunds] = useState<boolean>(false)
    const [startPoint, setStartPoint] = useState(0);
    const [pullChange, setPullChange] = useState<number>();
    const refreshCont = useRef<HTMLDivElement>();

    const {
        getRoomsList,
        removeRoom: removeExchangeRoom
    } = storeListExchangeRooms(state => state);
    const getInvestments = storeInvestments(state => state.getInvestments);
    const {activeCards, getActiveCards} = storeActiveCards(state => state);
    const {getAccountDetails} = storeAccountDetails(state => state);

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md])

    useEffect(() => {
        if (account) {
            getRoomsList();
            getInvestments();
            getActiveCards();
            getAccountDetails();
        }
    }, [account]);

    let eurWallet = null;
    let eurgWallet = null;
    let gkeWallet = null;
    let secondaryWallets = [];

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
        window.addEventListener("touchstart", (e)=>{pullStart(e, setStartPoint)});
        window.addEventListener("touchmove", (e)=>{pull(e, setPullChange, startPoint)});
        window.addEventListener("touchend", endPull);
        return () => {
            window.removeEventListener("touchstart", (e)=>{pullStart(e, setStartPoint)});
            window.removeEventListener("touchmove", (e)=>{pull(e, setPullChange, startPoint)});
            window.removeEventListener("touchend", endPull);
        };
    });





    return (
            <div id="sidebar" className={`${styles.Sidebar} ${isOpen ? "active" : ""}`}>
                <div className={`${styles.Sidebar} flex flex-col justify-between`}>
                    <div className="wrapper" ref={refreshCont} style={{marginTop: pullChange / 3.118 || ""}}>
                        <div className="p-2 rounded-full w-full flex justify-center ">
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
                        <div style={{backgroundColor: "#f7f7f0"}} className="flex justify-center">
                            <div className={styles.CardInfo}>
                                {offline ? <div className="flex justify-center">
                                    <img
                                        src='/img/payment-card/payment-card-background.jpg'
                                        className='rounded-[10px]'
                                    />
                                </div> : activeCards?.length === 0 ? (
                                    <Carousel>
                                        <div onClick={() => navigate('/wallet/EUR/bank_cards?new')}>
                                            <NewBankCard/>
                                        </div>
                                    </Carousel>
                                ) : (
                                    <div onClick={() => navigate('/wallet/EUR/bank_cards')}>
                                        <BankCardsCarousel cards={activeCards}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <NavLink onClick={NavLinkEvent} to={"wallet/EUR"}>


                            <div className={styles.AssetInfo1}>
                                <span>{"Fiat"}</span>
                            </div>


                            <div className={styles.ItemWrapper}>

                                <div className={`${styles.ItemEuro}`}>
                                    <div className="col flex items-center pl-4">
                                        {/* <svg className={styles.Icon} width="50" height="50" viewBox="0 0 31 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24.0396 42C21.739 42 19.5553 41.7042 17.4887 41.1127C15.422 40.4817 13.5308 39.5549 11.8151 38.3324C10.0994 37.1099 8.61761 35.6113 7.36981 33.8366C6.16101 32.062 5.26415 29.9916 4.67924 27.6254H0V22.893H3.91887C3.87987 22.5775 3.86038 22.262 3.86038 21.9465C3.86038 21.631 3.86038 21.3155 3.86038 21C3.86038 20.6451 3.86038 20.3296 3.86038 20.0535C3.86038 19.738 3.87987 19.4028 3.91887 19.0479H0V14.3155H4.67924C5.26415 11.9887 6.16101 9.93803 7.36981 8.16338C8.61761 6.3493 10.0799 4.8507 11.7566 3.6676C13.4723 2.44507 15.3635 1.53803 17.4302 0.946477C19.4969 0.315492 21.7195 0 24.0981 0C25.3459 0 26.5547 0.0788734 27.7245 0.23662C28.9333 0.394365 30.0252 0.630984 31 0.946477V7.33521C30.2591 7.05915 29.4013 6.84225 28.4264 6.68451C27.4906 6.48732 26.4962 6.38873 25.4434 6.38873C23.5717 6.38873 21.817 6.70423 20.1792 7.33521C18.5805 7.92676 17.1962 8.81408 16.0264 9.99718C14.8566 11.1803 13.9403 12.6197 13.2774 14.3155H26.5547V19.0479H12.166C12.127 19.3239 12.1075 19.6394 12.1075 19.9944C12.1075 20.3099 12.1075 20.6254 12.1075 20.9408C12.1075 21.2958 12.1075 21.6507 12.1075 22.0056C12.1075 22.3211 12.127 22.6169 12.166 22.893H26.5547V27.6254H13.2774C13.9403 29.3211 14.8566 30.7606 16.0264 31.9437C17.2352 33.1268 18.639 34.0338 20.2377 34.6648C21.8365 35.2958 23.5717 35.6113 25.4434 35.6113C26.4962 35.6113 27.4906 35.5127 28.4264 35.3155C29.4013 35.1183 30.2591 34.8817 31 34.6056V40.9352C29.9862 41.2507 28.8748 41.507 27.666 41.7042C26.4962 41.9014 25.2874 42 24.0396 42Z" fill="#285E69" />
                                            </svg> */}
                                        <svg width="50" height="50" viewBox="0 0 50 51" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M25.0001 0.379272C38.8071 0.379272 50 11.5722 50 25.3793C50 39.1864 38.8071 50.3793 25.0001 50.3793C11.1929 50.3793 0 39.1864 0 25.3793C0 11.5722 11.1929 0.379272 25.0001 0.379272Z"
                                                fill="#285E69"/>
                                            <path
                                                d="M7.43047 29.5393V26.7393H28.9505V29.5393H7.43047ZM7.43047 24.0193V21.2193H28.9505V24.0193H7.43047ZM26.3905 39.7793C24.2305 39.7793 22.2305 39.4326 20.3905 38.7393C18.5771 38.0193 17.0038 37.0193 15.6705 35.7393C14.3371 34.4326 13.2971 32.8993 12.5505 31.1393C11.8038 29.3793 11.4305 27.4593 11.4305 25.3793C11.4305 23.2993 11.8038 21.3793 12.5505 19.6193C13.2971 17.8593 14.3371 16.3393 15.6705 15.0593C17.0038 13.7526 18.5771 12.7526 20.3905 12.0593C22.2305 11.3393 24.2305 10.9793 26.3905 10.9793C28.6838 10.9793 30.7771 11.3793 32.6705 12.1793C34.5905 12.9526 36.1905 14.1126 37.4705 15.6593L34.1505 18.8193C33.1371 17.7259 32.0038 16.9126 30.7505 16.3793C29.4971 15.8193 28.1371 15.5393 26.6705 15.5393C25.2038 15.5393 23.8571 15.7793 22.6305 16.2593C21.4305 16.7393 20.3771 17.4193 19.4705 18.2993C18.5905 19.1793 17.8971 20.2193 17.3905 21.4193C16.8838 22.6193 16.6305 23.9393 16.6305 25.3793C16.6305 26.8193 16.8838 28.1393 17.3905 29.3393C17.8971 30.5393 18.5905 31.5793 19.4705 32.4593C20.3771 33.3393 21.4305 34.0193 22.6305 34.4993C23.8571 34.9793 25.2038 35.2193 26.6705 35.2193C28.1371 35.2193 29.4971 34.9526 30.7505 34.4193C32.0038 33.8593 33.1371 33.0193 34.1505 31.8993L37.4705 35.0993C36.1905 36.6193 34.5905 37.7793 32.6705 38.5793C30.7771 39.3793 28.6838 39.7793 26.3905 39.7793Z"
                                                fill="white"/>
                                        </svg>


                                        {/*<img width={50} height={50} className={styles.Icon} src={`/img/tokens/EurIcon.svg`}
                                                alt="EUR" />*/}
                                    </div>
                                    <div className="col flex items-center flex-col pl-5 pt-2 relative">
                                        <div className="row w-full">
                                            <span className={styles.Name}>Euro</span>
                                        </div>
                                        <div className="row w-full font-mono">
                                            <span
                                                className={styles.Sum}>{(eurWallet && toLocaleFiatRounding(eurWallet.availableBalance?.toNumber())) ?? '-'} €</span>
                                        </div>

                                    </div>
                                    <div className={styles.ArrowMobileSidebar}>
                                        <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt=""/>
                                    </div>
                                </div>
                            </div>


                        </NavLink>
                        <div className={styles.AssetInfo1}>
                            <span>{"Crypto Assets"}</span>
                        </div>
                        <NavLink className={!currencies ? "disabled" : ""} onClick={NavLinkEvent}
                                to={!currencies ? "" : "wallet/EURG"}>
                            <div className={styles.ItemWrapper}>
                                <div className={`${styles.Item}`}>
                                    <div className="col flex items-center pl-4">
                                        <img width={50} height={50} src={`/img/tokens/EurgIcon.svg`} alt="EURG"/>
                                    </div>
                                    <div className="col flex items-center justify-center flex-col pl-5">
                                        <div className="row text-gray-400 w-full mb-1">
                                            <span className={styles.Name}>Gekkoin euro token</span>
                                        </div>
                                        <div className="row w-full font-mono">
                                            <span
                                                className={styles.Sum}>{(eurgWallet && toLocaleFiatRounding(eurgWallet.availableBalance?.toNumber())) ?? '-'} EURG</span>
                                        </div>
                                        {eurgWallet && <div className={"row w-full flex justify-between pr-5"}>
                                            <div>
                                                {!eurgWallet.lockInBalance ? null : <span className={styles.Income}>
                                                        +{toLocaleFiatRounding(eurgWallet.lockInBalance) ?? '-'}
                                                    </span>}
                                            </div>
                                            <div className=" text-gray-500 font-mono">
                                                {eurgWallet.userBalanceEUREqu === null ? null :
                                                    <span className={styles.Balance}>
                                                        ~ {toLocaleFiatRounding(eurgWallet.userBalanceEUREqu)} €
                                                    </span>}
                                            </div>
                                        </div>}
                                        <div className={styles.ArrowMobileSidebar}>
                                            <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt=""/>
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
                                        <img width={50} height={50} src={`/img/tokens/GkeIcon.svg`} alt="GKE"/>
                                    </div>
                                    <div className="col flex items-center justify-center flex-col pl-5">
                                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin invest token</span>
                                        </div>
                                        <div className="row w-full font-mono"><span
                                            className={styles.Sum}>{(gkeWallet && toLocaleCryptoRounding(gkeWallet.availableBalance?.toNumber(), gkeWallet.roundPrec)) ?? '-'} GKE</span>
                                        </div>
                                        {gkeWallet && <div className={"row w-full flex justify-between pr-5"}>
                                            <div>
                                                {!gkeWallet.lockInBalance ? null : <span className={styles.Income}>
                                                        +{toLocaleCryptoRounding(gkeWallet.lockInBalance, gkeWallet.roundPrec) ?? '-'}
                                                    </span>}
                                            </div>
                                            <div className=" text-gray-500 font-mono">
                                                {gkeWallet.userBalanceEUREqu === null ? null :
                                                    <span className={styles.Balance}>
                                                        ~ {toLocaleFiatRounding(gkeWallet.userBalanceEUREqu)} €
                                                    </span>}
                                            </div>
                                        </div>}
                                        <div className={styles.ArrowMobileSidebar}>
                                            <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt=""/>
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
                                                <IconCoin code={item.$const}/>
                                            </div>
                                            <div className={"col flex items-center justify-center flex-col"}>
                                                <div className="row w-full mb-1"><span
                                                    className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span>
                                                </div>
                                                <div className="row w-full font-mono"><span
                                                    className={styles.Sum}>{`${toLocaleCryptoRounding(item.availableBalance?.toNumber(), item.roundPrec)} ${item.$const == 'BTC' ? '₿' : item.$const}`}</span>
                                                </div>
                                                <div className={"row w-full flex justify-between pr-5"}>
                                                    <div>
                                                        {!item.lockInBalance ? null : <span className={styles.Income}>
                                                                        +{toLocaleCryptoRounding(item.lockInBalance, item.roundPrec) ?? '-'}
                                                                    </span>}
                                                    </div>
                                                    <div className=" text-gray-500 font-mono">
                                                        {item.userBalanceEUREqu === null ? null :
                                                            <span className={md ? styles.Balance : styles.EuroEqv}>
                                                                        ~ {toLocaleFiatRounding(item.userBalanceEUREqu)} €
                                                                    </span>}
                                                    </div>
                                                </div>
                                                <div className={styles.ArrowMobileSidebar}>
                                                    <img src="/img/icon/ArrowMobileSidebar.svg" width={7} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </NavLink>)
                        )}
                        <div className={styles.AssetInfo5}>
                            <span>{t("total_balance").capitalize()}</span>
                            <span>~ <span
                                data-testid="TotalAmount">{toLocaleFiatRounding(totalAmount?.toNumber()) ?? '-'}</span> €</span>
                        </div>
                        <Modal
                            width={450}
                            open={roomInfoModal.isModalOpen}
                            onCancel={roomInfoModal.handleCancel}
                            title={t("invite_link")}
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
                    </div>
                </div>
            </div>
    )

}

export default SidebarMobile
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import History from "@/widgets/history/ui/History";
import About from "@/widgets/wallet/about/ui/About";
import {CtxRootData} from "@/processes/RootContext";
import WalletHeader from "@/widgets/wallet/header/ui/desktop";
import {useNavigate, useParams} from "react-router-dom";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {AccountRights} from "@/shared/config/account-rights";
import TopUp from "@/widgets/wallet/transfer/top-up/ui/TopUp";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import NoFeeProgram from "@/widgets/wallet/programs/no-fee/ui";
import CardsMenu from "@/widgets/wallet/cards-menu/ui/CardsMenu";
import Withdraw from "@/widgets/wallet/transfer/withdraw/ui/Withdraw";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {getTokenDescriptions} from "@/shared/config/coins/descriptions";
import CashbackProgram from "@/widgets/wallet/programs/cashback/EUR/ui";
import GkeCashbackProgram from "@/widgets/wallet/programs/cashback/GKE/ui";
import NetworkProvider from "@/widgets/wallet/transfer/model/NetworkProvider";
import {QuickExchange} from "@/widgets/wallet/quick-exchange/ui/QuickExchange";
import {mockEUR} from "@/processes/PWA/mock-EUR";
import {useTranslation} from 'react-i18next';
import WalletButtons from "@/shared/ui/wallet-buttons";
import TopUpButton from "@/shared/ui/ButtonsMobile/TopUp";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import ProgramsButton from "@/shared/ui/ButtonsMobile/Programs";
import WalletHeaderMobile from "@/widgets/wallet/header/ui/mobile";
import Programs from "@/widgets/programs/ui";
import { pull, pullStart } from "@/shared/lib";


function Wallet() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {currency, tab} = useParams();
    const {account} = useContext(CtxRootData);
    const {xxxl, xxl, xl, lg, md} = useContext(BreakpointsContext);
    const {currencies} = useContext(CtxCurrencies);
    const descriptions = getTokenDescriptions(navigate, account);
    const [isNewCardOpened, setIsNewCardOpened] = useState(false);
    const [needMobile, setNeedMobile] = useState<boolean>(false)

    // TODO: Почему не используются брейкпоинты?
    useEffect(() => {
        if(window.innerWidth < 970 || window.innerWidth > 1200 ){
            setNeedMobile(true)
        }else{
            setNeedMobile(false)
        }
        
        function handleResize() {
            if(window.innerWidth < 970 || window.innerWidth > 1200 ){
                setNeedMobile(true)
            }else{
                setNeedMobile(false)
            }
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    
    let $currency = mockEUR;

    if (currencies) {
        //@ts-ignore
        $currency = currencies.get(currency);
    }

    const isCryptoWallet = !(currency === "EUR" || currency === "EURG" || currency === "GKE")

    // const $const = currencies.get(currency)
    const isOnAboutPage = tab === "about";
    const isOnProgramsPage = tab === "programs";
    const isOnNoFeeProgramPage = tab === "no_fee_program";
    const isOnCashbackProgramPage = tab === "cashback_program";
    const isOnTopUpPage = tab === "top_up";
    const isCardsMenu = tab === "bank_cards";
    const isQuickExchange = tab === "simple_exchange";
    const isEURG: boolean = currency === 'EURG';
    const isEUR: boolean = currency === 'EUR';
    const isGKE: boolean = currency === 'GKE';
    
    const currencyForHistory = useMemo(() => [$currency.$const], [currency]);
    const fullWidthOrHalf = useMemo(() => (xl ? 1 : 2), [xl]);

    const [isRefreshingFunds, setIsRefreshingFunds] = useState<boolean>(false)
    const [startPoint, setStartPoint] = useState(0);
    const [pullChange, setPullChange] = useState<number>();
    const refreshCont = useRef<HTMLDivElement>();
    const {setRefresh} = useContext(CtxRootData);


    const initLoading = () => {
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
        if(md){
            window.addEventListener("touchstart", (e)=>{pullStart(e, setStartPoint)});
            window.addEventListener("touchmove", (e)=>{pull(e, setPullChange, startPoint)});
            window.addEventListener("touchend", endPull);
            return () => {
                window.removeEventListener("touchstart", (e)=>{pullStart(e, setStartPoint)});
                window.removeEventListener("touchmove", (e)=>{pull(e, setPullChange, startPoint)});
                window.removeEventListener("touchend", endPull);
            };
        }      
    });


    return (
        <div ref={refreshCont} style={{marginTop: (pullChange / 3.118) || "0px"}} className="flex flex-col h-full w-full">
            
            <div className="rounded-full w-full flex justify-center ">
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
            {/*@ts-ignore*/}
            
            <CtxWalletData.Provider value={$currency}>
                {md?<WalletHeaderMobile/>:<WalletHeader/>}
                {!md ?
                    <TabsGroupPrimary initValue={tab ? tab : "top_up"} callInitValue={{account, tab: tab}}>
                        <div className="grid" style={{gridTemplateColumns: `repeat(${fullWidthOrHalf}, minmax(0, 1fr))`}}>
                            <div className="substrate z-10 w-inherit relative min-h-[200px]">
                                <NetworkProvider data-tag={"top_up"} data-name={t("top_up_wallet")}>
                                    <TopUp/>
                                </NetworkProvider>

                                <NetworkProvider data-tag={"withdraw"} data-name={t("withdraw")}>
                                    <Withdraw/>
                                </NetworkProvider>

                                {/* TODO: Зачем передача needMobile через 3 файла? */}
                                {(isEUR || isEURG || isGKE) &&
                                    <Programs needMobile={needMobile} data-tag={"programs"} data-name={t("programs")}/>
                                }
                                {$currency.$const === "EUR" && account?.rights && !account?.rights[AccountRights.IsJuridical] && <>
                                    <CardsMenu
                                        data-tag={"bank_cards"}
                                        data-name={t("bank_cards")}
                                        isNewCardOpened={isNewCardOpened}
                                        setIsNewCardOpened={setIsNewCardOpened}
                                    />
                                    <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/>
                                </>}

                                {tab === "cashback_program" &&
                                    <GkeCashbackProgram/>
                                }
                                {tab === "no_fee_program" &&
                                    <NoFeeProgram />
                                }

                                {!Object.keys(descriptions).find((k: string) => k === $currency.$const) ? null : (
                                    <About data-tag={"about"} data-name={t("about")}
                                        description={descriptions[$currency.$const]}/>
                                )}

	                            {xl && <History currenciesFilter={currencyForHistory} data-tag={"history"}
	                                            data-name={t("history")}/>}
	                        </div>
	                        
	                        {!xl && <div className="substrate z-0 -ml-4 h-full">
	                            <History currenciesFilter={currencyForHistory}/>
	                        </div>}
	                    </div>
	                </TabsGroupPrimary> 
				:
	                <>
                        {!(isOnProgramsPage ||isOnNoFeeProgramPage || isOnCashbackProgramPage) && 
                            <WalletButtons crypto={isCryptoWallet}>
                                <TopUpButton currency={currency} wallet/>
                                <TransfersButton currency={currency} wallet/>
                                <ExchangeButton wallet/>
                                {!isCryptoWallet && <ProgramsButton wallet/>}
                            </WalletButtons>
                        }
                        {!(isQuickExchange || isCardsMenu || isOnAboutPage || isOnProgramsPage || isOnNoFeeProgramPage || isOnCashbackProgramPage || isOnTopUpPage) &&
                            <History 
                                data-tag={"history"}
                                data-name={t("history")} 
                                currenciesFilter={currencyForHistory}
                            />
                        }
                        {isOnAboutPage &&
                            (
                                !Object.keys(descriptions).find((k: string) => k === $currency.$const) ? null : (
                                    <About 
                                        data-tag={"about"} 
                                        data-name={t("about")}
                                        description={descriptions[$currency.$const]}
                                    />
                                )
                            )
                        }
                        {isOnProgramsPage &&
                            <Programs needMobile={true} data-tag={"programs"} data-name={t("programs")}/>
                        }
                        {isCardsMenu &&
                            <div className="mt-4">
                                <CardsMenu
                                    data-tag={"bank_cards"}
                                    data-name={t("bank_cards")}
                                    isNewCardOpened={isNewCardOpened}
                                    setIsNewCardOpened={setIsNewCardOpened}
                                />
                            </div>
                        }
                        {isQuickExchange && (
                            <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/>
                        )}
                        {isOnNoFeeProgramPage &&
                            <NoFeeProgram data-tag={"no_fee_program"} data-name={t("no_fee_program")}/>
                        }
                        {isOnCashbackProgramPage &&
                           <GkeCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
                        }
                        {tab === "top_up" &&
                            <div className="mt-5 min-h-[200px] relative">
                                <NetworkProvider data-tag={"top_up"} data-name={t("top_up_wallet")}>
                                    <TopUp/>
                                </NetworkProvider>
                            </div>
                        }
                    </>
                }
            </CtxWalletData.Provider>
        </div>
    );
};

export default Wallet;

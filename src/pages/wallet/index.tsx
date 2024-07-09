import {useContext, useEffect, useMemo, useState} from "react";
import History from "@/widgets/history/ui/History";
import About from "@/widgets/wallet/about/ui/About";
import {CtxRootData} from "@/processes/RootContext";
import WalletHeader from "@/widgets/wallet/header/ui/desktop";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {AccountRights} from "@/shared/config/mask-account-rights";
import TopUp from "@/widgets/wallet/transfer/top-up/ui/TopUp";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import NoFeeProgram from "@/widgets/wallet/programs/no-fee/ui";
import CardsMenu from "@/widgets/cards-menu/ui";
import Withdraw from "@/widgets/wallet/transfer/withdraw/ui/Withdraw";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {getTokenDescriptions} from "@/shared/config/coins/descriptions";
import NetworkProvider from "@/widgets/wallet/transfer/model/NetworkProvider";
// import {QuickExchange} from "@/widgets/wallet/quick-exchange/ui/QuickExchange";
import {mockEUR} from "@/processes/PWA/mock-EUR";
import {useTranslation} from 'react-i18next';
import WalletButtons from "@/shared/ui/wallet-buttons";
import TopUpButton from "@/shared/ui/ButtonsMobile/TopUp";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import ProgramsButton from "@/shared/ui/ButtonsMobile/Programs";
import WalletHeaderMobile from "@/widgets/wallet/header/ui/mobile";
import CardsMenuButton from "@/shared/ui/ButtonsMobile/CardsMenu";
import {IS_GEKKARD_APP} from "@/shared/lib/";
import Programs from "@/widgets/wallet/programs/CashbackCard";
import GkeCashbackProgram from "@/widgets/wallet/programs/GKE/ui";
import FeeProvider from "@/widgets/wallet/transfer/model/FeeProvider";
import styles from './styles.module.scss'
import Wrapper from "@/shared/ui/wrapper";

function Wallet() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const tab = params.get("tab");
    const currency = params.get("currency");
    const {account} = useContext(CtxRootData);
    const {currencies} = useContext(CtxCurrencies);
    const {xl, md} = useContext(BreakpointsContext);
    const descriptions = getTokenDescriptions(navigate, account);

    const gekkardMode = IS_GEKKARD_APP();

    let $currency = mockEUR;

    if (currencies) {
        //@ts-ignore
        $currency = currencies.get(currency) ? currencies.get(currency) : mockEUR;
    }

    const isOnAboutPage = tab === "about";
    const isOnProgramsPage = tab === "programs";
    const isOnNoFeeProgramPage = tab === "no_fee_program";
    const isOnCashbackProgramPage = tab === "cashback_program";
    const isOnTopUpPage = tab === "top_up";
    const isCardsMenu = tab === "bank_cards";
    // const isQuickExchange = tab === "simple_exchange";
    const isEURG: boolean = currency === 'EURG';
    const isEUR: boolean = currency === 'EUR';
    const isGKE: boolean = currency === 'GKE';

    const currencyForHistory = useMemo(() => [currency], [currency]);
    const fullWidthOrHalf = useMemo(() => (xl ? 1 : 2), [xl]);

    useEffect(() => {
        if (currencies && !currencies.get(currency) || (!gekkardMode && currency === "EUR")) {

            navigate("404")
        }
    }, [currencies])

    const isShownTabs = !(isOnAboutPage)

    return (
        <div className="flex flex-col h-full md:items-center w-full">
            {/*@ts-ignore*/}

            <CtxWalletData.Provider value={$currency}>
                {md ? <WalletHeaderMobile/> : <WalletHeader/>}
                {!md ?
                    <TabsGroupPrimary initValue={tab ? tab : "top_up"} callInitValue={{account, tab: tab}}>
                        <div className="grid" style={{gridTemplateColumns: `repeat(${fullWidthOrHalf}, minmax(0, 1fr))`}}>
                            <div className="shadow-[0_3px_4px_#00000040] bg-[#fff] p-[40px] rounded-[10px] mb-[4px] w-inherit flex justify-center relative min-h-[600px]">
                                <NetworkProvider data-tag={"top_up"} data-name={t("top_up_wallet")}>
                                    <TopUp/>
                                </NetworkProvider>

                                <NetworkProvider data-tag={"withdraw"} data-name={t("withdraw")}>
                                    <FeeProvider data-name={t("withdraw")}>
                                        <Withdraw/>
                                    </FeeProvider>
                                </NetworkProvider>

                                {IS_GEKKARD_APP() && (isEUR || isEURG || isGKE) &&
                                    <Programs data-tag={"programs"} data-name={t("programs")}/>
                                }
                                {$currency.$const === "EUR" && account?.rights && !account?.rights[AccountRights.IsJuridical] && (
                                    <>
                                        <CardsMenu
                                            data-tag={"bank_cards"}
                                            data-name={t("bank_cards")}
                                        />
                                        {/* <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/> */}
                                    </>
                                )}

                                {IS_GEKKARD_APP() && tab === "cashback_program" &&
                                    <GkeCashbackProgram/>
                                }
                                {IS_GEKKARD_APP() && tab === "no_fee_program" &&
                                    <NoFeeProgram/>
                                }

                                {!Object.keys(descriptions).find((k: string) => k === $currency.$const) ? null : (
                                    <About
                                        data-tag={"about"}
                                        data-name={t("about")}
                                        description={descriptions[$currency.$const]}
                                    />
                                )}

                                {xl && (
                                  <History
                                    data-tag={"history"}
                                    data-name={t("history")}
                                    currenciesFilter={currencyForHistory}
                                  />
                                )}
                            </div>

                            {!xl && (
                              <div className={styles.TopUpHistoryWrap}>
                                <div className={styles.TopUpHistoryBody}>
                                    <History currenciesFilter={currencyForHistory}/>
                                </div>
                              </div>
                            )}
                        </div>
                    </TabsGroupPrimary>
                    :
                    <>
                        {isShownTabs &&
                            <WalletButtons isMainWallet={isEUR || isEURG || isGKE}>
                                <TopUpButton to={`/wallet?currency=${currency}&tab=top_up`}/>
                                <TransfersButton isActive to={`/transfers?currency=${currency}`}/>

                                {!IS_GEKKARD_APP() ? null : !isEUR
                                    ? <ExchangeButton isActive to={`/exchange?from=${currency}`}/>
                                    : <CardsMenuButton to={"/card-menu"}/>
                                }

                                {IS_GEKKARD_APP() && (isEUR || isEURG || isGKE) &&
                                    <ProgramsButton to={`/wallet?currency=${currency}&tab=programs`}/>}
                            </WalletButtons>
                        }
                        {!(/*isQuickExchange ||*/ isCardsMenu || isOnAboutPage || isOnProgramsPage || isOnNoFeeProgramPage || isOnCashbackProgramPage || isOnTopUpPage) &&
                            <History
                                className="mb-[40px]"
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
                        {isCardsMenu &&
                            <div className="mt-4">
                                <CardsMenu
                                    data-tag={"bank_cards"}
                                    data-name={t("bank_cards")}
                                />
                            </div>
                        }
                        {/* {isQuickExchange && (
                            <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/>
                        )} */}
                        {IS_GEKKARD_APP() && isOnNoFeeProgramPage &&
                            <NoFeeProgram data-tag={"no_fee_program"} data-name={t("no_fee_program")}/>
                        }
                        {IS_GEKKARD_APP() && isOnCashbackProgramPage &&
                            <GkeCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
                        }
                        {tab === "top_up" &&
                            <Wrapper className="md:px-[10px]">
                                <div className="w-full mt-5 min-h-[200px] relative mb-[70px]">
                                    <NetworkProvider data-tag={"top_up"} data-name={t("top_up_wallet")}>
                                        <TopUp/>
                                    </NetworkProvider>
                                </div>
                            </Wrapper>
                        }
                        {tab === "programs" &&
                            <div className="min-h-[200px] relative mb-[70px]">
                                <Programs data-tag={"programs"} data-name={t("programs")}/>
                            </div>
                        }
                    </>
                }
            </CtxWalletData.Provider>
        </div>
    );
};

export default Wallet;

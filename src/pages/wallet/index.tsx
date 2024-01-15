import {useContext, useMemo} from "react";
import History from "@/widgets/history/ui/History";
import About from "@/widgets/wallet/about/ui/About";
import {CtxRootData} from "@/processes/RootContext";
import WalletHeader from "@/widgets/wallet/header/ui";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Transfer from "../../widgets/wallet/code-transfer";
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
import EurCashbackProgram from "@/widgets/wallet/programs/cashback/EUR/ui";
import GkeCashbackProgram from "@/widgets/wallet/programs/cashback/GKE/ui";
import NetworkProvider from "@/widgets/wallet/transfer/model/NetworkProvider";
import {QuickExchange} from "@/widgets/wallet/quick-exchange/ui/QuickExchange";
import {Trans, useTranslation} from 'react-i18next';
import WalletButtons from "@/shared/ui/wallet-buttons";
import TopUpButton from "@/shared/ui/ButtonsMobile/TopUp";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import ProgramsButton from "@/shared/ui/ButtonsMobile/Programs";


const mockEUR = {
    "id": 0,
    "name": "Euro",
    "flags": {
        "none": false,
        "structInvestAvailable": false,
        "exchangeAvailable": false,
        "fiatCurrency": true,
        "accountAvailable": false
    },
    "$const": "EUR",
    "minOrder": 0,
    "roundPrec": 2,
    "ordersPrec": 4,
    "decimalPrec": 8,
    "defaultTokenNetworkIn": 0,
    "defaultTokenNetworkOut": 0,
    "lockOrders": null,
    "userBalance": null,
    "lockInBalance": 0,
    "lockOutBalance": 0,
    "availableBalance": null,
    "userBalanceEUREqu": null
}


function Wallet() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {currency, tab} = useParams();
    const {account} = useContext(CtxRootData);
    const {xl, md} = useContext(BreakpointsContext);
    const {currencies} = useContext(CtxCurrencies);
    const descriptions = getTokenDescriptions(navigate, account);

    let $currency = mockEUR;

    if (currencies) {
        //@ts-ignore
        $currency = currencies.get(currency);
    }
    
    const fullWidthOrHalf = useMemo(() => xl ? 1 : 2, [xl]);
    const currencyForHistory = useMemo(() => [$currency.$const], [currency]);
    
    return (
        <div className="flex flex-col h-full w-full">
            {/*@ts-ignore*/}
            <CtxWalletData.Provider value={$currency}>
                <WalletHeader/>
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

                                <Transfer data-tag={"funds_transfer"} data-name={t("funds_transfer")}/>

                                {$currency.$const === "EUR" && account?.rights && !account?.rights[AccountRights.IsJuridical] && <>
                                    <EurCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
                                    <CardsMenu data-tag={"bank_cards"} data-name={t("bank_cards")}/>
                                    <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/>
                                </>}

                                {$currency.$const === "GKE" && account?.rights && !account?.rights[AccountRights.IsJuridical] && <>
                                    <GkeCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")}/>
                                    <NoFeeProgram data-tag={"no_fee_program"} data-name={t("no_fee_program")}/>
                                </>}

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
                    //для мобилки в разработке... 
                    <WalletButtons>
                        <TopUpButton wallet/>
                        <TransfersButton wallet/>
                        <ExchangeButton wallet/>
                        <ProgramsButton wallet/>
                    </WalletButtons>
                }
            </CtxWalletData.Provider>
        </div>
    );
};

export default Wallet;

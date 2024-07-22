import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import History from "@/widgets/history/ui/History";
import About from "@/widgets/wallet/about/ui/About";
import { CtxRootData } from "@/processes/RootContext";
import WalletHeader from "@/widgets/wallet/header/ui/desktop";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { AccountRights } from "@/shared/config/mask-account-rights";
import TopUp from "@/widgets/wallet/transfer/top-up/ui/TopUp";
import axios from "axios";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import NoFeeProgram from "@/widgets/wallet/programs/no-fee/ui";
import CardsMenu from "@/widgets/cards-menu/ui";
import Withdraw from "@/widgets/wallet/transfer/withdraw/ui/Withdraw";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { getTokenDescriptions } from "@/shared/config/coins/descriptions";
import NetworkProvider from "@/widgets/wallet/transfer/model/NetworkProvider";
// import {QuickExchange} from "@/widgets/wallet/quick-exchange/ui/QuickExchange";
import { mockEUR } from "@/processes/PWA/mock-EUR";
import WalletButtons from "@/shared/ui/wallet-buttons";
import TopUpButton from "@/shared/ui/ButtonsMobile/TopUp";
import TransfersButton from "@/shared/ui/ButtonsMobile/Transfers";
import ExchangeButton from "@/shared/ui/ButtonsMobile/Exchange";
import ProgramsButton from "@/shared/ui/ButtonsMobile/Programs";
import WalletHeaderMobile from "@/widgets/wallet/header/ui/mobile";
import CardsMenuButton from "@/shared/ui/ButtonsMobile/CardsMenu";
import { IS_GEKKARD_APP, IS_GEKKOIN_APP } from "@/shared/lib/";
import Programs from "@/widgets/wallet/programs/CashbackCard";
import GkeCashbackProgram from "@/widgets/wallet/programs/GKE/ui";
import FeeProvider from "@/widgets/wallet/transfer/model/FeeProvider";
import Wrapper from "@/shared/ui/wrapper";
import { Table } from "../settings/components/MyReports/components/Table";
import { apiGetStatements, StatementsByIBAN } from "@/shared/api/statements";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import useError from "@/shared/model/hooks/useError";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { AreaWrapper } from "../settings/components/AreaWrapper";
import { apiGetUas } from "@/shared/(orval)api";
import Loader from "@/shared/ui/loader";

function Wallet() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tab = params.get("tab");
  const [currencyFrom, setCurrencyFrom] = useState(params.get('currency'))
  const [currencyTo, setCurrencyTo] = useState(params.get('currency'))
  const currency = params.get("currency");
  const {uasToken, getUasToken} = useContext(UasConfirmCtx)
  const { account } = useContext(CtxRootData);
  const { getAccountDetails } = storeAccountDetails(state => state);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();
  const { currencies } = useContext(CtxCurrencies);
  const { xl, md } = useContext(BreakpointsContext);
  // const [uasToken, setUasToken] = useState<string>(null);
  const descriptions = getTokenDescriptions(navigate, account, t);
  const [statements, setStatements] = useState<{ [key: string]: StatementsByIBAN[] }>(null);

  const gekkardMode = IS_GEKKARD_APP();
  const gekkoinMod = IS_GEKKOIN_APP();
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
  const isEURG: boolean = currency === "EURG";
  const isEUR: boolean = currency === "EUR";
  const isGKE: boolean = currency === "GKE";

  const currencyForHistory = useMemo(() => [currency], [currency]);
  const fullWidthOrHalf = useMemo(() => (xl ? 1 : 2), [xl]);

  useEffect(() => {
    if ((currencies && !currencies.get(currency)) || (!gekkardMode && currency === "EUR")) {
      navigate("404");
    }
    if (gekkoinMod && currency !== "GKE" && currency !== "EURG") {
      navigate("404");
    }
  }, [currencies, currency, gekkoinMod, navigate]);

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    const cancelTokenSource = axios.CancelToken.source();

    if(uasToken) {
      (async () => {
        localErrorClear();
  
        const { phone } = await getAccountDetails();
        const { data } = await apiGetStatements({
          headers: {
            Authorization: phone,
            Token: uasToken
          },
          cancelToken: cancelTokenSource.token
        });
  
        if (data.errors) {
          localErrorHunter({
            code: data.errors.code,
            message: `Loading Report issue #${data.errors.code}`
          });
          return;
        }
  
        setStatements(data.statements);
      })();
    } else {
      getUasToken()
    }

    return () => cancelTokenSource.cancel();
  }, []);

  useEffect(() => {
    if(params.get('currency') === 'EUR') {
      setCurrencyFrom('')
    } else {
      setCurrencyFrom(params.get('currency'))
    }

    if(params.get('currency') === 'EURG') {
      setCurrencyTo('')
    } else {
      setCurrencyTo('EURG')
    }
  }, [params])

  const isShownTabs = !isOnAboutPage;

  return (
    <div className='flex flex-col h-full w-full'>
      {/*@ts-ignore*/}

      <CtxWalletData.Provider value={$currency}>
        {md ? <WalletHeaderMobile /> : <WalletHeader />}
        {!md ? (
          <TabsGroupPrimary initValue={tab ? tab : "top_up"} callInitValue={{ account, tab: tab }}>
            <div className='grid' style={{ gridTemplateColumns: `repeat(${fullWidthOrHalf}, minmax(0, 1fr))` }}>
              <div className='shadow-[0_3px_4px_#00000040] bg-[#fff] p-[40px] rounded-[10px] mb-[4px] w-inherit relative min-h-[600px]'>
                <NetworkProvider data-tag={"top_up"} data-name={t("top_up_wallet")}>
                  <TopUp />
                </NetworkProvider>

                <NetworkProvider data-tag={"withdraw"} data-name={t("withdraw")}>
                  <FeeProvider data-name={t("withdraw")}>
                    <Withdraw />
                  </FeeProvider>
                </NetworkProvider>

                {IS_GEKKARD_APP() && (isEUR || isEURG || isGKE) && (
                  <Programs data-tag={"programs"} data-name={t("programs")} />
                )}
                {$currency.$const === "EUR" && account?.rights && !account?.rights[AccountRights.IsJuridical] && (
                  <>
                    <CardsMenu data-tag={"bank_cards"} data-name={t("bank_cards")} />
                    {/* <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/> */}
                  </>
                )}

                {IS_GEKKARD_APP() && tab === "cashback_program" && <GkeCashbackProgram />}
                {IS_GEKKARD_APP() && tab === "no_fee_program" && <NoFeeProgram />}

                {!Object.keys(descriptions).find((k: string) => k === $currency.$const) ? null : (
                  <About data-tag={"about"} data-name={t("about")} description={descriptions[$currency.$const]} />
                )}

                {
                  isEUR && (
                    <div data-tag={"reports"} data-name={"reports"}>
                      {
                        statements === null ? (
                          <div className='w-full min-h-[100px]'>
                            <Loader className='relative' />
                          </div>
                        ) : (
                          <Wrapper isWeb>
                            {localIndicatorError ? (
                              <AreaWrapper title={t("my_reports")}>
                                <p className={'text-fs12 font-normal'}>{localErrorInfoBox}</p>
                              </AreaWrapper>
                            ) : (
                              <div className='flex flex-col'>
                                <Table statements={statements} uasToken={uasToken} />
                              </div>
                            )}
                          </Wrapper>
                        )
                      }
                    </div>
                  )
                }

                {xl && (
                  <Wrapper>
                    <History data-tag={"history"} data-name={t("history")} currenciesFilter={currencyForHistory} />
                  </Wrapper>
                )}
              </div>

              {!xl && (
                <div className='z-0 shadow-[0_3px_4px_#00000040] bg-[#fff] p-[37px_20px] rounded-[10px] -ml-[2px] mb-[4px]'>
                  <Wrapper isWeb>
                    <History currenciesFilter={currencyForHistory} />
                  </Wrapper>
                </div>
              )}
            </div>
          </TabsGroupPrimary>
        ) : (
          <>
            {isShownTabs && (
              <WalletButtons isMainWallet={isEUR || isEURG || isGKE}>
                <TopUpButton to={`/wallet?currency=${currency}&tab=top_up`} state={`/wallet?currency=${currency}`} />
                <TransfersButton
                  isActive
                  to={`/transfers?currency=${currency}`}
                  state={`/wallet?currency=${currency}`}
                />

                {!IS_GEKKARD_APP() ? null : !isEUR ? (
                  <ExchangeButton isActive to={currencyFrom || currencyTo ? `/exchange?${currencyFrom && `from=${currencyFrom}`}${currencyTo && `&to=${currencyTo}`}` : '/exchange'} state={`/wallet?currency=${currency}`} />
                ) : (
                  <CardsMenuButton to={"/card-menu"} state={`/wallet?currency=${currency}`} />
                )}

                {IS_GEKKARD_APP() && (isEUR || isEURG || isGKE) && (
                  <ProgramsButton
                    to={`/wallet?currency=${currency}&tab=programs`}
                    state={`/wallet?currency=${currency}`}
                  />
                )}
              </WalletButtons>
            )}
            {!(
              /*isQuickExchange ||*/ (
                isCardsMenu ||
                isOnAboutPage ||
                isOnProgramsPage ||
                isOnNoFeeProgramPage ||
                isOnCashbackProgramPage ||
                isOnTopUpPage
              )
            ) && (
              <Wrapper className={"px-[10px]"}>
                <History
                  className='mb-[40px]'
                  data-tag={"history"}
                  data-name={t("history")}
                  currenciesFilter={currencyForHistory}
                />
              </Wrapper>
            )}
            {isOnAboutPage &&
              (!Object.keys(descriptions).find((k: string) => k === $currency.$const) ? null : (
                <About data-tag={"about"} data-name={t("about")} description={descriptions[$currency.$const]} />
              ))}
            {isCardsMenu && (
              <div className='mt-4'>
                <CardsMenu data-tag={"bank_cards"} data-name={t("bank_cards")} />
              </div>
            )}
            {/* {isQuickExchange && (
                            <QuickExchange data-tag={"simple_exchange"} data-name={t("simple_exchange")}/>
                        )} */}
            {IS_GEKKARD_APP() && isOnNoFeeProgramPage && (
              <NoFeeProgram data-tag={"no_fee_program"} data-name={t("no_fee_program")} />
            )}
            {IS_GEKKARD_APP() && isOnCashbackProgramPage && (
              <GkeCashbackProgram data-tag={"cashback_program"} data-name={t("cashback_program")} />
            )}
            {tab === "top_up" && (
              <Wrapper className='px-[10px] mt-5 min-h-[200px] relative'>
                <NetworkProvider data-tag={"top_up"} data-name={t("top_up_wallet")}>
                  <TopUp />
                </NetworkProvider>
              </Wrapper>
            )}
            {tab === "programs" && (
              <div className='mt-5 min-h-[200px] relative'>
                <Programs data-tag={"programs"} data-name={t("programs")} />
              </div>
            )}
          </>
        )}
      </CtxWalletData.Provider>
    </div>
  );
}

export default Wallet;

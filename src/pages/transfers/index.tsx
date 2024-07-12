import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { useQuery } from "@/shared/lib";
import Loader from "@/shared/ui/loader";
import TransfersWrapper from "@/widgets/wallet/transfer/mobile/model/TransfersWrapper";
import GetDisplayedForm from "@/widgets/wallet/transfer/mobile/ui/get-displayed-form";
import SelectCurrency from "@/widgets/wallet/transfer/mobile/ui/select-currency";
import NetworkProvider from "@/widgets/wallet/transfer/model/NetworkProvider";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import ChooseNetworkMobile from "@/widgets/wallet/transfer/mobile/ui/choose-network-mobile";
import FeeProvider from "@/widgets/wallet/transfer/model/FeeProvider";

import HistoryWrapper from "./history-wrapper/HistoryWrapper";

export default function Transfers() {
  const query = useQuery();
  const { t } = useTranslation();
  const [curr, setCurr] = useState<string>();
  const { currencies } = useContext(CtxCurrencies);
  const [network, setNetwork] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [$currency, setCurrency] = useState<ICtxCurrency>();

  useEffect(() => {
    setLoading(true);

    if (query.get("currency")) {
      setCurr(query.get("currency"));
    }

    if (query.get("type")) {
      setNetwork(+query.get("type"));
    }
  }, []);

  useEffect(() => {
    if (currencies && curr) {
      if (currencies?.get(curr) === undefined) {
        setLoading(false); // TODO: сделать ошибку при несуществующем токене
      } else {
        setCurrency(currencies?.get(curr));
      }
    }
  }, [currencies, curr]);

  return !currencies ? (
    <Loader />
  ) : (
    <div className='mb-20'>
      {!curr || !$currency ? (
        <TransfersWrapper
          loading={loading}
          setLoading={setLoading}
          network={network}
          setNetwork={setNetwork}
          curr={curr}
          setCurr={setCurr}
        >
          <SelectCurrency
            setCurrency={setCurrency}
            setNetwork={setNetwork}
            data-tag={"select_currency"}
            currency={curr}
            setCurr={setCurr}
          />
          {curr && (
            <ChooseNetworkMobile
              loading={loading}
              setNetwork={setNetwork}
              network={network}
              data-tag={"choose_network"}
            />
          )}
        </TransfersWrapper>
      ) : (
        <CtxWalletData.Provider value={$currency}>
          <NetworkProvider data-tag={"withdraw"} data-name={t("withdraw")}>
            <HistoryWrapper>
              <TransfersWrapper
                loading={loading}
                setLoading={setLoading}
                network={network}
                setNetwork={setNetwork}
                curr={curr}
                setCurr={setCurr}
              >
                <SelectCurrency
                  setCurrency={setCurrency}
                  data-tag={"select_currency"}
                  currency={curr}
                  setCurr={setCurr}
                  setNetwork={setNetwork}
                />
                {curr && (
                  <ChooseNetworkMobile
                    loading={loading}
                    setNetwork={setNetwork}
                    network={network}
                    data-tag={"choose_network"}
                  />
                )}

                {network && (
                  <div data-tag={"main"} className='w-full align-center'>
                    <FeeProvider data-name={t("withdraw")}>
                      <GetDisplayedForm network={network} curr={$currency} />
                    </FeeProvider>
                  </div>
                )}
              </TransfersWrapper>
            </HistoryWrapper>
          </NetworkProvider>
        </CtxWalletData.Provider>
      )}
    </div>
  );
}

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/widgets/exchange/ui/style.module.scss";
import PercentSelector from "@/shared/ui/input-currency/ui/percent-selector/PercentSelector";
import { SelectToken } from "@/widgets/exchange/components/selectToken/SelectToken";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { IconApp } from "@/shared/ui/icons/icon-app";
import PriceField from "@/widgets/exchange/ui/price-field/PriceField";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import DepthOfMarket from "@/widgets/exchange/ui/depth-of-market/DepthOfMarket";
import Button from "@/shared/ui/button/Button";
import { IExchangeField, IExchangePrice } from "@/widgets/exchange/model/types";
import { RoomInfo } from "@/shared/(orval)api/gek/model";
import { ICtxCurrency } from "@/processes/CurrenciesContext";
import Wrapper from "@/shared/ui/wrapper";

interface IExchangeCreateOrderProps {
  currencies: Map<string, ICtxCurrency>;
  to: IExchangeField;
  from: IExchangeField;
  price: IExchangePrice;
  isLimitOrder: boolean;
  hasValidationError: boolean;
  roomInfo: RoomInfo | null;
  roomType: "default" | "creator" | "visitor";
  showModal: () => void;
  onCurrenciesSwap?: () => void;
  onIsLimitOrderChange?: () => void;
  onToValueChange?: (value: string) => void;
  onFromValueChange?: (value: string) => void;
  onToCurrencyChange?: (value: string) => void;
  onFromCurrencyChange?: (value: string) => void;
  setHasValidationError: Dispatch<SetStateAction<boolean>>;
}

const ExchangeCreateOrder: FC<IExchangeCreateOrderProps> = ({
  currencies,
  hasValidationError,
  from,
  price,
  roomType,
  roomInfo,
  isLimitOrder,
  showModal,
  onToValueChange,
  onCurrenciesSwap,
  onFromValueChange,
  onToCurrencyChange,
  onFromCurrencyChange,
  onIsLimitOrderChange,
  to,
  setHasValidationError
}) => {
  const [, setMinOrder] = useState<number | null>();

  useEffect(() => {
    setMinOrder(currencies.get(from.currency)?.minOrder);
  }, [from]);

  const { t } = useTranslation();

  return (
    <div className={"w-full md:bg-white md:pt-[15px]"}>
      <Wrapper isWeb className={"md:px-[10px]"}>
        <div className={`${styles.Grid}`}>
          <div className='h-full flex flex-col justify-between'>
            <div className='flex flex-col w-full gap-[5px]'>
              <div className={styles.FromBlockWrap}>
                <span className={`md:ml-[7px] ${styles.FieldPreTitle}`}>{t("exchange.you_pay")}:</span>
                <PercentSelector
                  className=''
                  mobileSecHidden
                  onSelect={onFromValueChange}
                  currency={currencies.get(from.currency)}
                />
              </div>
              <SelectToken
                isBalance={true}
                balanceFilter
                roomType={roomType}
                currency={from.currency}
                value={from.amount ?? ""}
                onSelect={onFromCurrencyChange}
                onError={setHasValidationError}
                onChange={onFromValueChange}
                excludedCurrencies={[from.currency, to.currency]}
                allowedFlags={[CurrencyFlags.ExchangeAvailable]}
              />
            </div>
            <div className={`flex justify-center ${styles.FieldsSpacer}`}>
              <div
                onClick={onCurrenciesSwap}
                className={`${styles.SwapButton} ${!(from.currency && to.currency) ? styles.Disabled : ""}`}
              >
                <IconApp code='t36' size={17} color='#B9B9B5' />
              </div>
            </div>

            <div className='flex flex-col w-full gap-[5px]'>
              <div className={`${styles.FieldPreTitle}`}>{t("exchange.get_no_less")}:</div>

              <SelectToken
                isBalance={false}
                roomType={roomType}
                currency={to.currency}
                value={to.amount ?? ""}
                onChange={onToValueChange}
                onSelect={onToCurrencyChange}
                excludedCurrencies={[from.currency, to.currency]}
                allowedFlags={[CurrencyFlags.ExchangeAvailable]}
              />
            </div>
            <div className='mt-3 md:mt-2 flex flex-col gap-[0]'>
              <div className={`${styles.FieldPreTitle} mb-[-2px] ml-[10px]`}>{t("price")}:</div>
              <PriceField disabled={!isLimitOrder} />
            </div>

            {/* {roomType === "creator" && (
              <div className='mt-6 md:mt-3.5 '>
                <Checkbox checked={!isLimitOrder} onChange={onIsLimitOrderChange}>
                  <span className='text-[12px]'>
                    {t("exchange.sell")}
                    <strong className='font-semibold'> {from.currency}</strong> {t("exchange.at_the_market_rate")}
                  </span>
                </Checkbox>
              </div>
            )} */}
          </div>

          <DepthOfMarket
            currencyFrom={from.currency}
            currencyTo={to.currency}
            roomKey={roomInfo?.timetick.toString() ?? null}
            isSwapped={price.isSwapped}
          />

          <div className={`mt-7 ${styles.GridFooter}`}>
            <Button
              size='lg'
              className='w-full'
              disabled={(!isLimitOrder ? +from.amount <= 0 : +price.amount <= 0) || hasValidationError}
              onClick={showModal}
            >
              {t("exchange.create_order")}
            </Button>

            {to.currency && (
              <div className='mt-[5px] lg:mt-2.5 px-8 text-[10px] flex flex-col text-center text-[#B9B9B5]'>
                <span className='block'>
                  {t("exchange.broker_exchange_fee")}{" "}
                  <span className='font-semibold'>{currencies.get(to.currency)?.marketFee}%</span>
                </span>
                {t("exchange.exchange_excluding")}
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ExchangeCreateOrder;

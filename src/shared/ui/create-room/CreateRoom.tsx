import { t } from "i18next";
import { useState } from "react";
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import UseError from "@/shared/model/hooks/useError";
import { apiCreateRoom } from "@/shared/(orval)api/gek";
import { RoomInfo } from "@/shared/(orval)api/gek/model";
import { IExchangeField } from "@/widgets/exchange/model/types";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import ModalInfoText from "@/shared/ui/modal/modal-info-text/ModalInfoText";
import TokenSelect from "@/shared/ui/search-select/token-select/TokenSelect";
import IconSwap from "@/shared/ui/icons/IconSwap";
import s from "./styles.module.scss";
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react";
import { Switch } from "antd";
import { is } from "date-fns/locale";
interface IState {
  isIco: boolean;
  purchaseLimit: number;
}

interface IParams {
  to: IExchangeField;
  from: IExchangeField;
  onCurrenciesSwap: () => void;
  onRoomCreation: (roomInfo: RoomInfo) => void;
  onToCurrencyChange: (value: string) => void;
  onFromCurrencyChange: (value: string) => void;
}

function CreateRoom({
  to,
  from,
  onRoomCreation,
  onCurrenciesSwap,
  onToCurrencyChange,
  onFromCurrencyChange,
}: IParams) {
  const [isIco, setIsIco] = useState(false);
  const [purchaseLimit, setPurchaseLimit] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [localErrorHunter, , localErrorInfoBox] = UseError();

  return (
    <>
      <div className={loading ? "!collapse" : ""}>
        <ModalInfoText>{t("exchange.private_room_allows")}</ModalInfoText>

        <div className={s.modal_text}>
          <WarningIcon />
          {t("exchange.private_room_allows")}
        </div>
        <div className="mt-4 mb-10">
          <label
            className="inline-flex mb-1 text-sm font-medium"
            htmlFor="sell-token"
          >
            {t("exchange.from")}
          </label>
          <TokenSelect
            id="sell-token"
            value={from.currency}
            onSelect={onFromCurrencyChange}
            disabledCurrencies={[to.currency]}
            placeholder={t("exchange.select_token")}
            allowedFlags={[CurrencyFlags.ExchangeAvailable]}
          />
        </div>
        
        <div className="flex w-full justify-center mt-2 -mb-5">
          <div onClick={onCurrenciesSwap} className="cursor-pointer">
            <IconSwap size="25px"/>
          </div>
        </div>

        <div className="mt-2">
          <label
            className="inline-flex mb-1 text-sm font-medium"
            htmlFor="get-token"
          >
            {t("exchange.to")}
          </label>
          <TokenSelect
            id="get-token"
            value={to.currency}
            onSelect={onToCurrencyChange}
            disabledCurrencies={[from.currency]}
            placeholder={t("exchange.select_token")}
            allowedFlags={[CurrencyFlags.ExchangeAvailable]}
          />
        </div>

        <div className="mt-6">
          <label className="inline-flex mb-1 text-sm font-medium" htmlFor="">
            {t("exchange.purchase_limit")}
          </label>
          <Input
            allowDigits
            placeholder={t("exchange.it_is_empty")}
            onChange={(event) => {
              setPurchaseLimit(+event.target.value)
            }}
          />
        </div>

        <div className="flex items-center gap-3 justify-center mt-4">
          <div
            onClick={() => setIsIco(!isIco)}
            className={`w-[40px] cursor-pointer h-[19px] rounded-[40px] transition-all duration-300 ${
              isIco ? "bg-[#b4c0cd]" : "bg-[#2BAB72]"
            } relative p-[4px] `}
          >
            <div
              className={`w-[15px] h-[15px] transition-all duration-300 rounded-[50%] absolute  top-[2.2px] 
                ${isIco ? "left-[2px]" : "left-[calc(100%_-_17.5px)]"}
                ${isIco ? "bg-[#fff]" : "bg-[#285E69]"}
              `}
            ></div>
          </div>
          <span
            onClick={() => {
              setIsIco(!isIco);
            }}
            className="hover:cursor-pointer text-smm select-none"
          >
            {t("exchange.only_i_can")}
          </span>
        </div>

        <div className="mt-4">{localErrorInfoBox}</div>

        <div className="mt-6 sm:mt-11">
          <Button
            disabled={!(from.currency && to.currency)}
            size="xl"
            className="w-full"
            onClick={() => {
              setLoading(true);

              apiCreateRoom({
                currency1: from.currency,
                currency2: to.currency,
                flags: isIco ? 1 : 0,
                to_balance_limit: purchaseLimit,
              })
                .then(({ data }) => {
                  if (data.error) {
                    localErrorHunter({ code: 0, message: data.error.message });
                    return;
                  }

                  onRoomCreation(data.result);
                })
                .catch((e) => {
                  localErrorHunter(e);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {t("exchange.open_private_exchange_room")}
          </Button>
        </div>
      </div>

      {loading && <Loader />}
    </>
  );
}

export default CreateRoom;

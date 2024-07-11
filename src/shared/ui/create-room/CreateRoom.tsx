import { t } from "i18next";
import { useContext, useState } from "react";
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import UseError from "@/shared/model/hooks/useError";
import { apiCreateRoom } from "@/shared/(orval)api/gek";
import { RoomInfo } from "@/shared/(orval)api/gek/model";
import { IExchangeField } from "@/widgets/exchange/model/types";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { IconApp } from "../icons/icon-app";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import Select from "@/shared/ui/create-room/ui/select";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import styles from "./styles.module.scss";

interface IParams {
  to: IExchangeField;
  from: IExchangeField;
  onCurrenciesSwap: () => void;
  onRoomCreation: (roomInfo: RoomInfo) => void;
  onToCurrencyChange: (value: string) => void;
  onFromCurrencyChange: (value: string) => void;
  onCancel?: ()=>void
}

function CreateRoom({
  to,
  from,
  onRoomCreation,
  onCurrenciesSwap,
  onToCurrencyChange,
  onFromCurrencyChange,
  onCancel
}: IParams) {
  const {md} = useBreakpoints();
  const [isIco, setIsIco] = useState(false);
  const { currencies } = useContext(CtxCurrencies);
  const [loading, setLoading] = useState<boolean>(false);
  const allowedFlags = [CurrencyFlags.ExchangeAvailable];
  const [localErrorHunter, , localErrorInfoBox] = UseError();
  const [purchaseLimit, setPurchaseLimit] = useState<string>(null);

  const assetsFilter = (asset: ICtxCurrency) => {
    if (allowedFlags) {
      return Object.values(allowedFlags).some((f) => asset.flags[f]);
    }

    return true;
  };

  const [tokensList] = useState<ICtxCurrency[]>(Array.from(currencies.values()).filter(assetsFilter));

  const handleOnCancel = () => {
    onFromCurrencyChange("");
    onToCurrencyChange("");
    onCancel();
  }

  const handleOnChange = (type: "from" | "to") => (currency: ICtxCurrency | null) => {
    type === "from" ?
        onFromCurrencyChange(currency ? currency.$const : "") :
        onToCurrencyChange(currency ? currency.$const : "");
  }

  const getValue = (equalValue: string | null) => tokensList.find(t => t.$const === equalValue) || null;
  const getFilterValue = (notEqualValue: string) => tokensList.filter(({ $const }) => $const !== notEqualValue);

  return (
    <>
      <div className={loading ? "!collapse" : ""}>
        <div className={styles.ModalText}>
          <div>
            <IconApp color="#8F123A" size={15} code="t27" />
          </div>
          <div className={"text-justify"}>
            {t("exchange.private_room_allows")}
          </div>
        </div>
        <div className={"mt-4 " + styles.SelectToken}>
          <Select
            label={`${t("exchange.from")}:`}
            placeholder={`-${t('select')}-`}
            value={getValue(from.currency)}
            options={getFilterValue(to.currency)}
            onChange={handleOnChange("from")}
          />
        </div>
        <div className="flex w-full justify-center mt-2">
          <div onClick={onCurrenciesSwap} className="cursor-pointer">
            <IconApp code='t36' size={md ? 17 : 25} color="#B9B9B5" />
          </div>
        </div>
        <div className={styles.SelectToken}>
          <Select
              label={`${t("exchange.to")}:`}
              placeholder={`-${t('select')}-`}
              value={getValue(to.currency)}
              options={getFilterValue(from.currency)}
              onChange={handleOnChange("to")}
          />
        </div>
        <div className="flex items-center gap-3 pl-[8px] mt-6">
          <div
            onClick={() => setIsIco(!isIco)}
            className={`w-[40px] cursor-pointer h-[19px] rounded-[40px] transition-all duration-300 ${
              isIco ? "bg-[#b4c0cd]" : "bg-[var(--gek-green)]"
            } relative p-[4px] `}
          >
            <div
              className={`w-[15px] h-[15px] transition-all duration-300 rounded-[50%] absolute  top-[2.2px] 
                ${isIco ? "left-[2px]" : "left-[calc(100%_-_17.5px)]"}
                ${isIco ? "bg-[#fff]" : "bg-[var(--gek-additional)]"}
              `}
            />
          </div>
          <span
            onClick={() => {
              setIsIco(!isIco);
            }}
            className="hover:cursor-pointer text-smm select-none text-[12px] text-[#1F3446]"
          >
            {t("exchange.only_i_can")}
          </span>
        </div>


        <div className="mt-2">
          <label className={styles.Title} htmlFor="">
            {t("exchange.purchase_limit")}:
          </label>
          <Input
            allowDigits
            value={purchaseLimit}
            placeholder={t("exchange.it_is_empty")}
            onChange={(event) => {
              setPurchaseLimit(event.target.value)
            }}
          />
        </div>

        <div className="mt-4">{localErrorInfoBox}</div>

        <div className="mt-6 gap-[20px] sm:mt-6 flex justify-between">
          <Button
            className="w-full"
            disabled={!(from.currency && to.currency)}
            onClick={() => {
              setLoading(true);

              apiCreateRoom({
                currency1: from.currency,
                currency2: to.currency,
                flags: isIco ? 1 : 0,
                to_balance_limit: +purchaseLimit,
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
            {t("confirm")}
          </Button>
          <Button
            skeleton
            className="w-full"
            onClick={handleOnCancel}
          >
            {t("cancel")}
          </Button>
        </div>
      </div>

      {loading && <Loader />}
    </>
  );
}

export default CreateRoom;

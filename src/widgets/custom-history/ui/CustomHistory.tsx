import dayjs from "dayjs";
import { format } from "date-fns";
import Loader from "@/shared/ui/loader";
import styles from "./style.module.scss";
import Input from "@/shared/ui/input/Input";
import type { DatePickerProps } from "antd";
import Button from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import History from "../../history/ui/History";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxRootData } from "@/processes/RootContext";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { getRoundingValue } from "@/shared/lib/helpers";
import { dateFormat, options } from "../model/constants";
import { ISelectCard, ISelectTxTypes } from "../model/types";
import { useContext, useEffect, useRef, useState } from "react";
import { formatCardNumber } from "../../dashboard/model/helpers";
import { TransactTypeEnum } from "@/shared/(orval)api/gek/model";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { Datepicker } from "@/shared/ui/Datepicker/Datepicker";
import { formatForApi } from "@/shared/lib/date-helper";

// TODO: clean up
function CustomHistory() {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { refreshKey } = useContext(CtxRootData);
  const { currencies } = useContext(CtxCurrencies);
  const [curr, setCurr] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>("");
  const [selector, setSelector] = useState<'type' | 'card' | 'currency' | null>(null);
  
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const {
    activeCards: cards,
    loading: cardsLoading,
    getActiveCards: loadActiveCards
  } = storeActiveCards(state => state);
  const [cardsOptions, setCardsOptions] = useState<ISelectCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<ISelectCard>({value: '', label: ''});

  // remove
  const translatedOptions = options.map((el) => {
    return {
      ...el,
      label: t(el.t),
    };
  });

  // remove
  const [fiat, setFiat] = useState<boolean>(false);
  const [apply, setApply] = useState<boolean>(false);
  const [type, setType] = useState<ISelectTxTypes | null>(null);

  // remove
  const [historyData, setHistoryData] = useState<{
    assets: string[];
    includeFiat?: boolean;
    types: TransactTypeEnum[];
  }>({
    assets: [curr],
    types: type?.value,
    includeFiat: fiat,
  });

  const handleReset = () => {
    setStartDate(new Date())
    setEndDate(new Date())
    setFiat(false);
    setCurr('');
    setSelector(null);
    setType(null);
  };

  const applyHandler = () => {
    setHistoryData({
      assets: [curr],
      types: type?.value,
      includeFiat: fiat,
    });
  };

  useEffect(() => {
    (async () => {
      if (curr === 'EUR') {
        await loadActiveCards();
      }
    })();
  }, [curr]);

  useEffect(() => {
    if (cards) {
      const cardsOpts: ISelectCard[] = cards.map((card) => ({
        label: formatCardNumber(card.displayPan),
        value: card.cardId,
      }));
      setCardsOptions(cardsOpts);
    }
  }, [cards]);

  useEffect(() => {
    applyHandler();
  }, [refreshKey]);

  function searchTokenFilter(currency: ICtxCurrency, searchValue: string) {
    return (
      (currency.$const?.toLowerCase().includes(searchValue) ||
        currency.name?.toLowerCase().includes(searchValue)) &&
      currency.balance?.free_balance
    );
  }

  const currenciesList =
    currencies && !![...currencies].find((el) => el[0] === "EUR")[1].balance
      ? [...currencies]
          .sort((x, y) => {
            return x[0] == "EUR" ? -1 : y[0] == "EUR" ? 1 : 0;
          })
          ?.map((el) => {
            return {
              $const: el[0],
              currency: el[1],
            };
          })
      : [];

  const setValueSearch = (e: any) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  // TODO:refactor display of selectors
  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.filters}>
          <h4 className={styles.CustomTitle}>{t("enter_period")}</h4>
          <div>
            <div className="flex flex-row gap-1 text-[14px] font-extrabold pt-2 mb-[5px]">
              <Datepicker 
                isTo={false}
                date={startDate}
                setDate={setStartDate}
              />
              <div className="mt-[5px]">_</div>
              <Datepicker 
                isTo={true}
                date={endDate}
                setDate={setEndDate}
              />
            </div>
          </div>
          <div className={styles.SelectWrap}>
            <div
              className={styles.SelectBlock}
              onClick={() => {
                selector === 'currency' ? setSelector(null) : setSelector('currency');
                setApply(false);
              }}
            >
              <span className={styles.SelectTitle}>{t("currency")}:</span>
              <div
                className={`${styles.SelectActive} ${
                  curr && styles.SelectCurrencyActive
                }`}
              >
                <div className={styles.SelectPickedValue}>
                  {!curr ? (
                    <span className={styles.NonePickedTitle}>-{t("select")}-</span>
                  ) : (
                    <span className={styles.SelectActiveToken}>
                      <IconCoin
                        height={20}
                        className={`max-h-[36px]`}
                        code={curr}
                      />
                      {currencies?.get(curr)?.name}
                    </span>
                  )}
                </div>
                <div className={styles.SelectIconBlock}>
                  <IconApp className="rotate-90" color="#fff" code="t08" size={12} />
                </div>
              </div>
            </div>
            <div
              className={styles.SelectBlock}
              onClick={() => {
                selector === 'type' ? setSelector(null) : setSelector('type');
                setApply(false);
              }}
            >
              <span className={styles.SelectTitle}>{t("type")}:</span>
              <div
                className={`${styles.SelectActive} ${
                  type && styles.SelectCurrencyActive
                }`}
              >
                <div className={styles.SelectPickedValue}>
                  {!type ? (
                    <span className={styles.NonePickedTitle}>-{t("select")}-</span>
                  ) : (
                    <span className={styles.SelectActiveToken}>
                      {type.label}
                    </span>
                  )}
                </div>
                <div className={styles.SelectIconBlock}>
                  <IconApp className="rotate-90" color="#fff" code="t08" size={12} />
                </div>
              </div>
            </div>
            {
              fiat && (
                <div
              className={styles.SelectBlock}
              onClick={() => {
                selector === 'card' ? setSelector(null) : setSelector('card');
                setApply(false);
              }}                       
            >
              <span className={styles.SelectTitle}>{t("card")}:</span>
              <div
                className={`${styles.SelectActive} ${
                  selectedCard.value && styles.SelectCurrencyActive
                }`}
              >
                <div className={styles.SelectPickedValue}>
                  {!selectedCard.value ? (
                    <span className={styles.NonePickedTitle}>-{t("select")}-</span>
                  ) : (
                    <span className={styles.SelectActiveToken}>
                      {selectedCard.label}
                    </span>
                  )}
                </div>
                <div className={styles.SelectIconBlock}>
                  <IconApp className="rotate-90" color="#fff" code="t08" size={12} />
                </div>
              </div>
            </div>
          )}
          </div>
          {selector === 'currency' && (
            <div className="w-full mt-[15px]">
              <span className={styles.CurrencyListTitle}>{t("select_currency")}</span>
              <div className="bg-[white] h-[40px] items-center border-solid w-full flex gap-[9px] px-[18px] py-2.5 rounded-lg">
                <IconApp size={20} code="t12" color="#000" />
                <Input
                  className={`w-full text-[10px] border-[none]`}
                  wrapperClassName={"w-full"}
                  style={{ height: "10px", border: "none" }}
                  type="text"
                  ref={inputRef}
                  data-testid="SearchName"
                  placeholder={t("crypto_assets.search_currency")}
                  onChange={setValueSearch}
                />
              </div>
              {currenciesList.length > 0 ? (
                currenciesList
                  ?.filter((curr) =>
                    searchTokenFilter(curr.currency, searchValue)
                  )
                  ?.map((currency, index) => (
                    <div
                      className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer"
                      onClick={() => {
                        setCurr(currency.$const);
                        setFiat(currency.currency.flags.fiatCurrency)
                        setSelector(null);
                      }}
                    >
                      <div className="ml-2 flex flex-row p-2 gap-5 justify-center items-center ">
                        <IconCoin height={40} code={currency.$const} />
                        <span className="text-[12px] h-full flex items-center text-[#1F3446] font-bold">
                          {currency.$const === "EUR" ? (
                            currency.$const
                          ) : (
                            <div className="flex h-full flex-col justify-around">
                              <span>{currency.$const}</span>
                              <span className="font-[400] whitespace-nowrap text-[#676767]">
                                {currency.currency.name}
                              </span>
                            </div>
                          )}
                        </span>
                      </div>
                      <div className="mr-2 flex flex-col justify-evenly p-2 min-w-[150px]">
                        <span className="self-start ml-[15%] text-[12px] text-[var(--gek-dark-grey)] font-regular">
                          {t("free_balance")}:
                        </span>
                        <span className="self-end text-[12px] text-[#1F3446] font-regular">
                          {getRoundingValue(
                            currency.currency.balance?.free_balance,
                            currency.currency.roundPrec
                          )}{" "}
                          {currency.$const}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="min-h-[200px] flex justify-center w-full relative">
                  <Loader />
                </div>
              )}
            </div>
          )}
          {selector === 'type' && (
            <div className={styles.TypeList}>
              <span className={styles.CurrencyListTitle}>{t("select_type")}</span>
              {
                translatedOptions.map((item, ind) => (
                  <div
                  className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] text-[var(--gek-dark-blue)] active:text-[var(--gek-green)] rounded-lg cursor-pointer"
                  onClick={() => {
                    setType(item)
                    setSelector(null)  
                  }}
                >
                  <div className="ml-5 flex flex-row p-2 gap-5 justify-center items-center ">
                    <span className="text-[12px] h-full flex items-center font-bold">
                      {item.label}
                    </span>
                  </div>
                </div>
                ))
              }
            </div>
          )}
          {selector === 'card' && (
            <div className={styles.TypeList}>
              <span className={styles.CurrencyListTitle}>Select card</span>
              {cardsLoading
                ? <Loader className="relative"/>
                : cardsOptions.length <= 0
                ? <span className={styles.NoCardsTitle}>{t("no_active_cards")}</span>
                : cardsOptions.map((item, ind) => (
                  <div
                    className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedCard(item)
                      setSelector(null)  
                    }}
                  >
                    <div className="ml-5 flex flex-row p-2 gap-5 justify-center items-center ">
                      <span className="text-[12px] h-full flex items-center text-[#1F3446] font-bold">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
          <div className={styles.BottomBtnsWrap}>
            <Button
              className={styles.BottomBtn}
              onClick={() => {
                setApply(true);
                applyHandler();
              }}
            >
              {t("apply")}
            </Button>
            <Button
              className={`${styles.BottomBtn}`}
              color="gray"
              onClick={() => {
                setApply(false);
                handleReset();
              }}
            >
              {t("clear")}
            </Button>
          </div>
        </form>
      </div>
      {apply && (
        <History
          tab="custom"
          className="mt-2"
          to={endDate}
          from={startDate}
          types={historyData.types}
          includeFiat={historyData.includeFiat}
          currenciesFilter={historyData.assets}
        />
      )}
    </>
  );
}

export default CustomHistory;

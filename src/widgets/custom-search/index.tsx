import styles from "./style.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { CtxWalletNetworks } from "../wallet/transfer/model/context";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Select } from "antd";
import dayjs from "dayjs";
import { dateFormat } from "./const";
import Button from "@/shared/ui/button/Button";
import { GetHistoryTrasactionOut, TransactTypeEnum } from "@/shared/(orval)api/gek/model";
import { apiAssets, apiGetHistoryTransactions } from "@/shared/(orval)api/gek";
import { formatForApi } from "@/shared/lib/date-helper";
import {
  actionResSuccess,
  getFlagsFromMask,
  getRoundingValue,
  useQuery,
} from "@/shared/lib/helpers";
import { historyTabs } from "../history/model/helpers";
import { options } from "./const";
import { CtxRootData } from "@/processes/RootContext";
import { ISelectAssets, ISelectCard } from "./types";
import Loader from "@/shared/ui/loader";
import { maskCurrencyFlags } from "@/shared/config/mask-currency-flags";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import History from "../history/ui/History";
import { useTranslation } from "react-i18next";
import { formatCardNumber } from "../dashboard/model/helpers";
import { useIntersectionObserver } from "../history/hooks/useIntersectionObserver";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { format } from "date-fns";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import Input from "@/shared/ui/input/Input";

interface typeT {
  label: string;
  t: string;
  value: TransactTypeEnum[];
}

interface cardT {
  label: string;
  value: string
}

export default function customSearch() {
  const [currencyListVisibility, setCurrencyListVisibility] = useState(false);
  const [typeListVisibility, setTypeListVisibility] = useState(false);
  const [cardListVisibility, setCardListVisibility] = useState(false);
  const [curr, setCurr] = useState<string>('EURG');

  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const { currencies } = useContext(CtxCurrencies);
  const [date, setDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs("2022-01-01", dateFormat),
    dayjs(format(new Date(), "yyyy-MM-dd"), dateFormat),
  ]);
  const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);

  const [allAssets, setAllAssets] = useState<ISelectAssets[]>();
  const [selectedAsset, setSelectedAsset] = useState<ISelectAssets>({
    label: "Gekkoin EUR",
    value: "EURG",
  });
  const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
  const [selectedCard, setSelectedCard] = useState<cardT>({value: '', label: ''});
  const loadActiveCards = storeActiveCards((state) => state.getActiveCards);
  const cards = storeActiveCards((state) => state.activeCards);
  const [cardsOptions, setCardsOptions] = useState<ISelectCard[]>([]);

  const { md } = useBreakpoints();
  

  const [lastValue, setLastValue] = useState<GetHistoryTrasactionOut>(
    listHistory[listHistory.length - 1]
  );

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.9,
  });

  const { t } = useTranslation();

  const translatedOptions = options.map((el) => {
    return {
      ...el,
      label: t(el.t),
    };
  });

  const [loading, setLoading] = useState(false);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [selectedTx, setSelectedTx] = useState(translatedOptions[0]);
  const [allTxVisibly, setAllTxVisibly] = useState(false);
  const [apply, setApply] = useState<boolean>(false);
  const [type, setType] = useState<typeT>(translatedOptions[0]);
  const [fiat, setFiat] = useState<boolean>(false)

  const [historyData, setHistoryData] = useState({
    assets: [curr],
    types: type.value,
    includeFiat: fiat,
  });

  const { refreshKey } = useContext(CtxRootData);

  const handleStartDateChange: DatePickerProps["onChange"] = (
    newDate,
    dateString
  ) => {
    setDate([newDate, date[1]]);
  };

  const handleFinishDateChange: DatePickerProps["onChange"] = (
    newDate,
    dateString
  ) => {
    setDate([date[0], newDate]);
  };

  const handleReset = () => {
    setDate([
      dayjs("2022-01-01", dateFormat),
      dayjs(format(new Date(), "yyyy-MM-dd"), dateFormat),
    ]);
    setCurr('EURG')
    setType(translatedOptions[0])
    setFiat(false)
  };


  const loadAssets = async () => {
    const assets = await apiAssets();
    actionResSuccess(assets).success(() => {
      const { result } = assets.data;

      const formatedResult = result.map((elem) => {
        const isFiat = getFlagsFromMask(
          elem.flags,
          maskCurrencyFlags
        ).fiatCurrency;
        return { value: elem?.code, label: elem?.name, isFiat };
      });
      console.log(formatedResult);
      setAllAssets(formatedResult);
    });
  };

  const applyHandler = () => {
    setHistoryData({
      assets: [curr],
      types: type.value,
      includeFiat: selectedAsset.isFiat,
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadAssets();
      await loadActiveCards();
      setLoading(false);
    })();
  }, []);

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
  }, [refreshKey, activeTab]);

  useEffect(() => {
    if (
      md &&
      isIntersecting &&
      !allTxVisibly &&
      !(listHistory?.length < 10) &&
      lastValue?.next_key !== "::0"
    ) {
      (async () => {
        setLazyLoading(true);

        console.log(lastValue?.next_key);

        const { data } = await apiGetHistoryTransactions({
          currencies: historyData.assets,
          tx_types: historyData.types,
          next_key: lastValue.next_key,
          limit: 10,
          include_fiat: historyData.includeFiat,
          end: date ? formatForApi(date[1].toDate()).toString() : null,
          start: date ? formatForApi(date[0].toDate()).toString() : null,
        });

        if (data.result.length < 10) setAllTxVisibly(true);

        setListHistory((prevState) => [...prevState, ...data.result]);
        setLazyLoading(false);
      })();
    }
  }, [isIntersecting]);

  useEffect(() => {
    setLastValue(listHistory[listHistory.length - 1]);
  }, [listHistory]);

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

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.filters}>
          <h4 className={styles.CustomTitle}>{t("enter_period")}</h4>
          <div>
            <Space
              direction="vertical"
              className="flex flex-row gap-1 font-extrabold pt-2"
            >
              <DatePicker
                onChange={handleStartDateChange}
                value={date[0]}
                suffixIcon={<IconApp code="t39" size={20} color="#29354C" />}
                className={styles.Inp}
              />
              <div className="mb-0">_</div>
              <DatePicker
                onChange={handleFinishDateChange}
                value={date[1]}
                suffixIcon={<IconApp code="t39" size={20} color="#29354C" />}
              />
            </Space>
          </div>
          <div className={styles.SelectWrap}>
            <div
              className={styles.SelectBlock}
              onClick={() => setCurrencyListVisibility(!currencyListVisibility)}
            >
              <span className={styles.SelectTitle}>Currency:</span>
              <div
                className={`${styles.SelectActive} ${
                  curr && styles.SelectCurrencyActive
                }`}
              >
                <div className={styles.SelectPickedValue}>
                  {!curr ? (
                    <span className={styles.NonePickedTitle}>-select-</span>
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
                  <IconApp color="#fff" code="t08" size={12} />
                </div>
              </div>
            </div>
            <div
              className={styles.SelectBlock}
              onClick={() => setTypeListVisibility(!typeListVisibility)}
            >
              <span className={styles.SelectTitle}>Type:</span>
              <div
                className={`${styles.SelectActive} ${
                  type && styles.SelectCurrencyActive
                }`}
              >
                <div className={styles.SelectPickedValue}>
                  {!type ? (
                    <span className={styles.NonePickedTitle}>-select-</span>
                  ) : (
                    <span className={styles.SelectActiveToken}>
                      {type.label}
                    </span>
                  )}
                </div>
                <div className={styles.SelectIconBlock}>
                  <IconApp color="#fff" code="t08" size={12} />
                </div>
              </div>
            </div>
            {
              fiat && (
                <div
              className={styles.SelectBlock}
              onClick={() => setCardListVisibility(!cardListVisibility)}
            >
              <span className={styles.SelectTitle}>Card:</span>
              <div
                className={`${styles.SelectActive} ${
                  selectedCard.value && styles.SelectCurrencyActive
                }`}
              >
                <div className={styles.SelectPickedValue}>
                  {!selectedCard.value ? (
                    <span className={styles.NonePickedTitle}>-select-</span>
                  ) : (
                    <span className={styles.SelectActiveToken}>
                      {selectedCard.label}
                    </span>
                  )}
                </div>
                <div className={styles.SelectIconBlock}>
                  <IconApp color="#fff" code="t08" size={12} />
                </div>
              </div>
            </div>
              )
            }
          </div>
          {currencyListVisibility && (
            <div className="w-full mt-[15px]">
              <span className={styles.CurrencyListTitle}>Select Currency</span>
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
                        setApply(false);
                        setCurr(currency.$const);
                        setFiat(currency.currency.flags.fiatCurrency)
                        setCurrencyListVisibility(false);
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
                        <span className="self-start ml-[15%] text-[12px] text-[#7B797C] font-regular">
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
          {typeListVisibility && (
            <div className={styles.TypeList}>
              <span className={styles.CurrencyListTitle}>Select type</span>
              {
                translatedOptions.map((item, ind) => (
                  <div
                  className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer"
                  onClick={() => {
                    setApply(false);
                    setType(item)
                    setTypeListVisibility(false)  
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
          {cardListVisibility && (
            <div className={styles.TypeList}>
              <span className={styles.CurrencyListTitle}>Select card</span>
              {
                cardsOptions.map((item, ind) => (
                  <div
                  className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer"
                  onClick={() => {
                    setApply(false);
                    setSelectedCard(item)
                    setCardListVisibility(false)  
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
              size="sm"
              onClick={() => {
                setApply(true);
                applyHandler();
              }}
              disabled={!date.every((el) => !!el)}
            >
              {t("apply")}
            </Button>
            <Button
              className={`${styles.BottomBtn} grey`}
              size="sm"
              variant="gray"
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
          currTab={historyTabs[1]}
          currenciesFilter={historyData.assets}
          types={historyData.types}
          includeFiat={historyData.includeFiat}
          date={date}
        />
      )}
    </>
  );
}

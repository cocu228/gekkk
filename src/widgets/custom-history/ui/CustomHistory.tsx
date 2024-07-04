import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import Button from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import History from "../../history/ui/History";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { options } from "../model/constants";
import { ISelectCard, ISelectTxTypes, CurrenciesOptionType, SelectorType } from "../model/types";
import { formatCardNumber } from "../../dashboard/model/helpers";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { Datepicker } from "@/shared/ui/Datepicker/Datepicker";
import { getFirstDayOfPreviousMonth, getHigherDate, getLowerDate } from "@/shared/lib/date-helper";
import Selector from "../components/selector";
import Options from "../components/options";
import CardRenderOption from "@/widgets/custom-history/ui/components/card-render-option";
import CurrencyRenderOption from "@/widgets/custom-history/ui/components/currency-render-option";
import TypeRenderOption from "@/widgets/custom-history/ui/components/type-render-option";

const CustomHistory = () => {
  // Hooks
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(getFirstDayOfPreviousMonth());
  const [endDate, setEndDate] = useState(new Date());
  const [selector, setSelector] = useState<SelectorType | null>(null)
  const [isFiat, setIsFiat] = useState<boolean>(false)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrenciesOptionType | null>(null);
  const [selectedType, setSelectedType] = useState<ISelectTxTypes | null>(null);
  const [selectedCard, setSelectedCard] = useState<ISelectCard | null>(null);
  const [isApply, setIsApply] = useState<boolean>(false);

  // Context
  const { currencies } = useContext(CtxCurrencies);

  // Store
  const {
    activeCards: cards,
    loading: cardsLoading,
    getActiveCards: loadActiveCards
  } = storeActiveCards(state => state);

  // Handlers
  const handleOnSelectClick = (selectType: SelectorType) => () => {
    setIsApply(false)
    setSelector(prev => prev === selectType ? null : selectType);
  }

  const handleOnCurrency = useCallback((currency: CurrenciesOptionType) => {
    setSelectedCurrency(currency)
    setIsFiat(currency.currency.flags.fiatCurrency)
    setSelector(null);
    setSelectedCard(prev => currency.$const !== "EUR" ? null : prev)
  }, [])

  const handleOnType = useCallback((option: ISelectTxTypes) => {
    setSelectedType(option)
    setSelector(null)
  }, [])

  const handleOnCard = useCallback((option: ISelectCard) => {
    setSelectedCard(option)
    setSelector(null)
  }, [])

  const handleOnApply = () => {
    setSelector(null);
    setIsApply(true)
  }

  const handleOnReset = () => {
    setStartDate(getFirstDayOfPreviousMonth())
    setEndDate(new Date())
    setSelector(null)
    setIsFiat(false)
    setSelectedCurrency(null)
    setSelectedType(null)
    setSelectedCard(null)
  }

  const handleOnFilterCurrency = (currency: CurrenciesOptionType, searchValue: string) => {
    return (
      (currency.currency.$const?.toLowerCase().includes(searchValue) ||
        currency.currency.name?.toLowerCase().includes(searchValue)) &&
      !!currency.currency.balance?.free_balance
    );
  }

  // Effects
  useEffect(() => {
    (async () => {
      if (selectedCurrency?.$const === 'EUR') {
        await loadActiveCards();
      }
    })();
  }, [selectedCurrency?.$const]);

  // Helpers
  const currenciesList = useMemo<CurrenciesOptionType[]>(() => {
    const hasBalance = currencies && !![...currencies].find((el) => el[0] === "EUR")[1].balance;
    const sortedList = hasBalance ? [...currencies].sort((x, y) => x[0] == "EUR" ? -1 : y[0] == "EUR" ? 1 : 0) : [];
    const transformList = sortedList.map(el => ({ $const: el[0], currency: el[1] }));
    return transformList.filter((value) => handleOnFilterCurrency(value, ""))
  }, [currencies])
  const cardsOptions = useMemo<ISelectCard[]>(() => {
    return (cards || []).map((card) => ({
      label: formatCardNumber(card.displayPan),
      value: card.cardId,
    }));
  }, [cards])
  const types = selectedType ? selectedType.value : undefined;
  const currenciesFilter = selectedCurrency ? [selectedCurrency.$const] : undefined;

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.filters}>
          <h4 className={styles.CustomTitle}>{t("enter_period")}</h4>
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
          <div className={styles.SelectWrap}>
            <Selector
              value={selectedCurrency}
              label={t("currency")}
              renderInput={({ $const }) => (
                <>
                  <IconCoin height={20} className={`max-h-[36px]`} code={$const} />
                  {currencies?.get($const)?.name}
                </>
              )}
              onClick={handleOnSelectClick("currency")}
            />
            <Selector
              value={selectedType}
              label={t("type")}
              renderInput={(value) => t(value.t)}
              onClick={handleOnSelectClick("type")}
            />
            {isFiat ? (
              <Selector
                value={selectedCard}
                label={t("card")}
                renderInput={(value) => value.label}
                onClick={handleOnSelectClick("card")}
              />
            ) : null}
          </div>
          {selector === 'currency' && (
            <Options
              searchable
              placeholder={t("crypto_assets.search_currency")}
              filterOption={handleOnFilterCurrency}
              title={t("select_currency")}
              options={currenciesList}
              isLoading={!(currenciesList.length > 0)}
              renderOption={(props) => (
                <CurrencyRenderOption key={props.option.$const} {...props} />
              )}
              onClick={handleOnCurrency}
            />
          )}
          {selector === 'type' && (
            <Options
              title={t("select_type")}
              options={options}
              renderOption={(props) => (
                <TypeRenderOption key={props.option.label} {...props} />
              )}
              onClick={handleOnType}
            />
          )}
          {selector === 'card' && (
            <Options
              title={t("select_card")}
              isLoading={cardsLoading}
              noOption={<span className={styles.NoCardsTitle}>{t("no_active_cards")}</span>}
              options={cardsOptions}
              renderOption={(props) => (
                <CardRenderOption key={props.option.label} {...props} />
              )}
              onClick={handleOnCard}
            />
          )}
          <div className={styles.BottomBtnsWrap}>
            <Button className={styles.BottomBtn} onClick={handleOnApply}>
              {t("apply")}
            </Button>
            <Button className={`${styles.BottomBtn}`} color="gray" onClick={handleOnReset}>
              {t("clear")}
            </Button>
          </div>
        </form>
      </div>
      {isApply && (
        <History
          tab="custom"
          className="mt-2"
          types={types}
          includeFiat={isFiat}
          currenciesFilter={currenciesFilter}
          to={getHigherDate(endDate, startDate)}
          from={getLowerDate(endDate, startDate)}
        />
      )}
    </>
  );
}

export default CustomHistory;

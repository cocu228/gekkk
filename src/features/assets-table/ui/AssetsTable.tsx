import styles from "./style.module.scss";
import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import GTable from "@/shared/ui/grid-table/";
import { getAlignment, getWidth } from "../model/helpers";
import { AssetTableKeys } from "../model/types";
import Button from "@/shared/ui/button/Button";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { apiGetRates } from "@/shared/(orval)api/gek";
import ETokensConst from "@/shared/config/coins/constants";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { evenOrOdd, getRoundingValue, scrollToTop } from "@/shared/lib/helpers";
import { useTranslation } from "react-i18next";
import { getCurrencyRounding } from "@/shared/lib/number-format-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { AssetsTableRow } from "./AssetsTableRow";

interface IParams {
  modal?: boolean;
  className?: string;
  balanceFilter?: boolean;
  allowedFlags?: Array<CurrencyFlags>;
  columnKeys: Array<AssetTableKeys>;
  blockedCurrencies?: Array<string>;
  onSelect?: (currency: string) => void;
}

function searchTokenFilter(currency: ICtxCurrency, searchValue: string) {
  return (
    currency.$const?.toLowerCase().includes(searchValue) ||
    currency.name?.toLowerCase().includes(searchValue)
  );
}

const AssetsTable = ({
  modal,
  balanceFilter,
  className = "",
  columnKeys = [],
  blockedCurrencies,
  allowedFlags,
  onSelect,
}: IParams) => {
  const inputRef = useRef(null);
  const { lg, md } = useContext(BreakpointsContext);
  const { currencies } = useContext(CtxCurrencies);
  const [searchValue, setSearchValue] = useState<string>("");
  const [rates, setRates] = useState<Record<ETokensConst, number>>(null);
  const [ratesLoading, setRatesLoading] = useState<boolean>(
    columnKeys.includes(AssetTableKeys.PRICE)
  );

  useEffect(() => {
    if (inputRef && inputRef.current && !lg) {
      inputRef.current.focus();
    }
  });

  const { t } = useTranslation();

  const assetsFilter = (asset: ICtxCurrency) => {
    if (balanceFilter && (!asset.balance || asset.balance?.free_balance <= 0)) {
      return false;
    }

    if (allowedFlags) {
      return Object.values(allowedFlags).some((f) => asset.flags[f]);
    }

    return true;
  };

  const tokensList = useMemo<ICtxCurrency[]>(
    () =>
      currencies ? Array.from(currencies.values()).filter(assetsFilter) : [],
    [currencies, blockedCurrencies, allowedFlags]
  );

  useEffect(() => {
    if (!ratesLoading) return;

    (async () => {
      const { data } = await apiGetRates({
        to: "EUR",
      });

      const rates: Record<string, number> = data.result;

      setRates(rates);
      setRatesLoading(false);
    })();
  }, []);

  const searchInpChange = (e: any) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  return (
    <div className={className}>
      <div className={`mb-2`}>
        {!md ? (
          <Input
            allowClear
            ref={inputRef}
            data-testid="SearchName"
            placeholder={t("crypto_assets.search_name")}
            onChange={searchInpChange}
          />
        ) : (
          <div className={styles.SearchInput}>
            <IconApp size={20} code="t12" color="#000" />
            <Input
              className={`${styles.searchInputInner}`}
              wrapperClassName={"w-full"}
              type="text"
              ref={inputRef}
              data-testid="SearchName"
              placeholder={t("crypto_assets.search_name")}
              onChange={searchInpChange}
            />
          </div>
        )}
      </div>

      <div className="mb-10">
        <GTable>
          <GTable.Head>
            {!md && (
              <GTable.Row>
                {columnKeys.map((item: string) => (
                  <GTable.Col
                    className={`flex ${getAlignment(
                      columnKeys,
                      item,
                      md
                    )} my-2 ${getWidth(columnKeys, item, md)}`}
                  >
                    <span className={styles.DeskCol}>{t(item.toLowerCase()).capitalize()}</span>
                  </GTable.Col>
                ))}
              </GTable.Row>
            )}
          </GTable.Head>
          <GTable.Body
            loading={ratesLoading}
            className={`${styles.ItemsList} ${
              !ratesLoading && !md && styles.Loaded
            }`}
          >
            {tokensList
              .filter((value) => searchTokenFilter(value, searchValue))
              .map((currency, index) => (
                <AssetsTableRow key={index}
                  currency={currency} 
                  blockedCurrencies={blockedCurrencies}
                  index={index}
                  onSelect={onSelect}
                  columnKeys={columnKeys}
                  rates={rates}
                 />
              ))}
          </GTable.Body>
        </GTable>
      </div>

      {!ratesLoading && !tokensList.length && (
        <div className={styles.SearchValueTitle}>
          {searchValue.length
            ? `Token "${searchValue}" not found`
            : "Tokens not found"}
        </div>
      )}
    </div>
  );
};

export default AssetsTable;

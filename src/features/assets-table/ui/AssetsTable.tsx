import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Input from "@/shared/ui/input/Input";
import GTable from "@/shared/ui/grid-table/";
import { apiGetRates } from "@/shared/(orval)api/gek";
import ETokensConst from "@/shared/config/coins/constants";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxRootData } from "@/processes/RootContext";

import { AssetsTableRow } from "./AssetsTableRow";
import { AssetTableKeys } from "../model/types";
import { getAlignment, getWidth } from "../model/helpers";
import styles from "./style.module.scss";

interface IParams {
  modal?: boolean;
  className?: string;
  balanceFilter?: boolean;
  allowedFlags?: Array<CurrencyFlags>;
  columnKeys: Array<AssetTableKeys>;
  blockedCurrencies?: Array<string>;
  onSelect?: (currency: string) => void;
  isModal?: boolean;
  border?: boolean;
}

function searchTokenFilter(currency: ICtxCurrency, searchValue: string) {
  return (
    currency.$const?.toLowerCase().includes(searchValue.toLowerCase()) ||
    currency.name?.toLowerCase().includes(searchValue.toLowerCase())
  );
}

const AssetsTable = ({
  balanceFilter,
  className = "",
  columnKeys = [],
  blockedCurrencies,
  allowedFlags,
  onSelect,
  isModal,
  border
}: IParams) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const { lg, md } = useContext(BreakpointsContext);
  const { currencies } = useContext(CtxCurrencies);
  const [searchValue, setSearchValue] = useState<string>("");
  const [rates, setRates] = useState<Record<ETokensConst, number>>(null);
  const [ratesLoading, setRatesLoading] = useState<boolean>(columnKeys.includes(AssetTableKeys.PRICE));

  useEffect(() => {
    if (inputRef && inputRef.current && !lg) {
      inputRef.current.focus();
    }
  });

  const assetsFilter = (asset: ICtxCurrency) => {
    if (balanceFilter && (!asset.balance || asset.balance?.free_balance <= 0)) {
      return false;
    }

    if (allowedFlags) {
      return Object.values(allowedFlags).some(f => asset.flags[f]);
    }

    return true;
  };

  const tokensList = useMemo<ICtxCurrency[]>(
    () => (currencies ? Array.from(currencies.values()).filter(assetsFilter) : []),
    [currencies, blockedCurrencies, allowedFlags]
  );

  useEffect(() => {
    if (!ratesLoading) return;

    (async () => {
      const { data } = await apiGetRates({
        to: "EUR"
      });

      const rates: Record<string, number> = data.result;

      setRates(rates);
      setRatesLoading(false);
    })();
  }, [account]);

  const searchInpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
  };

  return (
    <div className={className}>
      <div className={`mb-2`}>
        {!md ? (
          <Input
            ref={inputRef}
            value={searchValue}
            data-testid='SearchName'
            onChange={searchInpChange}
            placeholder={t("crypto_assets.search_name")}
          />
        ) : (
          <div className={`${styles.SearchInput} ${border && styles.Border}`}>
            <IconApp size={20} code='t12' color='#000' />
            <input
              type='text'
              ref={inputRef}
              value={searchValue}
              data-testid='SearchName'
              onChange={searchInpChange}
              className={styles.searchInputInner}
              placeholder={t("crypto_assets.search_name")}
            />
          </div>
        )}
      </div>

      <div className='mb-10'>
        <GTable>
          <GTable.Head>
            {!md && (
              <GTable.Row>
                {columnKeys.map((item: string) => (
                  <GTable.Col
                    key={item}
                    className={`flex ${styles.TableColTitle} ${getAlignment(columnKeys, item)} my-2 ${getWidth(
                      columnKeys,
                      item,
                      md
                    )}`}
                  >
                    <span className={styles.DeskCol}>{t(item.toLowerCase()).capitalize()}</span>
                  </GTable.Col>
                ))}
              </GTable.Row>
            )}
          </GTable.Head>
          <GTable.Body
            loading={ratesLoading}
            className={`${styles.ItemsList} ${!ratesLoading && !md && styles.Loaded}`}
          >
            {tokensList
              .filter(value => searchTokenFilter(value, searchValue))
              .map((currency, index) => (
                <AssetsTableRow
                  key={currency.$const}
                  border={border}
                  isModal={isModal}
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
          {searchValue.length ? `Token "${searchValue}" not found` : "Tokens not found"}
        </div>
      )}
    </div>
  );
};

export default AssetsTable;

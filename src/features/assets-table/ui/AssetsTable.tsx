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
  const navigate = useNavigate();
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
    if (balanceFilter && asset.balance?.free_balance <= 0) {
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
            // onChange={(e) => {
            //   setSearchValue(e.target.value.trim().toLowerCase());
            // }}
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
              //   onChange={(e) => {
              //     setSearchValue(e.target.value.trim().toLowerCase());
              //   }}
              onChange={searchInpChange}
            />
          </div>
        )}
      </div>

      {/* <div style={{maxHeight: modal ? 550 : 1080}} className='mb-10'> */}
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
                    <span className="text-gray-400 font-medium">{item}</span>
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
            //  style={{maxHeight: modal ? 550 : 1080}}>
          >
            {tokensList
              .filter((value) => searchTokenFilter(value, searchValue))
              .map((currency, index) => (
                <GTable.Row
                  className={`
                                    grid
                                    ${styles.Item}
                                    ${
                                      blockedCurrencies?.includes(
                                        currency.$const
                                      )
                                        ? styles.ItemBlocked
                                        : ""
                                    }
                                    ${
                                      !md && !evenOrOdd(index)
                                        ? "bg-gray-main"
                                        : ""
                                    }
                                    min-h-[56px] lg:min-h-[46px] font-medium hover:font-bold hover:cursor-pointer gap-3
                                    ${md && styles.MobileItem}
                                    `}
                  onClick={() => onSelect(currency.$const)}
                  customTemplateColumns={
                    !(
                      md && !!columnKeys.find((c) => c === AssetTableKeys.PRICE)
                    )
                      ? null
                      : "1fr 0.58fr 0.5fr"
                  }
                >
                  {columnKeys.map((key: string) => (
                    <GTable.Col
                      className={`flex ${getAlignment(columnKeys, key, md)}`}
                    >
                      {key === AssetTableKeys.NAME && (
                        <div className="flex items-center gap-3">
                          <IconCoin
                            height={md ? 40 : 29}
                            className={
                              md ? "max-h-[36px] max-w-[40px]" : "max-h-[40px]"
                            }
                            code={currency.$const}
                          />
                          {!md ? (
                            <span>
                              {!lg || columnKeys.length === 2
                                ? currency.name
                                : currency.$const}
                            </span>
                          ) : (
                            <div className="flex flex-col">
                              <span className="block">{currency.$const}</span>
                              <span
                                className={`${styles.InnerName} block text-xs`}
                              >
                                {currency.name}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {key === AssetTableKeys.CURRENCY && (
                        <span>{currency.$const}</span>
                      )}

                      {key === AssetTableKeys.PRICE && (
                        <span className="block md:text-[14px]">
                          {!rates || rates[currency.$const] === 0
                            ? "—"
                            : `${getCurrencyRounding(
                                rates[currency.$const]
                              )} €`}
                        </span>
                      )}

                      {key === AssetTableKeys.BALANCE && (
                        <div className="flex flex-col justify-evenly min-w-[150px]">
                          <span className="self-start text-[12px] text-[#7B797C] font-regular">
                            {t("free_balance")}:
                          </span>
                          <span className="self-end text-[12px] text-[#1F3446] font-regular">
                            {currency.balance?.free_balance
                              ? `${getRoundingValue(
                                  currency.balance.free_balance,
                                  currency.roundPrec
                                )} ${currency.$const}`
                              : "—"}
                          </span>
                        </div>
                      )}

                      {key === AssetTableKeys.ACTIONS && (
                        <Button
                          size={"sm"}
                          className="w-[60px]"
                          variant='darkBlue'
                          onClick={(e) => {
                            scrollToTop();
                            e.stopPropagation();
                            navigate(`/exchange?to=${currency.$const}`);
                          }}
                        >
                          {t("crypto_assets.buy")}
                        </Button>
                      )}
                    </GTable.Col>
                  ))}
                </GTable.Row>
              ))}
          </GTable.Body>
        </GTable>
      </div>

      {!ratesLoading && !tokensList.length && (
        <div className="text-center text-gray-400">
          {searchValue.length
            ? `Token "${searchValue}" not found`
            : "Tokens not found"}
        </div>
      )}
    </div>
  );
};

export default AssetsTable;

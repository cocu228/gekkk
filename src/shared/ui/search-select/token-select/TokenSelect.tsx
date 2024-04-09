import { Select, SelectProps } from "antd";
import styles from "../style.module.scss";
import { useContext, useMemo } from "react";
import SearchSelect from "../SearchSelect";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";

const { Option } = Select;

interface IParams {
  className?: string;
  allowedFlags?: Array<CurrencyFlags>;
  disabledCurrencies?: Array<string>;
}

function TokenSelect({
  disabledCurrencies,
  allowedFlags,
  className,
  ...props
}: IParams & SelectProps) {
  const { currencies } = useContext(CtxCurrencies);

  const assetsFilter = (asset: ICtxCurrency) => {
    if (allowedFlags) {
      return Object.values(allowedFlags).some((f) => asset.flags[f]);
    }

    return true;
  };

  const currency: ICtxCurrency = useMemo(() => {
    return currencies.get(props.value);
  }, [currencies, props.value]);

  return (
    <SearchSelect
      className={`${styles.Select} ${className && className}`}
      {...props}
      prefixIcon={currency && <IconCoin code={currency.$const} />}
    >
      {Array.from(currencies.values())
        .filter(assetsFilter)
        .map((item) => (
          <Option
            label={item.name}
            value={item.$const}
            className={styles.Option}
            disabled={disabledCurrencies?.includes(item.$const)}
          >
            <span
              className={styles.OptionIcon}
              role="img"
              aria-label={item.name}
            >
              <IconCoin code={item.$const} />
            </span>

            <div>{item.name}</div>
          </Option>
        ))}
    </SearchSelect>
  );
}

export default TokenSelect;

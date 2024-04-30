import { useContext } from "react";
import styles from "./style.module.scss";
import Input from "@/shared/ui/input/Input";
import { CtxExchangeData } from "../../model/context";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { formatAsNumberAndDot } from "@/shared/lib/formatting-helper";
import { useTranslation } from "react-i18next";
import { IconApp } from "@/shared/ui/icons/icon-app";

function PriceField({ disabled }: { disabled?: boolean }) {
  const { to, from, price, onPriceAmountChange, onPriceCurrenciesSwap } =
    useContext(CtxExchangeData);

  const { md } = useBreakpoints();

  const { t } = useTranslation();

  const { amount, isSwapped } = price;

  const priceChange = (event: any) => {
    onPriceAmountChange(formatAsNumberAndDot(event.target.value));
  };

  return (
    <Input
      allowDigits
      className={styles.Field}
      onChange={priceChange}
      type="text"
      placeholder={`-${t("exchange.enter_price").toLowerCase()}-`}
      disabled={!(from.currency && to.currency) || disabled}
      value={!amount ? "" : amount}
      prefix={
        to.currency &&
        from.currency && (
          <div className={styles.FieldPriceLabel}>
            <button
              className={styles.FieldSwitchBtn}
              onClick={onPriceCurrenciesSwap}
            >
              <span>
                {isSwapped
                  ? `${from.currency} ${t("per")} 1 ${to.currency}`
                  : `${to.currency} ${t("per")} 1 ${from.currency}`}
              </span>
              <IconApp code="t60" color="#F8A73E" size={md ? 12 : 17} className="rotate-[90deg] ml-[3px] mr-[1px]" />
            </button>
          </div>
        )
      }
    />
  );
}

export default PriceField;

import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { ICtxCurrency } from "@/processes/CurrenciesContext";

import styles from "../style.module.scss";

interface IParams {
  className?: string;
  children?: ReactNode;
  currency: ICtxCurrency;
}

const DisplayBalance: FC<IParams> = ({ children, className, currency }: IParams) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {children}
      <div>
        {!currency ? null : (
          <span className={`${styles.FieldInfoText} md:text-[var(--gek-mid-grey)]`}>
            {t("exchange.balance")}
            {currency.balance?.free_balance + " " ?? 0 + " "}
            {currency.$const}
          </span>
        )}
      </div>
    </div>
  );
};

export default DisplayBalance;

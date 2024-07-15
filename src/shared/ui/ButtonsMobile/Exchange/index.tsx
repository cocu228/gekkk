import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../styles.module.scss";
import { IconApp } from "../../icons/icon-app";

interface IParams {
  to?: string;
  className?: string;
  isActive?: boolean;
  state?: string;
}

const ExchangeButton = memo(({ to, className = "", isActive, state }: IParams) => {
  const { t } = useTranslation();

  return (
    <NavLink to={to} state={state}>
      <div className={`${styles.MobileButton} ${className}`}>
        <IconApp size={22} code='t01' color={`var(${isActive ? "--gek-dark-blue" : "--gek-mid-grey"})`} />
        <span>{t("exchange_button")}</span>
      </div>
    </NavLink>
  );
});

export default ExchangeButton;

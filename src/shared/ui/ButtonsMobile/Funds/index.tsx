import { memo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import styles from "../styles.module.scss";
import { IconApp } from "../../icons/icon-app";

interface IParams {
  to?: string;
  className?: string;
  isActive?: boolean;
}

const FundsButton = memo(({ to, className, isActive }: IParams) => {
  const { t } = useTranslation();

  return (
    <>
      <NavLink to={to}>
        <div className={`${styles.MobileButton} ${className}`}>
          <IconApp
            className='min-h-[22px]'
            size={22}
            code='t07'
            color={`var(${isActive ? "--gek-dark-blue" : "--gek-mid-grey"})`}
          />
          <span>{t("funds")}</span>
        </div>
      </NavLink>
    </>
  );
});

export default FundsButton;

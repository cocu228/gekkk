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

const TransfersButton = memo(({ to, className = "", isActive, state }: IParams) => {
  const { t } = useTranslation();

  return (
    <>
      <NavLink to={to} state={state}>
        <div className={`${styles.MobileButton} ${className}`}>
          <IconApp
            className='min-h-[22px]'
            size={22}
            code='t03'
            color={`var(${isActive ? "--gek-dark-blue" : "--gek-mid-grey"})`}
          />
          <span>{t("transfers")}</span>
        </div>
      </NavLink>
    </>
  );
});

export default TransfersButton;

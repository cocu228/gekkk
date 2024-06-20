import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../styles.module.scss";
import { IconApp } from "../../icons/icon-app";

interface IParams {
  to?: string;
  className?: string;
}

const CardsMenuButton = memo(({ to, className }: IParams) => {
  const { t } = useTranslation();

  return (
    <>
      <NavLink to={to}>
        <div className={`${styles.MobileButton} ${className}`}>
          <IconApp code='t22' size={40} color='var(--gek-dark-blue)' />
          <span>{t("cards")}</span>
        </div>
      </NavLink>
    </>
  );
});

export default CardsMenuButton;

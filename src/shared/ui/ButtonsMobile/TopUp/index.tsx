import { memo } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../styles.module.scss";
import { IconApp } from "../../icons/icon-app";

interface IParams {
  to?: string;
  className?: string;
}

const TopUpButton = memo(({ to, className }: IParams) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const isTopUp = params.get("tab") === "top_up";

  return (
    <>
      <NavLink to={to}>
        <div className={`${styles.MobileButton} ${className}`}>
          <IconApp code='t02' size={40} color={isTopUp ? "var(--gek-green)" : "var(--gek-dark-blue)"} />
          <span className={isTopUp && "text-[var(--gek-green)]"}>{t("top_up_wallet")}</span>
        </div>
      </NavLink>
    </>
  );
});

export default TopUpButton;

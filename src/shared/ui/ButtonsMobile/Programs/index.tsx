import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../styles.module.scss";
import { IconApp } from "../../icons/icon-app";

interface IParams {
  to?: string;
  className?: string;
  state?: string;
}

const ProgramsButton = memo(({ to, className = "", state }: IParams) => {
  const { t } = useTranslation();

  return (
    <>
      <NavLink to={to} state={state}>
        <div className={`${styles.MobileButton} ${className}`}>
          <IconApp code='t04' size={40} color='var(--gek-dark-blue)' />
          <span>{t("programs")}</span>
        </div>
      </NavLink>
    </>
  );
});

export default ProgramsButton;

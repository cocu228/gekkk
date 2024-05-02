import { memo } from "react";
import styles from "../styles.module.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconApp } from "../../icons/icon-app";

interface IParams {
    to?: string;
    className?: string;
}

const TopUpButton = memo(({ to, className }:IParams) => {
    const {t} = useTranslation();
    
    return(
        <>
            <NavLink to={to}>
                <div className={`${styles.MobileButton} ${className}`}>
                    <IconApp code="t02" size={40} color="var(--gek-dark-blue)"/>
                    <span>{t("top_up_wallet")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default TopUpButton;

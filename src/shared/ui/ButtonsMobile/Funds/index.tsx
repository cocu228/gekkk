import { memo } from "react";
import styles from "../styles.module.scss";
import { useTranslation } from "react-i18next";
import { NavLink, useMatch } from "react-router-dom";
import { IconApp } from "../../icons/icon-app";

interface IParams {
    to?: string;
    className?: string;
    isActive?: boolean;
}

const FundsButton = memo(({ to, className, isActive }: IParams) => {
    const {t} = useTranslation();

    return (
        <>
            <NavLink to={to}>
                <div className={`${styles.MobileButton} ${className}`}>
                    <IconApp size={22} code="t07"
                        color={`var(${isActive ? '--gek-dark-blue' : '--gek-mid-grey'})`}/>
                    <span>{t("funds")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default FundsButton;

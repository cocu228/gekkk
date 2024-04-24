import { memo } from "react";
import styles from "../styles.module.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconApp } from "../../icons/icon-app";


interface IParams {
    to?: string;
    className?: string;
    isActive?: boolean
}

const HistoryButton = memo(({ to, className, isActive }: IParams) => {
    const {t} = useTranslation();

    return (
        <>
            <NavLink to={to}>
                <div className={`${styles.MobileButton} ${className}`}>
                    <IconApp size={22} code="t09" color={isActive ? "#000" : "#9D9D9D"} />
                    <span>{t("history")}</span>
                </div>
            </NavLink>
        </>
    );
});

export default HistoryButton;

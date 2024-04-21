import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles.module.scss";
import { useTranslation } from "react-i18next";

interface IParams {
    to?: string;
    className?: string;
}

const CardsMenuButton = memo(({to, className}: IParams) => {
    const {t} = useTranslation();

    return(
        <>
            <NavLink to={to}>
                <div className={`${styles.MobileButton} ${className}`}>
                    <div className="">
                        <svg width="22" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-width="1.5" fill="none" d="M 15 15.75 H 3 C 1.725 15.75 0.75 14.775 0.75 13.5 V 4.5 C 0.75 3.225 1.725 2.25 3 2.25 H 15 C 16.275 2.25 17.25 3.225 17.25 4.5 V 13.5 C 17.25 14.775 16.275 15.75 15 15.75"/>
                            <path d="M16.4999 7.50015H1.49994C1.04994 7.50015 0.749939 7.20015 0.749939 6.75015C0.749939 6.30015 1.04994 6.00015 1.49994 6.00015H16.4999C16.9499 6.00015 17.2499 6.30015 17.2499 6.75015C17.2499 7.20015 16.9499 7.50015 16.4999 7.50015ZM13.4999 11.2502H10.4999C10.0499 11.2502 9.74994 10.9502 9.74994 10.5002C9.74994 10.0502 10.0499 9.75015 10.4999 9.75015H13.4999C13.9499 9.75015 14.2499 10.0502 14.2499 10.5002C14.2499 10.9502 13.9499 11.2502 13.4999 11.2502Z" fill="#3A5E66"/>
                        </svg>
                    </div>

                    <span>{t("card_menu")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default CardsMenuButton;

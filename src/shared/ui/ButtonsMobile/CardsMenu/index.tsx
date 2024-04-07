import { NavLink } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import CardMenuIcon from "@public/img/icon/CardMenuIcon.svg"

const CardsMenuButton = memo(() => {
    const {t} = useTranslation();

    return(
        <>
            <NavLink to={"/card-menu"}>
                <div className={styles.BottomMenuMobileButtons +` ${(true) && styles.BottomMenuButtonsActive}`}>
                    <img className={styles.BottomMenuMobileButtonsIcons} src={CardMenuIcon} width={20} height={20}/>
                    <span>{t("card_menu")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default CardsMenuButton;

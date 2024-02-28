import { NavLink, useMatch } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"
import { useTranslation } from "react-i18next"

interface IParams {
    wallet?: boolean
}

const FundsButton = memo(({ wallet }: IParams) => {
    const {t} = useTranslation()
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return (
        <>
            <NavLink to={"/"}>
                <div className={styles.BottomMenuMobileButtons + ` ${(homePage || wallet) && styles.BottomMenuButtonsActive}`}>
                    <svg width="24" height="22" viewBox="0 0 21 20" fill="none" stroke={(!!homePage || wallet) ? "#29354C":"#B9B9B5"} xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.25 12.5V8.37289C3.25 7.75473 3.25 7.44566 3.34625 7.17486C3.43135 6.93546 3.57005 6.71868 3.75175 6.5411C3.95729 6.34022 4.23792 6.2107 4.79918 5.95166M3.25 9.33333V14.8333C3.25 15.7668 3.25 16.2335 3.43166 16.59C3.59144 16.9036 3.84641 17.1586 4.16002 17.3183C4.51654 17.5 4.98325 17.5 5.91667 17.5H15.5833C16.5168 17.5 16.9835 17.5 17.34 17.3183C17.6536 17.1586 17.9086 16.9036 18.0683 16.59C18.25 16.2335 18.25 15.7668 18.25 14.8333V9.33333C18.25 8.39991 18.25 7.9332 18.0683 7.57668C17.9086 7.26308 17.6536 7.00811 17.34 6.84832C16.9835 6.66667 16.5168 6.66667 15.5833 6.66667H5.91667C4.98325 6.66667 4.51654 6.66667 4.16002 6.84832C3.84641 7.00811 3.59144 7.26308 3.43166 7.57668C3.25 7.9332 3.25 8.39991 3.25 9.33333Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.0833 6.66677V3.75065C14.0833 3.05753 14.0833 2.71097 13.9373 2.498C13.8098 2.31192 13.6122 2.18551 13.3898 2.14767C13.1352 2.10435 12.8206 2.24958 12.1913 2.54003L4.79918 5.95176C4.23792 6.2108 3.95729 6.34032 3.75175 6.5412C3.57005 6.71878 3.43135 6.93556 3.34625 7.17496C3.25 7.44576 3.25 7.75483 3.25 8.37299V12.5001M14.5 12.0834H14.5083M3.25 9.33343V14.8334C3.25 15.7669 3.25 16.2336 3.43166 16.5901C3.59144 16.9037 3.84641 17.1587 4.16002 17.3184C4.51654 17.5001 4.98325 17.5001 5.91667 17.5001H15.5833C16.5168 17.5001 16.9835 17.5001 17.34 17.3184C17.6536 17.1587 17.9086 16.9037 18.0683 16.5901C18.25 16.2336 18.25 15.7669 18.25 14.8334V9.33343C18.25 8.40001 18.25 7.9333 18.0683 7.57678C17.9086 7.26318 17.6536 7.00821 17.34 6.84842C16.9835 6.66677 16.5168 6.66677 15.5833 6.66677H5.91667C4.98325 6.66677 4.51654 6.66677 4.16002 6.84842C3.84641 7.00821 3.59144 7.26318 3.43166 7.57678C3.25 7.9333 3.25 8.40001 3.25 9.33343ZM14.9167 12.0834C14.9167 12.3136 14.7301 12.5001 14.5 12.5001C14.2699 12.5001 14.0833 12.3136 14.0833 12.0834C14.0833 11.8533 14.2699 11.6668 14.5 11.6668C14.7301 11.6668 14.9167 11.8533 14.9167 12.0834Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.5 12.0834H14.5084M14.9167 12.0834C14.9167 12.3135 14.7302 12.5001 14.5 12.5001C14.2699 12.5001 14.0834 12.3135 14.0834 12.0834C14.0834 11.8533 14.2699 11.6667 14.5 11.6667C14.7302 11.6667 14.9167 11.8533 14.9167 12.0834Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>{t("funds")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default FundsButton

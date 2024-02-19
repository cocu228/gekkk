import { NavLink, useMatch } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"


interface IParams {
    wallet?: boolean
}

const HistoryButton = memo(({ wallet }: IParams) => {

    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    //const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return (
        <>
            <NavLink to={"history"}>
                <div className={styles.BottomMenuMobileButtons + ` ${(historyPage || wallet) && styles.BottomMenuButtonsActive}`}>
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 10H5.00001M7.00001 14H5.00001M13 6H5.00001M17 5.8V16.2C17 17.8801 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8801 21 12.2 21H5.8C4.11985 21 3.27977 21 2.63804 20.673C2.07355 20.3854 1.6146 19.9265 1.32699 19.362C1 18.7202 1 17.8801 1 16.2V5.8C1 4.11985 1 3.27976 1.32699 2.63803C1.6146 2.07355 2.07355 1.6146 2.63804 1.32698C3.27977 1 4.11985 1 5.8 1H12.2C13.8801 1 14.7202 1 15.362 1.32698C15.9265 1.6146 16.3854 2.07355 16.673 2.63803C17 3.27976 17 4.11985 17 5.8Z"
                            stroke={(!!historyPage || wallet) ? "#29354C" : "#B9B9B5"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span>History</span>
                </div>
            </NavLink>
        </>
    )
})

export default HistoryButton

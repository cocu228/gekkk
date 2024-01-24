import { NavLink, useMatch } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"


interface IParams {
    wallet?: boolean
}

const HistoryButton = memo(({wallet}:IParams) => {

    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return(
        <>
            {/* <NavLink to={"history"}> */}
                <div className={styles.BottomMenuMobileButtons +` ${(historyPage || wallet) && styles.BottomMenuButtonsActive}`}>
                    <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M11.6666 9.16667H6.66665M8.33331 12.5H6.66665M13.3333 5.83334H6.66665M16.6666 5.66667V14.3333C16.6666 15.7335 16.6666 16.4335 16.3942 16.9683C16.1545 17.4387 15.772 17.8212 15.3016 18.0609C14.7668 18.3333 14.0668 18.3333 12.6666 18.3333H7.33331C5.93318 18.3333 5.23312 18.3333 4.69834 18.0609C4.22793 17.8212 3.84548 17.4387 3.6058 16.9683C3.33331 16.4335 3.33331 15.7335 3.33331 14.3333V5.66667C3.33331 4.26654 3.33331 3.56647 3.6058 3.0317C3.84548 2.56129 4.22793 2.17884 4.69834 1.93916C5.23312 1.66667 5.93318 1.66667 7.33331 1.66667H12.6666C14.0668 1.66667 14.7668 1.66667 15.3016 1.93916C15.772 2.17884 16.1545 2.56129 16.3942 3.0317C16.6666 3.56647 16.6666 4.26654 16.6666 5.66667Z" stroke="#9D9D9D" fill={(!!historyPage || wallet) ? "#29354C" : "none"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>  
                    <span>History</span>
                </div>
            {/* </NavLink> */}
        </>
    )
})

export default HistoryButton

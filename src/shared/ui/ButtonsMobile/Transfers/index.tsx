import { NavLink, useMatch } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"


interface IParams {
    wallet?: boolean
}

const TransfersButton = memo(({wallet}:IParams) => {

    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const programsPage = useMatch("/programs")
    const topUpPage = useMatch("/topUp")
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return(
        <>
            {/* <NavLink to={"transfers"}> */}
                <div className={styles.BottomMenuMobileButtons +` ${(transfersPage || wallet) && styles.BottomMenuButtonsActive}`}>  
                    <svg className={styles.BottomMenuMobileButtonsIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_568_127)">
                            <path d="M8.74958 11.25L17.4996 2.50004M8.8559 11.5234L11.046 17.1551C11.2389 17.6512 11.3354 17.8993 11.4744 17.9717C11.5949 18.0345 11.7384 18.0346 11.859 17.9719C11.9981 17.8997 12.0949 17.6517 12.2884 17.1558L17.7803 3.0827C17.955 2.63505 18.0424 2.41123 17.9946 2.2682C17.9531 2.144 17.8556 2.04652 17.7314 2.00503C17.5884 1.95725 17.3646 2.0446 16.9169 2.21929L2.84379 7.71124C2.3479 7.90476 2.09995 8.00152 2.02769 8.14061C1.96505 8.26118 1.96514 8.40472 2.02792 8.52522C2.10034 8.66422 2.3484 8.76069 2.84452 8.95363L8.47619 11.1437C8.5769 11.1829 8.62725 11.2025 8.66965 11.2327C8.70724 11.2595 8.7401 11.2924 8.76691 11.33C8.79715 11.3724 8.81673 11.4227 8.8559 11.5234Z" stroke={(!!transfersPage || wallet) ? "#1F3446" : "#9D9D9D"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_568_127">
                            <rect width="20" height="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>                           
                    <span>Transfers</span>
                </div>
            {/* </NavLink> */}
        </>
    )
})

export default TransfersButton
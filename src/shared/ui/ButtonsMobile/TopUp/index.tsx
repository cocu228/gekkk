import { NavLink, useMatch, useNavigate } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"
import { useTranslation } from "react-i18next"


interface IParams {
    wallet?: boolean,
    currency?:string
}

const TopUpButton = memo(({wallet, currency}:IParams) => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const programsPage = useMatch("/programs")
    const topUpPage = useMatch("/topUp")
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage


    
    return(
        <>
            <NavLink to={`/wallet/${currency}/top_up`}>
                <div 
                    className={styles.BottomMenuMobileButtons +` ${(topUpPage || wallet) && styles.BottomMenuButtonsActive}`}
                    // onClick={()=>{navigate(`/wallet/${currency}/top_up`)}}
                >  
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                        <path d="M1 5.73207L1 10.9495C1 12.3193 1 13.0041 1.31063 13.5273C1.58387 13.9875 2.01987 14.3616 2.55613 14.5961C3.16578 14.8627 3.96385 14.8627 5.56 14.8627L10.8801 14.8573M1 5.73207C1 4.36235 1 3.6775 1.31063 3.15434C1.58387 2.69415 2.01987 2.32001 2.55613 2.08553C3.16578 1.81897 3.96385 1.81897 5.56 1.81897H15.44C17.0361 1.81897 17.8342 1.81897 18.4439 2.08553C18.9801 2.32001 19.4161 2.69415 19.6894 3.15434C20 3.6775 20 4.36235 20 5.73207M1 5.73207L20 5.73207M20 10.9495V5.73207M18.4439 12.9059L15.024 8.98813L11.604 12.9059M15.024 11.4384V16.819" stroke="#29354C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className={styles.TopUpText}>{t("top_up_wallet")}</span>
                </div>
            </NavLink>
        </>
    )
})

export default TopUpButton

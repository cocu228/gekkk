import { NavLink, Navigate, useMatch, useNavigate, useParams } from "react-router-dom"
import styles from "../styles.module.scss"
import { memo } from "react"


interface IParams {
    wallet?: boolean,
}

const ProgramsButton = memo(({wallet}:IParams) => {

    const homePage = useMatch("/")
    const transfersPage = useMatch("/transfers") //not used
    const exchangePage = useMatch("/exchange")
    const historyPage = useMatch("/history") //not used   
    const programsPage = useMatch("/programs")
    const navigate = useNavigate();
    const {currency} = useParams()
    const isOnMainPages = !!homePage || !!transfersPage || !!exchangePage || !!historyPage

    return(
        <>
            <div onClick={()=>{navigate(`/wallet/${currency}/programs`)}} className={styles.BottomMenuMobileButtons +` ${(programsPage || wallet) && styles.BottomMenuButtonsActive}`}>  
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                    <path d="M20.8424 5.5C20.8424 8.12335 18.7158 10.25 16.0924 10.25C13.4691 10.25 11.3424 8.12335 11.3424 5.5C11.3424 2.87665 13.4691 0.75 16.0924 0.75C18.7158 0.75 20.8424 2.87665 20.8424 5.5Z" stroke={wallet && "#29354C"} stroke-width="1.5"/>
                    <path d="M17.5924 3L14.5924 8" stroke="#29354C" stroke-linecap="round"/>
                    <circle cx="14.5924" cy="4" r="1" fill="#29354C"/>
                    <circle cx="17.5924" cy="7" r="1" fill="#29354C"/>
                    <path d="M4.40834 14.0771L1.69524 15.5699L5.69527 22.4946L8.1949 20.9946L3.59244 13.5C3.59244 13.5 5.01238 15.5269 5.09244 15.5C5.17249 15.4731 10.0927 12.5 10.7965 12.57C11.5003 12.6401 17.6949 13.0976 17.6949 13.9946C17.6949 14.8916 17.6949 13.9946 17.7965 14.7993C17.898 15.604 17.6949 15.5699 17.6949 15.5699M8.15531 20.0699L11.0927 19L14.2831 19.4285L17.7965 19.4285L21.6953 17.4946L25.0927 13.9946L25.0927 13.4999L24.6953 12.4946L23.5927 12L23.2967 12.07L20.6953 13.9946L17.6949 15.5699M17.6949 15.5699L13.6949 15.4946" stroke="#29354C" stroke-width="1.8"/>
                </svg>
                <span>Programs</span>
            </div>
        </>
    )
})

export default ProgramsButton

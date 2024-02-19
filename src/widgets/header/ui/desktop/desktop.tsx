import {useContext} from "react";
import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
// import {useAuth} from "@/app/providers/(no-usages)AuthRouter";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import {getFormattedIBAN, logout} from "@/shared/lib/helpers";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {AccountRights} from "@/shared/config/account-rights";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";
import {getInitialProps, useTranslation} from "react-i18next";

const HeaderDesktop = ({items, actions}) => {

    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const {t} = useTranslation()
    const {initialLanguage} = getInitialProps();

    const languageName = () => {
        switch (initialLanguage) {
            case "en":
                return "English"
            case "de":
                return "Deutsch"
            case "ru":
                return "Русский"
        }
    }

    console.log(account)

    let acc = {
        "name": "Ralf Williams",
        "phone": "79111111111",
        "rights": {
            "none": true,
            "withdrawBlock": false,
            "topUpBlock": false,
            "exchangeBlock": false,
            "innerTransferBlock": false,
            "investBlock": false,
            "logInBlock": false,
            "allTokensNetworks": false,
            "isJuridical": false,
            "gkeBonusBlock": false,
            "blockAll": false,
            "juridicalBlock": false,
            "deleted": false
        },
        "number": "MT07PAPY36836000002676370005866",
        "current": true,
        "account_id": "PPY6963",
        "date_update": "2023-12-25T14:12:49.8033333"
    }


    return <>
        <header className={styles.Header}>
            <div className={styles.ContainerLogo}>
                <a onClick={() => navigate('/')}>
                    <svg width="100%" height="40px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 137 45" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path
                                d="M38.931 36.363c-.87-1.48-2.308-2.395-3.919-2.57-.523-.13-1.045-.304-1.524-.566-2.482-1.437-3.353-4.572-1.96-7.054a.33.33 0 00.087-.174v-.044c.523-.914.828-1.916.958-3.005v-.087-.087c0-.827-.653-1.48-1.437-1.48H25.65c-.827 0-1.48.653-1.48 1.48 0 .828.653 1.48 1.48 1.48h3.615c-.828 1.699-2.57 2.875-4.573 2.875a5.055 5.055 0 01-5.051-5.052 5.055 5.055 0 015.051-5.051 4.98 4.98 0 014.355 2.526c.261.435.74.74 1.263.74.827 0 1.48-.653 1.48-1.48 0-.306-.087-.567-.217-.785-1.394-2.482-.523-5.617 1.96-7.054.479-.261 1.001-.48 1.524-.566a5.24 5.24 0 003.919-2.57c1.437-2.482.566-5.66-1.916-7.098-2.482-1.437-5.661-.566-7.098 1.916a5.061 5.061 0 00-.262 4.66c.174.522.262 1.045.262 1.611a5.223 5.223 0 01-5.139 5.226h-.174a5.223 5.223 0 01-5.139-5.226c0-.566.087-1.089.261-1.611a5.335 5.335 0 00-.26-4.66C18.071.175 14.892-.696 12.41.741 9.929 2.178 9.058 5.357 10.495 7.84c.87 1.48 2.308 2.395 3.92 2.57.522.13 1.044.304 1.523.566 2.439 1.393 3.31 4.529 2.004 6.967-.044.087-.131.174-.175.305-1.48 2.395-4.616 3.18-7.054 1.786-.523-.305-.958-.654-1.307-1.09-.958-1.218-2.438-2.046-4.137-2.046C2.352 16.897 0 19.205 0 22.08c0 2.874 2.352 5.183 5.182 5.183a5.136 5.136 0 004.137-2.047c.349-.436.784-.784 1.307-1.089 2.438-1.437 5.574-.61 7.054 1.785.044.088.087.175.174.305 1.307 2.482.436 5.574-2.003 6.968-.479.261-1.001.479-1.524.566a5.24 5.24 0 00-3.92 2.57c-1.436 2.481-.565 5.66 1.917 7.097 2.482 1.438 5.661.567 7.098-1.916a5.061 5.061 0 00.261-4.66 4.998 4.998 0 01-.26-1.61c0-2.831 2.264-5.183 5.138-5.226h.174a5.223 5.223 0 015.139 5.226c0 .566-.088 1.088-.262 1.61a5.335 5.335 0 00.262 4.66c1.437 2.483 4.616 3.354 7.098 1.916 2.569-1.393 3.396-4.572 1.96-7.054z"
                                fill="white"></path>
                            <path id="Gekkard-text" fill="#fefefe"
                                  d="M56.699 16.2c0-1.089.522-1.873 1.698-1.873h5.356c1.045 0 1.524.74 1.524 1.48 0 .741-.522 1.481-1.524 1.481h-3.788v3.136h3.527c1.045 0 1.568.74 1.568 1.48s-.523 1.481-1.568 1.481h-3.527v3.266h3.962c1.046 0 1.525.74 1.525 1.48 0 .741-.523 1.481-1.524 1.481h-5.575c-.958 0-1.654-.653-1.654-1.611V16.2zM67.934 15.764c0-.87.653-1.611 1.611-1.611.915 0 1.611.61 1.611 1.611v4.66l5.313-5.618c.218-.261.653-.61 1.263-.61.827 0 1.611.61 1.611 1.568 0 .566-.348 1.002-1.045 1.742l-4.05 4.006 4.965 5.183c.479.522.914 1.001.914 1.654 0 1.002-.784 1.48-1.698 1.48-.61 0-1.045-.348-1.655-1l-5.574-6.01v5.487c0 .827-.653 1.567-1.611 1.567-.915 0-1.612-.61-1.612-1.567V15.764h-.043zM82.566 15.764c0-.87.653-1.611 1.611-1.611.914 0 1.611.61 1.611 1.611v4.66l5.313-5.618c.218-.261.653-.61 1.263-.61.827 0 1.611.61 1.611 1.568 0 .566-.348 1.002-1.045 1.742l-4.05 4.006 4.965 5.183c.479.522.914 1.001.914 1.654 0 1.002-.784 1.48-1.698 1.48-.61 0-1.045-.348-1.655-1l-5.618-6.097v5.487c0 .827-.653 1.567-1.611 1.567-.914 0-1.611-.61-1.611-1.567V15.764zM54.216 22.776c0-.828-.653-1.48-1.437-1.48h-5.574c-.827 0-1.48.652-1.48 1.48 0 .827.653 1.48 1.48 1.48h3.615c-.828 1.699-2.57 2.875-4.573 2.875a5.055 5.055 0 01-5.051-5.052 5.055 5.055 0 015.051-5.052c1.83 0 3.44 1.002 4.355 2.483.261.479.74.784 1.306.784.828 0 1.481-.654 1.481-1.481 0-.348-.13-.653-.305-.871-1.393-2.264-3.92-3.832-6.793-3.832-4.398 0-8.013 3.57-8.013 8.013-.043 4.354 3.527 7.925 7.97 7.925 4.093 0 7.49-3.092 7.968-7.098-.043-.044 0-.087 0-.174zM100.551 15.851c.348-1.001 1.219-1.785 2.308-1.785 1.132 0 1.916.74 2.308 1.785l4.224 11.715c.131.348.174.653.174.784 0 .827-.697 1.436-1.481 1.436-.914 0-1.349-.479-1.567-1.132l-.653-2.003h-5.966l-.654 2.003c-.217.654-.653 1.133-1.567 1.133-.871 0-1.612-.654-1.612-1.525 0-.348.088-.61.131-.696l4.355-11.715zm.261 7.795h4.094l-2.004-6.227h-.043l-2.047 6.227zM111.438 16.026c0-1.046.566-1.699 1.654-1.699h3.789c3.31 0 5.356 1.48 5.356 4.877 0 2.352-1.785 3.702-3.962 4.05l3.658 3.92c.304.305.435.653.435.958 0 .827-.653 1.654-1.611 1.654-.392 0-.915-.13-1.263-.566l-4.79-5.791h-.044v4.66c0 1.088-.697 1.654-1.611 1.654-.915 0-1.611-.61-1.611-1.655V16.025zm3.222 5.095h2.221c1.176 0 2.003-.697 2.003-1.916 0-1.22-.827-1.873-2.003-1.873h-2.221v3.788zM124.241 15.982c0-1.002.696-1.655 1.654-1.655h3.571c4.834 0 7.578 3.092 7.578 7.882 0 4.53-2.918 7.447-7.36 7.447h-3.745c-.697 0-1.698-.392-1.698-1.611V15.982zm3.222 10.713h2.177c2.788 0 4.05-2.047 4.05-4.616 0-2.744-1.306-4.747-4.267-4.747h-1.96v9.363z"></path>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear" x1="7.703" y1="39.081" x2="41.691" y2="5.092"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#009EE2"></stop>
                                <stop offset="1" stop-color="#76B72A"></stop>
                            </linearGradient>
                            <clipPath id="clip0">
                                <path fill="#fff" d="M0 0h137v44.157H0z"></path>
                            </clipPath>
                        </defs>
                    </svg>

                </a>
            </div>
            <div className={styles.CommandsMenu}>
                <HeaderMenu items={items} actions={actions} className="pl-5">
                    <div className="flex items-center justify-center" data-testid="HeaderMenuContainer">
                        {/* <div className="wrapper flex justify-end"> */}
                        {account?.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22}/> :
                            <img width={24}
                                 height={24}
                                 alt="UserIcon"
                                 src="/img/icon/UserIconMobile.svg"
                                 className={styles.AccountIcon}
                            />}
                        {account?.number &&
                            <div className="wrapper flex flex-col justify-center  self-stretch">
                                <span className={styles.Name}>{account?.name}</span>

                                <span className={styles.Number}>
                                        {getFormattedIBAN(account?.number)}
                                    </span>
                            </div>
                        }

                        <button className={`${styles.ArrowBtn}`}></button>
                        {/* </div> */}
                    </div>
                </HeaderMenu>
                <div className={styles.HeaderItemsContainer}>
                    <LocalizationMenu/><span className={styles.HeaderMenuTitles}>{languageName()}</span>
                </div>
                {/* <Box display={"flex"} alignItems={"center"} paddingLeft={"60px"} gap="16px">

                    <Link to="/faq" style={{color: 'white'}}>
                        <FaqIcon/>
                    </Link>
                    <Link to='/settings' style={{color: 'white'}}>
                        <SettingsIcon/>
                    </Link>
                </Box> */}
                <button onClick={logout}>
                    <div className={styles.HeaderItemsContainer}>
                        <div className="ml-5" data-testid="Logout">
                            <img width={22} height={22} src="/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                        </div>
                        <span className={styles.HeaderMenuTitles}>{t("logout")}</span>
                    </div>
                </button>
            </div>
        </header>
    </>
}

export default HeaderDesktop;

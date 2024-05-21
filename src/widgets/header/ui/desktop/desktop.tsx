import {useContext, useState} from "react";
import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import {getFormattedIBAN, logout} from "@/shared/lib/helpers";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {AccountRights} from "@/shared/config/account-rights";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";
import {useTranslation} from "react-i18next";
import { IconApp } from "@/shared/ui/icons/icon-app";

const HeaderDesktop = ({items, actions}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    return <>
        <header className={styles.Header}>
            <div className={styles.ContainerLogo}>
                <a onClick={() => navigate('/')}>
                    <svg width="100%" height="40px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 137 45" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <IconApp color='#fff' code='t62' size={40} />
                            <path id="Gekkard-text" fill="#fefefe"
                                  d="M56.699 16.2c0-1.089.522-1.873 1.698-1.873h5.356c1.045 0 1.524.74 1.524 1.48 0 .741-.522 1.481-1.524 1.481h-3.788v3.136h3.527c1.045 0 1.568.74 1.568 1.48s-.523 1.481-1.568 1.481h-3.527v3.266h3.962c1.046 0 1.525.74 1.525 1.48 0 .741-.523 1.481-1.524 1.481h-5.575c-.958 0-1.654-.653-1.654-1.611V16.2zM67.934 15.764c0-.87.653-1.611 1.611-1.611.915 0 1.611.61 1.611 1.611v4.66l5.313-5.618c.218-.261.653-.61 1.263-.61.827 0 1.611.61 1.611 1.568 0 .566-.348 1.002-1.045 1.742l-4.05 4.006 4.965 5.183c.479.522.914 1.001.914 1.654 0 1.002-.784 1.48-1.698 1.48-.61 0-1.045-.348-1.655-1l-5.574-6.01v5.487c0 .827-.653 1.567-1.611 1.567-.915 0-1.612-.61-1.612-1.567V15.764h-.043zM82.566 15.764c0-.87.653-1.611 1.611-1.611.914 0 1.611.61 1.611 1.611v4.66l5.313-5.618c.218-.261.653-.61 1.263-.61.827 0 1.611.61 1.611 1.568 0 .566-.348 1.002-1.045 1.742l-4.05 4.006 4.965 5.183c.479.522.914 1.001.914 1.654 0 1.002-.784 1.48-1.698 1.48-.61 0-1.045-.348-1.655-1l-5.618-6.097v5.487c0 .827-.653 1.567-1.611 1.567-.914 0-1.611-.61-1.611-1.567V15.764zM54.216 22.776c0-.828-.653-1.48-1.437-1.48h-5.574c-.827 0-1.48.652-1.48 1.48 0 .827.653 1.48 1.48 1.48h3.615c-.828 1.699-2.57 2.875-4.573 2.875a5.055 5.055 0 01-5.051-5.052 5.055 5.055 0 015.051-5.052c1.83 0 3.44 1.002 4.355 2.483.261.479.74.784 1.306.784.828 0 1.481-.654 1.481-1.481 0-.348-.13-.653-.305-.871-1.393-2.264-3.92-3.832-6.793-3.832-4.398 0-8.013 3.57-8.013 8.013-.043 4.354 3.527 7.925 7.97 7.925 4.093 0 7.49-3.092 7.968-7.098-.043-.044 0-.087 0-.174zM100.551 15.851c.348-1.001 1.219-1.785 2.308-1.785 1.132 0 1.916.74 2.308 1.785l4.224 11.715c.131.348.174.653.174.784 0 .827-.697 1.436-1.481 1.436-.914 0-1.349-.479-1.567-1.132l-.653-2.003h-5.966l-.654 2.003c-.217.654-.653 1.133-1.567 1.133-.871 0-1.612-.654-1.612-1.525 0-.348.088-.61.131-.696l4.355-11.715zm.261 7.795h4.094l-2.004-6.227h-.043l-2.047 6.227zM111.438 16.026c0-1.046.566-1.699 1.654-1.699h3.789c3.31 0 5.356 1.48 5.356 4.877 0 2.352-1.785 3.702-3.962 4.05l3.658 3.92c.304.305.435.653.435.958 0 .827-.653 1.654-1.611 1.654-.392 0-.915-.13-1.263-.566l-4.79-5.791h-.044v4.66c0 1.088-.697 1.654-1.611 1.654-.915 0-1.611-.61-1.611-1.655V16.025zm3.222 5.095h2.221c1.176 0 2.003-.697 2.003-1.916 0-1.22-.827-1.873-2.003-1.873h-2.221v3.788zM124.241 15.982c0-1.002.696-1.655 1.654-1.655h3.571c4.834 0 7.578 3.092 7.578 7.882 0 4.53-2.918 7.447-7.36 7.447h-3.745c-.697 0-1.698-.392-1.698-1.611V15.982zm3.222 10.713h2.177c2.788 0 4.05-2.047 4.05-4.616 0-2.744-1.306-4.747-4.267-4.747h-1.96v9.363z"></path>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear" x1="7.703" y1="39.081" x2="41.691" y2="5.092"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#009EE2"></stop>
                                <stop offset="1" stopColor="#76B72A"></stop>
                            </linearGradient>
                            <clipPath id="clip0">
                                <path fill="#fff" d="M0 0h137v44.157H0z"></path>
                            </clipPath>
                        </defs>
                    </svg>
                </a>
            </div>
            <div className={styles.CommandsMenu}>
                <HeaderMenu
                    items={items}
                    className="pl-5"
                    actions={actions}
                    onStateChange={setIsMenuOpened}
                >
                    <div className="flex items-center justify-center" data-testid="HeaderMenuContainer">
                        {/* <div className="wrapper flex justify-end"> */}
                        {account?.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22}/> :
                            <IconApp color="#fff" code='t10' size={20} />}
                        {account?.number &&
                            <div className="wrapper flex flex-col justify-center  self-stretch">
                                <span className={styles.Name}>{account?.name}</span>

                                <span className={styles.Number}>
                                        {getFormattedIBAN(account?.number)}
                                    </span>
                            </div>
                        }

                        <button className={`${styles.ArrowBtn}`}>
                            <IconApp
                                size={14}
                                code="t08"
                                color="#fff"
                                className={`rotate-[${isMenuOpened ? '-90' : '90'}deg]`}
                            />
                        </button>
                        {/* </div> */}
                    </div>
                </HeaderMenu>
                <div className={styles.HeaderItemsContainer}>
                    <LocalizationMenu/><span className={styles.HeaderMenuTitles}>{t("language_name")}</span>
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
                            <IconApp color='#fff' code="t20" size={22} />
                        </div>
                        <span className={styles.HeaderMenuTitles}>{t("logout")}</span>
                    </div>
                </button>
            </div>
        </header>
    </>
}

export default HeaderDesktop;

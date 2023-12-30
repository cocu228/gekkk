import { useContext } from "react";
import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthRouter";
import { CtxRootData } from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import { getFormattedIBAN } from "@/shared/lib/helpers";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import { AccountRights } from "@/shared/config/account-rights";
import { LocalizationMenu } from "@/widgets/header/ui/LocalizationMenu";
import chatIcon from '../../../../assets/support-icon-grey.svg'
import FaqIcon from '@/assets/faq-icon.svg?react';
import SettingsIcon from '@/assets/settings-icon.svg?react';
import { Box} from '@mui/material';

const HeaderDesktop = ({ items, actions }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { account } = useContext(CtxRootData);

    return <>
        <header className={styles.Header}>
            <div className={styles.ContainerLogo}>
                <a onClick={() => navigate('/')}>
                    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.2332 32.9258C34.4612 31.5893 33.1298 30.7731 31.7079 30.6036C31.2392 30.5011 30.7744 30.3276 30.3332 30.0753C28.0999 28.7861 27.32 25.9474 28.5568 23.6961C28.5883 23.6449 28.6198 23.5897 28.6474 23.5384C28.6513 23.5305 28.6553 23.5227 28.6592 23.5187C29.1161 22.7026 29.4194 21.7879 29.5258 20.8141C29.5258 20.8023 29.5258 20.7944 29.5258 20.7825C29.5258 20.7628 29.5297 20.7471 29.5336 20.7273C29.5336 20.7037 29.5336 20.68 29.5336 20.6564C29.5336 19.927 28.9468 19.3317 28.2181 19.3238H23.1842C22.4516 19.3238 21.8529 19.9191 21.8529 20.6564C21.8529 21.3936 22.4476 21.989 23.1842 21.989H26.4692C25.7287 23.5227 24.1571 24.5832 22.3413 24.5832C19.8086 24.5832 17.7604 22.5291 17.7604 19.998C17.7604 17.4668 19.8125 15.4127 22.3413 15.4127C24.0271 15.4127 25.5002 16.3274 26.2998 17.6876C26.5283 18.0818 26.9576 18.346 27.446 18.346C28.1787 18.346 28.7774 17.7507 28.7774 17.0134C28.7774 16.7492 28.6947 16.5048 28.5607 16.2998C27.32 14.0485 28.0999 11.2099 30.3332 9.92061C30.7705 9.66829 31.2352 9.49087 31.7079 9.3923C33.1338 9.22277 34.4612 8.41059 35.2332 7.0701C36.533 4.81886 35.761 1.9368 33.5119 0.635738C31.2628 -0.665328 28.3835 0.107426 27.0876 2.35866C26.3156 3.69916 26.2762 5.26043 26.8434 6.57727C26.9931 7.03461 27.0719 7.5235 27.0719 8.0321C27.0719 10.6185 25 12.7199 22.424 12.7593C22.4004 12.7593 22.3728 12.7593 22.3491 12.7593C22.3176 12.7593 22.2901 12.7593 22.2625 12.7593C19.6943 12.712 17.6264 10.6145 17.6264 8.0321C17.6264 7.5235 17.7052 7.03856 17.8549 6.57727C18.4221 5.25649 18.3827 3.69521 17.6107 2.35866C16.299 0.103484 13.4237 -0.66927 11.1746 0.631795C8.92548 1.93286 8.15346 4.81098 9.45329 7.06616C10.2253 8.40665 11.5566 9.22277 12.9786 9.38836C13.4512 9.49087 13.9121 9.66434 14.3493 9.91667C16.5629 11.198 17.3507 13.9973 16.1533 16.2406C16.1021 16.3234 16.0509 16.4102 16.0036 16.4969C14.6644 18.6654 11.8402 19.3908 9.61872 18.1094C9.16181 17.8453 8.76792 17.5102 8.43706 17.1356C7.57839 16.0159 6.22341 15.2905 4.70301 15.2905C2.1073 15.2905 0 17.3998 0 20.0019C0 22.604 2.1073 24.7094 4.70301 24.7094C6.22735 24.7094 7.57839 23.984 8.43706 22.8642C8.76792 22.4858 9.16181 22.1546 9.61872 21.8904C11.8402 20.6091 14.6644 21.3345 15.9997 23.503C16.047 23.5897 16.0982 23.6764 16.1494 23.7592C17.3468 25.9986 16.559 28.8018 14.3454 30.0832C13.9081 30.3395 13.4434 30.5129 12.9746 30.6115C11.5488 30.781 10.2214 31.5932 9.44935 32.9337C8.14952 35.1849 8.92154 38.067 11.1706 39.3681C13.4197 40.6691 16.2951 39.8964 17.5949 37.6451C18.367 36.3046 18.4063 34.7434 17.8391 33.4265C17.6895 32.9692 17.6107 32.4803 17.6107 31.9717C17.6107 29.3893 19.6786 27.2918 22.2467 27.2445C22.2743 27.2445 22.3058 27.2445 22.3334 27.2445C22.361 27.2445 22.3925 27.2445 22.424 27.2445C24.9921 27.2918 27.0561 29.3932 27.0561 31.9717C27.0561 32.4803 26.9773 32.9692 26.8276 33.4265C26.2604 34.7434 26.2998 36.3046 27.0719 37.6451C28.3717 39.8964 31.2471 40.6691 33.4962 39.3681C35.7492 38.067 36.5173 35.1889 35.2174 32.9337L35.2332 32.9258Z"
                            fill="#FFFFFF" />
                    </svg>
                    {/* <img src="/img/logo.svg" width={165} height={55} alt="logo"/> */}
                </a>
            </div>
            <div className={styles.CommandsMenu}>
                <HeaderMenu items={items} actions={actions} mobile={false}>
                    <div className={styles.AccMenu} data-testid="HeaderMenuContainer">
                        <div className="wrapper mr-2">
                            {account.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22} /> :
                                // <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                //     <path d="M29.0625 28.9375C29.0625 28.9375 29.0625 27.0039 28.9014 25.9932C28.7695 25.1948 27.6636 24.1401 22.9614 22.4116C18.3325 20.7124 18.6182 21.54 18.6182 18.4126C18.6182 16.3838 19.6509 17.563 20.3101 13.7104C20.5664 12.1943 20.7715 13.2051 21.3281 10.7734C21.6211 9.49902 21.1304 9.40381 21.189 8.7959C21.2476 8.18799 21.3062 7.646 21.416 6.40088C21.5479 4.86279 20.1196 0.8125 15 0.8125C9.88037 0.8125 8.45215 4.86279 8.59131 6.4082C8.70117 7.646 8.75977 8.19531 8.81836 8.80322C8.87695 9.41113 8.38623 9.50635 8.6792 10.7808C9.23584 13.2051 9.44092 12.1943 9.69727 13.7178C10.3564 17.5703 11.3892 16.3911 11.3892 18.4199C11.3892 21.5547 11.6748 20.7271 7.0459 22.4189C2.34375 24.1401 1.23047 25.2021 1.10596 26.0005C0.9375 27.0039 0.9375 28.9375 0.9375 28.9375H15H29.0625Z" fill="#3A5E66" />
                                // </svg>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15.9375" r="15" fill="white" />
                                    <path d="M29.0625 30.9375C29.0625 30.9375 29.0625 29.0039 28.9014 27.9932C28.7695 27.1948 27.6636 26.1401 22.9614 24.4116C18.3325 22.7124 18.6182 23.54 18.6182 20.4126C18.6182 18.3838 19.6509 19.563 20.3101 15.7104C20.5664 14.1943 20.7715 15.2051 21.3281 12.7734C21.6211 11.499 21.1304 11.4038 21.189 10.7959C21.2476 10.188 21.3062 9.646 21.416 8.40088C21.5479 6.86279 20.1196 2.8125 15 2.8125C9.88037 2.8125 8.45215 6.86279 8.59131 8.4082C8.70117 9.646 8.75977 10.1953 8.81836 10.8032C8.87695 11.4111 8.38623 11.5063 8.6792 12.7808C9.23584 15.2051 9.44092 14.1943 9.69727 15.7178C10.3564 19.5703 11.3892 18.3911 11.3892 20.4199C11.3892 23.5547 11.6748 22.7271 7.0459 24.4189C2.34375 26.1401 1.23047 27.2021 1.10596 28.0005C0.9375 29.0039 0.9375 30.9375 0.9375 30.9375H15H29.0625Z" fill="#3A5E66" />
                                </svg>
                                //<img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon" />
                            }
                        </div>

                        {account.number && <div className="wrapper">
                            <div className="row">
                                <span className="text-sm font-bold">{account.name}</span>
                            </div>

                            <div className="row text-start flex">
                                <span className="text-xs text-start text-gray-400 font-bold leading-3">
                                    {getFormattedIBAN(account.number)}
                                </span>
                            </div>
                        </div>}

                        <img
                            className="inline-flex mb-3"
                            src="/img/icon/DropdownTriangleIcon.svg"
                            alt="DropdownTriangleIcon"
                        />
                    </div>
                </HeaderMenu>
                <LocalizationMenu />
                <Box display={"flex"} alignItems={"center"} paddingLeft={"60px"} gap="16px">

                    <Link to="/faq" style={{ color: 'white' }}>
                        <FaqIcon />
                    </Link>
                    <Link to='/settings' style={{ color: 'white' }}>
                        <SettingsIcon />
                    </Link>
                </Box>
                <button onClick={() => navigate('/support/chat')}>
                    <div className="ml-5" data-testid="Logout">
                        <img src={chatIcon} alt="ChatIcon" />
                    </div>
                </button>
                <button onClick={logout}>
                    <div className="ml-5 pb-1" data-testid="Logout">
                        <img width={26} height={26} src="/img/icon/LogoutIcon.svg" alt="UserIcon" />
                    </div>
                </button>
            </div>
        </header>
    </>
}

export default HeaderDesktop;

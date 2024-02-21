import React, { useContext } from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import { useTranslation } from 'react-i18next';
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';
import styles from "./style.module.scss"
import { NavLink } from 'react-router-dom';


const Support = () => {
    const {t} = useTranslation();
    const {md} = useContext(BreakpointsContext);
    
    if(md){
        return (
            <div className={styles.Support}>
                <div className={styles.Choice}>
                    <div className={styles.Assets}>
                        <NavLink to={"/faq"}>
                            <div className={styles.FAQ}>
                                <div className={styles.Icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
                                        <path d="M20.0811 0C16.1254 0 12.2586 1.17298 8.96966 3.37061C5.68067 5.56824 3.11722 8.69181 1.60347 12.3463C0.0897205 16.0009 -0.306346 20.0222 0.465358 23.9018C1.23706 27.7814 3.14188 31.3451 5.93893 34.1421C8.73598 36.9392 12.2996 38.844 16.1793 39.6157C20.0589 40.3874 24.0802 39.9913 27.7347 38.4776C31.3892 36.9638 34.5128 34.4004 36.7104 31.1114C38.9081 27.8224 40.0811 23.9556 40.0811 20C40.0748 14.6976 37.9657 9.61415 34.2163 5.86477C30.4669 2.1154 25.3835 0.0062554 20.0811 0ZM20.0811 36.3636C16.8446 36.3636 13.6809 35.4039 10.9899 33.6059C8.29893 31.8078 6.20156 29.2522 4.96303 26.2621C3.72451 23.272 3.40045 19.9818 4.03185 16.8076C4.66324 13.6334 6.22173 10.7177 8.51022 8.42916C10.7987 6.14067 13.7144 4.58218 16.8887 3.95079C20.0629 3.31939 23.3531 3.64345 26.3432 4.88197C29.3332 6.1205 31.8889 8.21786 33.6869 10.9088C35.485 13.5998 36.4447 16.7636 36.4447 20C36.4394 24.3383 34.7137 28.4974 31.6461 31.565C28.5784 34.6326 24.4193 36.3583 20.0811 36.3636ZM21.5 28.5L22 30L21.5 31.5L20.0811 32L18.5 31.5L18 30L18.5 28.5L20 28L21.5 28.5ZM27.3538 15.4545C27.3558 16.545 27.1115 17.6218 26.6393 18.6046C26.1671 19.5875 25.479 20.451 24.6265 21.1309C23.2494 22.1981 22.3182 23.7391 22.0138 25.4545H18.3192C18.48 24.0528 18.9198 22.6974 19.6127 21.4683C20.3057 20.2392 21.2377 19.1613 22.3538 18.2982C22.8017 17.9397 23.1584 17.4803 23.3948 16.9576C23.6313 16.4349 23.7406 15.8636 23.714 15.2905C23.6874 14.7175 23.5256 14.1588 23.2418 13.6602C22.958 13.1616 22.5602 12.7373 22.0811 12.4218C21.547 12.0727 20.9325 11.8661 20.296 11.8215C19.6595 11.777 19.0222 11.896 18.4447 12.1673C17.8287 12.4625 17.3117 12.9304 16.9567 13.514C16.6016 14.0976 16.4237 14.7718 16.4447 15.4545C16.4447 15.9368 16.2531 16.3992 15.9122 16.7402C15.5712 17.0812 15.1087 17.2727 14.6265 17.2727C14.1443 17.2727 13.6818 17.0812 13.3409 16.7402C12.9999 16.3992 12.8083 15.9368 12.8083 15.4545C12.7813 14.0572 13.1668 12.6828 13.9168 11.5034C14.6667 10.324 15.7478 9.39187 17.0247 8.82364C18.1566 8.31778 19.3977 8.10508 20.6334 8.20518C21.8692 8.30527 23.0599 8.71493 24.0956 9.39636C25.0964 10.0589 25.9177 10.9588 26.4862 12.0159C27.0547 13.073 27.3528 14.2543 27.3538 15.4545Z" fill="#29354C"/>
                                    </svg>
                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("FAQ")}</div>
                                    <div className={styles.MainDescription}>{t("to_find_answers_to_common_questions_open_the_faq")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z" fill="#9D9D9D"/>
                                    </svg>
                                </div>
                            </div>
                        </NavLink>
                        <div className={styles.Email}>
                            <div className={styles.Icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <circle cx="21.0811" cy="21" r="19" stroke="#29354C" strokeWidth="3"/>
                                    <rect x="12.5811" y="17.5" width="18" height="12" rx="2" stroke="#29354C" strokeWidth="2"/>
                                    <line x1="13.1358" y1="20.6679" x2="22.1358" y2="26.6679" stroke="#29354C" strokeWidth="2"/>
                                    <line x1="21.0264" y1="26.6679" x2="30.0264" y2="20.6679" stroke="#29354C" strokeWidth="2"/>
                                    <rect x="16.0811" y="11" width="11" height="11" rx="1.5" fill="white" stroke="#29354C"/>
                                    <line x1="18.5811" y1="13" x2="24.5811" y2="13" stroke="#29354C"/>
                                    <line x1="18.5811" y1="16" x2="24.5811" y2="16" stroke="#29354C"/>
                                    <line x1="18.5811" y1="19" x2="24.5811" y2="19" stroke="#29354C"/>
                                </svg>
                            </div>
                            <div className={styles.Main}>
                                <div className={styles.MainTitle}>{t("EMAIL")}</div>
                                <div className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                            </div>
                            <div className={styles.Arrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z" fill="#9D9D9D"/>
                                </svg>
                            </div>
                        </div>
                        <NavLink to={"/support/chat"}>
                            <div className={styles.ChatUs}>
                                <div className={styles.Icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M22.0811 2C33.1267 2 42.0811 10.9544 42.0811 22.0001C42.0811 33.0457 33.1267 42 22.0811 42C11.0354 42 2.08105 33.0457 2.08105 22.0001C2.08105 10.9544 11.0354 2 22.0811 2Z" fill="white" stroke="#29354C" strokeWidth="3.5"/>
                                        <path d="M18.0458 27.5903L18.4522 27.3L18.3732 27.1894C18.5104 26.8807 18.4853 26.5095 18.2747 26.2146C18.2747 26.2146 18.2746 26.2145 18.2746 26.2145L17.8788 26.4973L17.596 26.1014L17.3844 25.8052C17.2149 25.8201 17.0471 25.8791 16.8986 25.9852L18.0458 27.5903ZM18.0458 27.5903C18.0457 27.5904 18.0456 27.5905 18.0454 27.5906L18.0453 27.5907L17.6385 27.8813L17.6385 27.8813L15.4731 29.4279L15.2511 29.5865L14.5054 30.1192L14.4876 29.7518C14.398 29.7342 14.31 29.704 14.2264 29.661L14.2263 29.6609C14.1789 29.6365 14.134 29.6085 14.0919 29.5774L13.6913 29.9667V28.7837V28.5724V25.7786H12.3836H11.8836H11.3836V25.727C11.112 25.6704 10.8514 25.5679 10.6143 25.4229L10.5774 25.4616L10.2159 25.1172C10.2157 25.1171 10.2155 25.1169 10.2154 25.1168L10.2153 25.1167L9.85329 24.7719L9.89062 24.7327C9.73274 24.4988 9.61881 24.2376 9.55608 23.9615H9.5V23.4615V22.9615V13.317V12.817V12.317H9.55608C9.6188 12.041 9.73273 11.7798 9.8906 11.5459L9.85328 11.5067L10.2152 11.1619C10.2153 11.1619 10.2153 11.1619 10.2153 11.1618L10.5774 10.817L10.6142 10.8557C10.8514 10.7107 11.112 10.6082 11.3836 10.5515V10.5H11.8836H12.3836H27.6164H28.1164H28.6164V10.5515C28.888 10.6081 29.1486 10.7107 29.3858 10.8557L29.4226 10.817L29.7846 11.1618C29.7846 11.1618 29.7846 11.1618 29.7847 11.1618L18.0458 27.5903ZM29.1487 29.1254V29.1937H28.6487H28.3379V30.3018V30.5135V31.6943L27.9379 31.3067C27.8959 31.3378 27.8511 31.3657 27.8037 31.3902C27.7564 31.4146 27.7076 31.4349 27.6579 31.4512L27.7412 31.9962L26.7839 31.3204L29.1487 29.1254ZM29.1487 29.1254C29.7692 28.9517 30.2581 28.4629 30.4317 27.8424H30.5V27.3424V26.8424V23.2298V22.7298V22.2298H30.4317C30.2581 21.6092 29.7692 21.1203 29.1487 20.9467V20.8784H28.6487H28.1487H22.2297H21.7297H21.2297V20.9467C20.6092 21.1203 20.1203 21.6092 19.9467 22.2298H19.8784V22.7298V23.2298V26.8424V27.3424V27.8424H19.9467C20.1203 28.4629 20.6092 28.9517 21.2297 29.1254V29.1937H21.7297H22.2297M29.1487 29.1254L22.2297 29.1937M22.2297 29.1937H23.7712L26.7797 31.3175C26.7802 31.3178 26.7806 31.3181 26.781 31.3184L22.2297 29.1937ZM26.3649 28.3898L26.1464 28.178L26.1923 28.4788L25.0347 27.6556L25.0348 27.6556L24.6799 27.4033L24.6798 27.4032C24.6796 27.4031 24.6793 27.4029 24.6791 27.4027L24.6752 27.3999L24.708 27.2207H24.4231L24.212 27.0706L24.1338 27.2207H24.1081H23.6914H22.2297H21.8514V26.8424V23.2298V22.8513H22.2297H28.1487H28.527V23.2298V26.8424V27.2207H28.1487H27.8514H27.3514H26.8514V27.3566C26.7069 27.4418 26.5859 27.5627 26.5008 27.7072H26.3649L26.3649 28.2072V28.3898ZM11.8836 23.8056C11.7597 23.8056 11.6499 23.7583 11.5761 23.688L11.8836 23.8056Z" fill="#29354C" stroke="#29354C"/>
                                    </svg>
                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("Chat")}</div>
                                    <div className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z" fill="#9D9D9D"/>
                                    </svg>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.Control}>
                    <div className={styles.ControlTitle}>{t("quality_control")}</div>
                    <div className={styles.ControlMain}>
                        <div className={styles.ControlMainLike}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                <g filter="url(#filter0_d_558_19277)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 0C10.0442 0 4 6.04416 4 13.5C4 20.9558 10.0442 27 17.5 27C24.9558 27 31 20.9558 31 13.5C31 6.04416 24.9558 0 17.5 0ZM26.1094 18.3733C25.6155 19.427 24.5568 20.1 23.3931 20.1H19.15H14.65C12.9932 20.1 11.65 18.7569 11.65 17.1L11.65 11.9178C11.65 11.1968 11.9097 10.4999 12.3815 9.95472L17.2154 4.36895C17.8959 3.58253 19.05 3.4136 19.9274 3.97194C20.9059 4.59462 21.1932 5.89325 20.5688 6.87063L20.4776 7.01335C19.5138 8.52198 20.5973 10.5 22.3875 10.5H25.0806C27.2776 10.5 28.7295 12.7839 27.7969 14.7733L26.1094 18.3733ZM10.6 18C10.6 18.9941 9.79409 19.8 8.79998 19.8C7.80586 19.8 6.99998 18.9941 6.99998 18L6.99998 12C6.99998 11.0059 7.80586 10.2 8.79998 10.2C9.79409 10.2 10.6 11.0059 10.6 12L10.6 18Z" fill="#2BAB72"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_558_19277" x="0" y="0" width="35" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="4"/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_558_19277"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_558_19277" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className={styles.ControlMainDislike}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5 27C20.9558 27 27 20.9558 27 13.5C27 6.04416 20.9558 0 13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27ZM4.89056 8.6267C5.38448 7.573 6.44322 6.9 7.60694 6.9H11.85H16.35C18.0068 6.9 19.35 8.24315 19.35 9.9V15.0822C19.35 15.8032 19.0903 16.5001 18.6185 17.0453L13.7846 22.6311C13.1041 23.4175 11.95 23.5864 11.0726 23.0281C10.0941 22.4054 9.80675 21.1067 10.4312 20.1294L10.5224 19.9867C11.4862 18.478 10.4027 16.5 8.61245 16.5H5.91944C3.72236 16.5 2.27054 14.2161 3.20306 12.2267L4.89056 8.6267ZM20.4 9C20.4 8.00589 21.2059 7.2 22.2 7.2C23.1941 7.2 24 8.00589 24 9V15C24 15.9941 23.1941 16.8 22.2 16.8C21.2059 16.8 20.4 15.9941 20.4 15V9Z" fill="#E7E7E7"/>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.ControlFooter}>{t("thank_you_for_rating")}</div>
                </div>
            </div>
        )
    }
    return (
        <div className="wrapper h-inherit w-full">
            <PageHead
                subtitle={t("support.subtitle")}
                title={t("support.title")}/>
            <div style={{
                marginBottom: "40px",
                minHeight: "640px"
            }} className="substrate flex flex-col w-full">
                <div className="row flex flex-wrap gap-8">
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 flex flex-wrap gap-2">
                            <img src="/img/icon/Email.svg" alt="mail"/>
                            <p className="text-gray-400 font-semibold">Email</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold" target="_blank"
                               href="mailto:Support@gekkoin.com">Support@gekkoin.com</a>
                        </div>
                    </div>
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 gap-2 flex flex-wrap">
                            <img src="/img/icon/Telegram.svg" alt="mail"/>
                            <p className="text-gray-400 font-semibold">Telegram</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold"
                               href="https://t.me/gekkoin_com">https://t.me/gekkoin_com</a>
                        </div>
                    </div>
                </div>
                <div className="row mt-6">
                    <div className="col">
                        <p className="text-gray-400 text-sm font-medium">{t("support.response_time")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support
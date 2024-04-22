import React, { useContext } from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import { useTranslation } from 'react-i18next';
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';
import styles from "./style.module.scss"
import { NavLink } from 'react-router-dom';


const Support = () => {
    const { t } = useTranslation();
    const { md } = useContext(BreakpointsContext);

    if (md) {
        return (
            <div className={styles.Support}>
                <div className={styles.Choice}>
                    <div className={styles.Assets}>
                        <NavLink to={"/faq"}>
                            <div className={styles.FAQ}>
                                <div className={styles.Icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
                                        <path d="M20.0811 0C16.1254 0 12.2586 1.17298 8.96966 3.37061C5.68067 5.56824 3.11722 8.69181 1.60347 12.3463C0.0897205 16.0009 -0.306346 20.0222 0.465358 23.9018C1.23706 27.7814 3.14188 31.3451 5.93893 34.1421C8.73598 36.9392 12.2996 38.844 16.1793 39.6157C20.0589 40.3874 24.0802 39.9913 27.7347 38.4776C31.3892 36.9638 34.5128 34.4004 36.7104 31.1114C38.9081 27.8224 40.0811 23.9556 40.0811 20C40.0748 14.6976 37.9657 9.61415 34.2163 5.86477C30.4669 2.1154 25.3835 0.0062554 20.0811 0ZM20.0811 36.3636C16.8446 36.3636 13.6809 35.4039 10.9899 33.6059C8.29893 31.8078 6.20156 29.2522 4.96303 26.2621C3.72451 23.272 3.40045 19.9818 4.03185 16.8076C4.66324 13.6334 6.22173 10.7177 8.51022 8.42916C10.7987 6.14067 13.7144 4.58218 16.8887 3.95079C20.0629 3.31939 23.3531 3.64345 26.3432 4.88197C29.3332 6.1205 31.8889 8.21786 33.6869 10.9088C35.485 13.5998 36.4447 16.7636 36.4447 20C36.4394 24.3383 34.7137 28.4974 31.6461 31.565C28.5784 34.6326 24.4193 36.3583 20.0811 36.3636ZM21.5 28.5L22 30L21.5 31.5L20.0811 32L18.5 31.5L18 30L18.5 28.5L20 28L21.5 28.5ZM27.3538 15.4545C27.3558 16.545 27.1115 17.6218 26.6393 18.6046C26.1671 19.5875 25.479 20.451 24.6265 21.1309C23.2494 22.1981 22.3182 23.7391 22.0138 25.4545H18.3192C18.48 24.0528 18.9198 22.6974 19.6127 21.4683C20.3057 20.2392 21.2377 19.1613 22.3538 18.2982C22.8017 17.9397 23.1584 17.4803 23.3948 16.9576C23.6313 16.4349 23.7406 15.8636 23.714 15.2905C23.6874 14.7175 23.5256 14.1588 23.2418 13.6602C22.958 13.1616 22.5602 12.7373 22.0811 12.4218C21.547 12.0727 20.9325 11.8661 20.296 11.8215C19.6595 11.777 19.0222 11.896 18.4447 12.1673C17.8287 12.4625 17.3117 12.9304 16.9567 13.514C16.6016 14.0976 16.4237 14.7718 16.4447 15.4545C16.4447 15.9368 16.2531 16.3992 15.9122 16.7402C15.5712 17.0812 15.1087 17.2727 14.6265 17.2727C14.1443 17.2727 13.6818 17.0812 13.3409 16.7402C12.9999 16.3992 12.8083 15.9368 12.8083 15.4545C12.7813 14.0572 13.1668 12.6828 13.9168 11.5034C14.6667 10.324 15.7478 9.39187 17.0247 8.82364C18.1566 8.31778 19.3977 8.10508 20.6334 8.20518C21.8692 8.30527 23.0599 8.71493 24.0956 9.39636C25.0964 10.0589 25.9177 10.9588 26.4862 12.0159C27.0547 13.073 27.3528 14.2543 27.3538 15.4545Z" fill="#29354C" />
                                    </svg>
                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("FAQ")}</div>
                                    <div className={styles.MainDescription}>{t("to_find_answers_to_common_questions_open_the_faq")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z" fill="#9D9D9D" />
                                    </svg>
                                </div>
                            </div>
                        </NavLink>
                        <div className={styles.Email}>
                            <div className={styles.Icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <circle cx="21.0811" cy="21" r="19" stroke="#29354C" stroke-width="3" />
                                    <rect x="12.5811" y="17.5" width="18" height="12" rx="2" stroke="#29354C" stroke-width="2" />
                                    <line x1="13.1358" y1="20.6679" x2="22.1358" y2="26.6679" stroke="#29354C" stroke-width="2" />
                                    <line x1="21.0264" y1="26.6679" x2="30.0264" y2="20.6679" stroke="#29354C" stroke-width="2" />
                                    <rect x="16.0811" y="11" width="11" height="11" rx="1.5" fill="white" stroke="#29354C" />
                                    <line x1="18.5811" y1="13" x2="24.5811" y2="13" stroke="#29354C" />
                                    <line x1="18.5811" y1="16" x2="24.5811" y2="16" stroke="#29354C" />
                                    <line x1="18.5811" y1="19" x2="24.5811" y2="19" stroke="#29354C" />
                                </svg>
                            </div>
                            <div className={styles.Main}>
                                <div className={styles.MainTitle}>{t("EMAIL")}</div>
                                <div className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                            </div>
                            <div className={styles.Arrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z" fill="#9D9D9D" />
                                </svg>
                            </div>
                        </div>
                        <NavLink to={"/support/chat"}>
                            <div className={styles.ChatUs}>
                                <div className={styles.Icon}>
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0811 2C33.1267 2 42.0811 10.9544 42.0811 22.0001C42.0811 33.0457 33.1267 42 22.0811 42C11.0354 42 2.08105 33.0457 2.08105 22.0001C2.08105 10.9544 11.0354 2 22.0811 2Z" fill="white" stroke="#29354C" stroke-width="3.5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 13C11.8954 13 11 13.8954 11 15V27C11 28.1046 11.8954 29 13 29H15V30.5284C15 32.1551 16.8387 33.1014 18.1625 32.1559L20.8719 30.2206C21.546 29.7391 21.7021 28.8023 21.2206 28.1281C20.7391 27.454 19.8023 27.2979 19.1281 27.7794L18 28.5852V28C18 26.8954 17.1046 26 16 26H14V16H30V20C30 20.8284 30.6716 21.5 31.5 21.5C32.3284 21.5 33 20.8284 33 20V15C33 13.8954 32.1046 13 31 13H13ZM24 23C22.8954 23 22 23.8954 22 25V29.9681C22 31.0727 22.8954 31.9681 24 31.9681H25.7483L27.7796 33.7278C29.1749 34.9364 31.3072 33.7706 31.0737 31.9668C32.1441 31.928 33 31.048 33 29.9681V25C33 23.8954 32.1046 23 31 23H24ZM25 28.9681V26H30V28.9681H29.8968C29.113 28.9681 28.4481 29.4145 28.1184 30.0522L27.4307 29.4564C27.0671 29.1415 26.6022 28.9681 26.1212 28.9681H25Z" fill="#29354C" />
                                    </svg>

                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("chat")}</div>
                                    <div className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z" fill="#9D9D9D" />
                                    </svg>
                                </div>
                            </div>
                        </NavLink>
                        <div className="w-25 flex">
                            <img src="/img/icon/Telegram.svg" alt="mail" />
                            <a className="ml-2 text-gray-400 font-semibold whitespace-nowrap"
                                href="https://t.me/gek_support"> Telegram (crypto wallet)</a>
                        </div>

                        
                        <div  onClick={() => {
                            document.getElementById("chat").classList.toggle("isOpen")
                        }}  className={styles.ChatUs}>
                            <div className={styles.Icon}>
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M22.0811 2C33.1267 2 42.0811 10.9544 42.0811 22.0001C42.0811 33.0457 33.1267 42 22.0811 42C11.0354 42 2.08105 33.0457 2.08105 22.0001C2.08105 10.9544 11.0354 2 22.0811 2Z"
                                          fill="white" stroke="#29354C" stroke-width="3.5"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M13 13C11.8954 13 11 13.8954 11 15V27C11 28.1046 11.8954 29 13 29H15V30.5284C15 32.1551 16.8387 33.1014 18.1625 32.1559L20.8719 30.2206C21.546 29.7391 21.7021 28.8023 21.2206 28.1281C20.7391 27.454 19.8023 27.2979 19.1281 27.7794L18 28.5852V28C18 26.8954 17.1046 26 16 26H14V16H30V20C30 20.8284 30.6716 21.5 31.5 21.5C32.3284 21.5 33 20.8284 33 20V15C33 13.8954 32.1046 13 31 13H13ZM24 23C22.8954 23 22 23.8954 22 25V29.9681C22 31.0727 22.8954 31.9681 24 31.9681H25.7483L27.7796 33.7278C29.1749 34.9364 31.3072 33.7706 31.0737 31.9668C32.1441 31.928 33 31.048 33 29.9681V25C33 23.8954 32.1046 23 31 23H24ZM25 28.9681V26H30V28.9681H29.8968C29.113 28.9681 28.4481 29.4145 28.1184 30.0522L27.4307 29.4564C27.0671 29.1415 26.6022 28.9681 26.1212 28.9681H25Z"
                                          fill="#29354C"/>
                                </svg>
                            </div>
                            <div className={styles.Main}>
                                <div className={styles.MainTitle}>{t("Chat")}</div>
                                <div
                                    className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                            </div>
                            <div className={styles.Arrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12"
                                     fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M0.418945 1.37143L1.73145 0L7.41895 6L1.73145 12L0.418945 10.6286L4.79395 6L0.418945 1.37143Z"
                                          fill="#9D9D9D"/>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.Control}>
                    <div className={styles.ControlTitle}>{t("quality_control")}</div>
                    <div className={styles.ControlMain}>
                        <div className={styles.ControlMainLike}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                <g filter="url(#filter0_d_558_19277)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 0C10.0442 0 4 6.04416 4 13.5C4 20.9558 10.0442 27 17.5 27C24.9558 27 31 20.9558 31 13.5C31 6.04416 24.9558 0 17.5 0ZM26.1094 18.3733C25.6155 19.427 24.5568 20.1 23.3931 20.1H19.15H14.65C12.9932 20.1 11.65 18.7569 11.65 17.1L11.65 11.9178C11.65 11.1968 11.9097 10.4999 12.3815 9.95472L17.2154 4.36895C17.8959 3.58253 19.05 3.4136 19.9274 3.97194C20.9059 4.59462 21.1932 5.89325 20.5688 6.87063L20.4776 7.01335C19.5138 8.52198 20.5973 10.5 22.3875 10.5H25.0806C27.2776 10.5 28.7295 12.7839 27.7969 14.7733L26.1094 18.3733ZM10.6 18C10.6 18.9941 9.79409 19.8 8.79998 19.8C7.80586 19.8 6.99998 18.9941 6.99998 18L6.99998 12C6.99998 11.0059 7.80586 10.2 8.79998 10.2C9.79409 10.2 10.6 11.0059 10.6 12L10.6 18Z" fill="#2BAB72" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_558_19277" x="0" y="0" width="35" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_558_19277" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_558_19277" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className={styles.ControlMainDislike}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5 27C20.9558 27 27 20.9558 27 13.5C27 6.04416 20.9558 0 13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27ZM4.89056 8.6267C5.38448 7.573 6.44322 6.9 7.60694 6.9H11.85H16.35C18.0068 6.9 19.35 8.24315 19.35 9.9V15.0822C19.35 15.8032 19.0903 16.5001 18.6185 17.0453L13.7846 22.6311C13.1041 23.4175 11.95 23.5864 11.0726 23.0281C10.0941 22.4054 9.80675 21.1067 10.4312 20.1294L10.5224 19.9867C11.4862 18.478 10.4027 16.5 8.61245 16.5H5.91944C3.72236 16.5 2.27054 14.2161 3.20306 12.2267L4.89056 8.6267ZM20.4 9C20.4 8.00589 21.2059 7.2 22.2 7.2C23.1941 7.2 24 8.00589 24 9V15C24 15.9941 23.1941 16.8 22.2 16.8C21.2059 16.8 20.4 15.9941 20.4 15V9Z" fill="#E7E7E7" />
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
                title={t("support.title")} />
            <div style={{
                marginBottom: "40px",
                minHeight: "640px"
            }} className="substrate flex flex-col w-full">
                <div className="row flex flex-wrap gap-8">
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 flex flex-wrap gap-2">
                            <img src="/img/icon/Email.svg" alt="mail" />
                            <p className="text-gray-400 font-semibold">Email</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold" target="_blank"
                                href="mailto:support@gekkard.com">support@gekkard.com</a>
                        </div>
                    </div>
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 gap-2 flex flex-wrap">
                            <img src="/img/icon/Telegram.svg" alt="mail" />
                            <p className="text-gray-400 font-semibold">Telegram (crypto wallet)</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold"
                                href="https://t.me/gek_support">https://t.me/gek_support</a>
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
import { useContext } from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import { useTranslation } from 'react-i18next';
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';
import styles from "./style.module.scss"
import { NavLink } from 'react-router-dom';
import { IconApp } from '@/shared/ui/icons/icon-app';

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
                                    <IconApp code='t08' size={12} color='#9D9D9D' />
                                </div>
                            </div>
                        </NavLink>
                        <div className={styles.Email}>
                            <div className={styles.Icon}>
                                <div className={styles.IconWrap}>
                                    <IconApp code='t29' color='#29354C' size={20} />
                                </div>
                            </div>
                            <div className={styles.Main}>
                                <div className={styles.MainTitle}>{t("EMAIL")}</div>
                                <div className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                            </div>
                            <div className={styles.Arrow}>
                                <IconApp code='t08' size={12} color='#9D9D9D' />
                            </div>
                        </div>
                        <div  onClick={() => {
                            document.getElementById("chat").classList.toggle("isOpen")
                        }}  className={styles.ChatUs}>
                            <div className={styles.Icon}>
                                <div className={styles.IconWrap}>
                                    <IconApp code='t25' color='#29354C' size={20} />
                                </div>
                            </div>
                            <div className={styles.Main}>
                                <div className={styles.MainTitle}>{t("Chat")}</div>
                                <div
                                    className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                            </div>
                            <div className={styles.Arrow}>
                                <IconApp code='t08' size={12} color='#9D9D9D' />
                            </div>
                        </div>

                        <div className="w-25 flex">
                            <IconApp code='t51' size={22} color='#00b894' />
                            <a className="ml-2 text-gray-400 font-semibold whitespace-nowrap"
                                href="https://t.me/gek_support"> Telegram (crypto wallet)</a>
                        </div>
                    </div>
                </div>
                <div className={styles.Control}>
                    <div className={styles.ControlTitle}>{t("quality_control")}</div>
                    <div className={styles.ControlMain}>
                        <div className={styles.ControlMainLike}>
                            <IconApp code='t49' size={30} color='#2BAB72' />
                        </div>
                        <div className={styles.ControlMainDislike}>
                            <IconApp code='t08' size={12} color='#9D9D9D' />
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
                <div  onClick={() => {
                    document.getElementById("chat").classList.toggle("isOpen")
                }}  className={styles.ChatUs}>
                    <div className={styles.IconWrap}>
                        <IconApp code='t25' size={25} color='#29354C' />
                    </div>
                    <div className={styles.Main}>
                        <div className={styles.MainTitle}>{t("Chat")}</div>
                        <div
                            className={styles.MainDescription}>{t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}</div>
                    </div>
                    <div className={styles.Arrow}>
                        <IconApp code='t08' size={12} color='#9D9D9D' />
                    </div>
                </div>
                
                <div className="row flex flex-wrap gap-8">
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 flex flex-wrap gap-2">
                            <IconApp code='t29' size={22} color='#00b894' />
                            <p className="text-gray-400 font-semibold">Email</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold" target="_blank"
                                href="mailto:support@gekkard.com">support@gekkard.com</a>
                        </div>
                    </div>
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 gap-2 flex flex-wrap">
                            <IconApp code='t51' size={22} color='#00b894' />
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
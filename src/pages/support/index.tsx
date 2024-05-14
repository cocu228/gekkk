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
                        <NavLink className="w-full" to={"/faq"}>
                            <div className={styles.FAQ}>
                                <div className={styles.Icon}>
                                    <IconApp code='t50' size={30} color='#285E69' />
                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("FAQ")}</div>
                                    <div className={styles.MainDescription}>{t("answers_to_common_questions")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <IconApp code='t08' size={12} color='#285E69' />
                                </div>
                            </div>
                        </NavLink>
                        <div className='w-full'>
                            <div className={styles.Email}>
                                <div className={styles.Icon}>
                                    <IconApp code='t29' color='#285E69' size={30} />
                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("EMAIL")}</div>
                                    <div className={styles.MainDescription}>{t("write_email_to_support")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <IconApp code='t08' size={12} color='#285E69' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div  onClick={() => {
                                document.getElementById("chat").classList.toggle("isOpen")
                            }}  className={styles.ChatUs}>
                                <div className={styles.Icon}>
                                    <IconApp code='t25' color='#285E69' size={30} />
                                </div>
                                <div className={styles.Main}>
                                    <div className={styles.MainTitle}>{t("chat_us")}</div>
                                    <div
                                        className={styles.MainDescription}>{t("how_can_we_help")}</div>
                                </div>
                                <div className={styles.Arrow}>
                                    <IconApp code='t08' size={12} color='#285E69' />
                                </div>
                            </div>
                        </div>
                        
                        <div className='w-full'>
                            <a href="https://t.me/gek_support">
                                <div className={styles.Email}>
                                    <div className={styles.Icon}>
                                        <IconApp code='t51' color='#285E69' size={30} />
                                    </div>
                                    <div className={styles.Main}>
                                        <div className={styles.MainTitle}>Telegram ({t("crypto_wallet").toLowerCase()})</div>
                                        <div className={styles.MainDescription}>{t("contact_crypto")}</div>
                                    </div>
                                    <div className={styles.Arrow}>
                                        <IconApp code='t08' size={12} color='#285E69' />
                                    </div>
                                </div>
                            </a>
                        </div>

                            
                        <div className='w-full flex justify-end'>
                            <span className={styles.ResponseTime}>
                                *{t("response_time_up_to", {hours: 24})}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.Control}>
                    <div className={styles.ControlTitle}>{t("quality_control")}</div>
                    <div className={styles.ControlMain}>
                        <IconApp code='t49' className={styles.ControlMainLike} size={30} color='#9D9D9D' />
                        <IconApp code='t49' className={styles.ControlMainDislike} size={30} color='#9D9D9D' />
                    </div>
                    <div className={styles.ControlFooter}>{t("thank_you_for_rating")}!</div>
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
                
                <div className="row flex flex-wrap justify-evenly gap-8 xl:flex-col">
                    <div  onClick={() => {
                        document.getElementById("chat").classList.toggle("isOpen")
                    }}  className="col w-25 flex flex-col xl:max-w-full max-w-[33%]">
                        <div className='row mb-3 flex flex-wrap gap-2'>
                            <IconApp code='t25' size={22} color='#00b894' />
                            <p className="text-gray-400 font-semibold">{t("chat_us")}</p>
                        </div>
                        <p
                            className="text-lg font-bold cursor-pointer"
                        >
                            {t("to_get_advice_from_our_bank_s_support_service_open_the_chat")}
                        </p>
                    </div>
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
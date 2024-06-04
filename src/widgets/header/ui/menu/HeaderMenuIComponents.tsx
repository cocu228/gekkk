import {t} from "i18next";
import {useContext, useState} from "react";
import {HelperClassName} from "@/shared/lib/helper-class-name";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import useModal from "@/shared/model/hooks/useModal";
import PromoCode from "@/features/promo-code/ui/PromoCode";
import Button from "@/shared/ui/button/Button";
import {$axios} from "@/shared/lib/(orval)axios";
import Loader from "@/shared/ui/loader";
import {actionResSuccess, getCookieData, getFormattedIBAN, uncoverResponse} from "@/shared/lib/helpers";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {Modal} from "@/shared/ui/modal/Modal";
import {IS_GEKKOIN_APP, IS_GEKKWALLET_APP} from "@/shared/lib";

const hClassName = new HelperClassName(styles)

export const ItemAccount = ({active = false, number, name}: Partial<{
    active: boolean;
    number: string;
    name: string;
}>) => {
    if (!number) return null;

    return (
        <div className={styles.AccountItem}>
            <div className={styles.AccountItemText}>
                <div className={styles.Icon}>
                    <IconApp code="t24" color={active ? "var(--gek-dark-blue)" : "var(--gek-additional)"} size={30}/>
                </div>
                <div className={styles.AccountInfo}>
                    <span className={styles.AccountName}>{name}</span>
                    <span className={styles.AccountNumber}>{getFormattedIBAN(number)}</span>
                </div>
            </div>
            {active && (
                <div className={styles.CurrentIcon}>
                    <IconApp code="t47" color="var(--gek-green)" size={15}/>
                </div>
            )}
        </div>
    )
}

export const ItemOrganization = ({active = false, name, number}: Partial<{
    active: boolean;
    name: string;
    number: string;
}>) => {
    const {md} = useContext(BreakpointsContext);

    if (md) {
        return (
            <div className={styles.AccountItem}>
                <div className={`${styles.Icon} ${styles.OrganizationIcon}`}>
                    <IconApp code="t48" color={active ? "var(--gek-dark-blue)" : "var(--gek-additional)"} size={30}/>
                </div>
                <div className={styles.AccountInfo}>
                    <span>{name}</span>
                    <span>{getFormattedIBAN(number)}</span>
                </div>
            </div>
        )
    } else {
        return <div className="flex items-center justify-end relative">
            {active && <IconApp code="t47" className="absolute m-auto left-[-18px]" size={70} color="#00AEEF    "/>}
            <div className="wrapper mr-2">
                <SvgSchema active={active} className={hClassName.scss("SvgSchema")} width={32} height={22}/>
            </div>
            <div className="wrapper">
                <div className="row">
                <span
                    className={`text-sm font-bold ${active ? "text-blue-400" : ""}`}>{name}</span>
                </div>
                <div className="row text-start">
                <span
                    className={`text-xs text-start ${active ? "text-blue-400" : ""} font-bold`}>ID: {getFormattedIBAN(number)}</span>
                </div>
            </div>
        </div>
    }
}

export const PromoCodeModal = ({active = false}) => {
    const {showModal, handleCancel, isModalOpen} = useModal()

    return <>
        <button className="w-full text-left" onClick={showModal}>
            {t("header_menu.promo_code")}
        </button>
        <Modal title={t("header_menu.activate_promo_code")} onCancel={handleCancel} isModalOpen={isModalOpen}>
            <PromoCode handleCancel={handleCancel}/>
        </Modal>
    </>
}

export const EnableNotifications = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {showModal, handleCancel, isModalOpen} = useModal();

    const onClick = () => {
        showModal();
        setLoading(true);

        Notification?.requestPermission().then((result) => {
            if (result === "granted") {
                window.location.reload();
            } else if (result === "denied") {
                setLoading(false);
            } else {
                handleCancel();
                setLoading(false);
            }
        });
    }

    return (
        <>
            <button onClick={onClick} className="w-full text-left">
                {t("header_menu.enable_notifications")}
            </button>
            <Modal
                noBorder
                title="&nbsp;"
                closable={false}
                isModalOpen={isModalOpen}
                onCancel={handleCancel}
            >
                <div className="row mb-20">
                    <div className="col">
                        <p className="font-bold text-sm leading-6 text-center">
                            {loading
                                ? t("notifications_modal")
                                : t("notifications_denied_modal")
                            }
                        </p>
                    </div>
                </div>
                <div className="row relative">
                    <div className="flex justify-center col">
                        {loading ? <Loader className={"w-[50px] h-[50px]"}/> :
                            <Button
                                size="lg"
                                onClick={handleCancel}
                                className="w-full"
                            >{t("close")}</Button>}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export const GekkoinInvestPlatform = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {showModal, handleCancel, isModalOpen} = useModal();

    const onClick = async () => {
        setLoading(true)

        const {phone, token, tokenHeaderName} = getCookieData<{
            phone: string,
            token: string,
            tokenHeaderName: string
        }>()

        const response = await $axios.post('/gek/v1/auth', {
            authorization: phone,
            token: token,
            tokenHeaderName: tokenHeaderName
        })
        const gekkoinUrl = import.meta.env.VITE_GEKKOIN_URL;
        actionResSuccess(response).success(() => {
            window.open(`${gekkoinUrl ?? 'https://dev.gekkoin.com'}?sessionId=${uncoverResponse(response)}`, "_blank")
        })
        setLoading(false)
    }

    const isKoinAndWallet = IS_GEKKOIN_APP() || IS_GEKKWALLET_APP()
    const buttonTitle = t(isKoinAndWallet ? "header_menu.gekkard_invest_platform" : "header_menu.gekkoin_invest_platform")
    const redirectedTitle = t(isKoinAndWallet ? 'gekkard_redirect' : 'gekkoin_redirect')
    const directedTitle = t(isKoinAndWallet ? 'directed_to_gekkard' : 'directed_to_gekkoin')

    return (
        <>
            <button className="w-full text-left" onClick={showModal}>
                {buttonTitle}
            </button>
            <Modal
                isModalOpen={isModalOpen}
                onCancel={handleCancel}
                title={redirectedTitle}
            >
                <div className="row mt-4 mb-6">
                    <div className="col">
                        <p className="font-bold text-sm leading-6 text-center">{directedTitle}</p>
                    </div>
                </div>
                <div className="row relative">
                    <div className="flex justify-center col">
                        {loading ? <Loader className={"w-[24px] h-[24px]"}/> :
                            <Button
                                size="md"
                                onClick={onClick}
                                className="w-full"
                            >
                                {t("confirm")}
                            </Button>
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}

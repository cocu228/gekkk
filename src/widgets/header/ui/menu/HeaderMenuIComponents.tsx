import {t} from "i18next";
import {useContext, useState} from "react";
import {HelperClassName} from "@/shared/lib/helper-class-name";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import PromoCode from "@/features/promo-code/ui/PromoCode";
import Button from "@/shared/ui/button/Button";
import {$axios} from "@/shared/lib/(orval)axios";
import Loader from "@/shared/ui/loader";
import {actionResSuccess, getCookieData, getFormattedIBAN, setCookieData, uncoverResponse} from "@/shared/lib/helpers";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import OrganizationMobileIcon from "@public/img/icon/OrganizationMobileIcon.svg"
import {Switch} from "antd";
import { IconApp } from "@/shared/ui/icons/icon-app";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

const hClassName = new HelperClassName(styles)
export const ItemAccount = ({active = false, number, name}: Partial<{
    active: boolean;
    number: string;
    name: string;
}>) => {
    const {md} = useContext(BreakpointsContext);


    if (!number) return null;
        return(
            <div className={styles.AccountItem}>
                <div className={styles.Icon}>
                    <IconApp code="t24" color="#285E69" size={37} />
                </div>
                <div className={styles.AccountInfo}>
                    <span className={styles.AccountName}>{name}</span>
                    <span className={styles.AccountNumber}>{getFormattedIBAN(number)}</span>
                </div>
            </div>
        )
}

export const ItemOrganization = ({active = false, name, number}: Partial<{
    active: boolean;
    name: string;
    number: string;
}>) => {
    const {md} = useContext(BreakpointsContext);

    if(md){
        return(
            <div className={styles.AccountItem}>
                <div className={styles.Icon +" "+ styles.OrganizationIcon}>
                    <img src={OrganizationMobileIcon}/>
                </div>
                <div className={styles.AccountInfo}>
                    <span>{name}</span>
                    <span>{getFormattedIBAN(number)}</span>
                </div>
            </div>
        )
    }else{

    
    return <div className="flex items-center justify-end relative">
        {active && <IconApp code="t47" className="absolute m-auto left-[-18px]" size={70} color="#00AEEF    " /> }
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
        <Modal closable={false} title={<ModalTitle handleCancel={handleCancel} title={t("header_menu.activate_promo_code")}/>} onCancel={handleCancel} open={isModalOpen} footer={null} width="454px">
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

        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                window.location.reload();                
            }
            else if (result === "denied") {
                setLoading(false);
            }
            else {
                handleCancel();
                setLoading(false);
            }
        });
    }

    return <>
        <button onClick={onClick} className="w-full text-left">
            {t("header_menu.enable_notifications")}
        </button>

        <Modal
            padding
            closable={false}
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <>
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
                    <div className="col">
                        {loading ? <Loader className={"w-[50px] h-[50px]"}/> :
                            <Button
                                onClick={handleCancel}
                                className="w-full"
                            >{t("close")}</Button>}
                    </div>
                </div>
            </>
        </Modal>
    </>
}

export const GekkoinInvestPlatform = ({active = false}) => {
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

    return <>
        <button className="w-full text-left" onClick={showModal}>
            {t("header_menu.gekkoin_invest_platform")}
        </button>
        <Modal onCancel={handleCancel} open={isModalOpen}>
            <>
                <div className="row mb-10">
                    <div className="col">
                        <p className="font-bold text-sm leading-6 text-center">{t("directed_to_gekkoin")}</p>
                    </div>
                </div>
                <div className="row relative">
                    <div className="col">
                        {loading ? <Loader className={"w-[24px] h-[24px]"}/> :
                            <Button onClick={onClick}
                                    className="w-full">{t("confirm")}</Button>}
                    </div>
                </div>
            </>
        </Modal>
    </>
}
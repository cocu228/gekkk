import React, {useState} from "react";
import {HelperClassName} from "@/shared/lib/helper-class-name";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import PromoCode from "@/features/promo-code/ui/PromoCode";
import Button from "@/shared/ui/button/Button";
import $axios from "@/shared/lib/(cs)axios";
import Loader from "@/shared/ui/loader";
import {actionResSuccess, getCookieData, getFormattedIBAN, uncoverResponse} from "@/shared/lib/helpers";
import {Skeleton} from "antd";
import { t } from "i18next";

const hClassName = new HelperClassName(styles)
export const ItemAccount = ({active = false, number, name}: Partial<{
    active: boolean;
    number: string;
    name: string;
}>) => {
    if (!number) return null;

    return <div className="flex items-center justify-end relative">
        {active && <img className="absolute m-auto left-[-18px]" src="/img/check-true-accent.svg" alt="check"/>}
        <div className="wrapper mr-2">
            <svg   className={`${hClassName.while(active).do("active").scss("SvgSchema")}`} width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M24.034 17.6c1.23.547 2.302 1.218 3.185 1.994a6.237 6.237 0 012.116 4.687v1.927a3.128 3.128 0 01-3.125 3.125H5.793a3.128 3.128 0 01-3.125-3.125v-1.927c0-1.797.771-3.506 2.115-4.687 1.088-.956 3.173-2.374 6.523-3.11a7.7 7.7 0 01-3.013-6.109c0-4.25 3.458-7.708 7.708-7.708s7.709 3.458 7.709 7.708-3.458 7.708-7.709 7.708c-5.724 0-8.79 2.151-9.843 3.076a4.154 4.154 0 00-1.407 3.122v1.927c0 .575.468 1.042 1.042 1.042H26.21c.574 0 1.041-.467 1.041-1.042v-1.927a4.154 4.154 0 00-1.407-3.122c-.725-.637-1.619-1.194-2.656-1.655a1.042 1.042 0 01.846-1.904zM16 4.75a5.631 5.631 0 00-5.625 5.625A5.631 5.631 0 0016.001 16a5.631 5.631 0 005.625-5.625 5.631 5.631 0 00-5.625-5.625z"
                      fill={active ? "var(--color-blue-400)" : "#000000"}/>
            </svg>
        </div>
        <div className="wrapper">
            <div className="row">
                <span
                    className={`text-sm font-bold ${hClassName.while(active).do("text-blue-400").done()}`}>{name}</span>
            </div>
            <div className="row text-start">
                <span
                    className={`text-xs text-start font-bold ${hClassName.while(active)
                        .do("text-blue-400").done()}`}>ID: {getFormattedIBAN(number)}</span>
            </div>
        </div>
    </div>
}

export const ItemOrganization = ({active = false, name, number}: Partial<{
    active: boolean;
    name: string;
    number: string;
}>) => {
    return <div className="flex items-center justify-end relative">
        {active && <img className="absolute m-auto left-[-18px]" src="/img/check-true-accent.svg" alt="check"/>}
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

export const PromoCodeModal = ({active = false}) => {

    const {showModal, handleCancel, isModalOpen} = useModal()

    return <>
        <button className="w-full text-left" onClick={showModal}>
            {t("header_menu.promo_code")}
        </button>
        <Modal onCancel={handleCancel} open={isModalOpen} footer={null} width="454px">
            <PromoCode/>
        </Modal>
    </>
}

export const GekkoinInvestPlatform = ({active = false}) => {

    const {showModal, handleCancel, isModalOpen} = useModal()

    const [loading, setLoading] = useState<boolean>(false)

    const onClick = async () => {
        setLoading(true)

        const {phone, token, tokenHeaderName} = getCookieData<{
            phone: string,
            token: string,
            tokenHeaderName: string
        }>()

        const response = await $axios.post('/pub/v1/auth', {
            authorization: phone,
            token: token,
            tokenHeaderName: tokenHeaderName
        })
        const gekkoinUrl = import.meta.env[`VITE_GEKKOIN_URL_${import.meta.env.MODE}`];
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
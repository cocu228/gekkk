import {MobileWrapper} from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import {Typography} from "@/shared/ui/typography/typography"
import {MobileButton} from "@/shared/ui/mobile-button/mobile-button";
import s from '../../../styles.module.scss'
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ClientDetails} from "@/shared/(orval)api/gek/model";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";

export function PersonalInformation() {
    const {t} = useTranslation();
    const {xl} = useBreakpoints();
    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const {getAccountDetails} = storeAccountDetails();
    const [userInfo, setUserInfo] = useState<ClientDetails>(null);
    
    useEffect(() => {
        (async () => {
            const details = await getAccountDetails();

            setUserInfo(details);
        })();
    }, [account]);
    
    const resetState = () => {
        navigate('/settings')
    };
    
    return (
        <MobileWrapper className="w-full">
            <div 
                className={s.perInfoBody}
            >
                {!userInfo ? <Loader className="relative"/> : <>
                    <div 
                        className={s.perItem}
                    >
                        <h4 className={s.perItemTitle}>{t("name")}:</h4>
                        <h4 className={s.perItemSubtitle}>{userInfo?.name}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={s.perItemTitle}>{t("phone_number")}</h4>
                        <h4 className={s.perItemSubtitle}>{userInfo?.phone}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={s.perItemTitle}>{t("email")}:</h4>
                        <h4 className={s.perItemSubtitle}>{userInfo?.email}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={s.perItemTitle}>{t("citizenship")}:</h4>
                        <h4 className={s.perItemSubtitle}>{userInfo?.citizenship}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={s.perItemTitle}>{t("residence_address")}:</h4>
                        <h4 className={s.perItemSubtitle}>{userInfo?.address}</h4>
                        <hr/>
                    </div>
                </>}
                {xl && 
                <div className={s.downBtnWrap}>
                    <MobileButton onClick={resetState}>{t("back")}</MobileButton>
                </div>}
            </div>
        </MobileWrapper>
    )
}
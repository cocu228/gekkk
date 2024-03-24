import {MobileWrapper} from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import {Typography} from "@/shared/ui/typography/typography"
import {MobileButton} from "@/shared/ui/mobile-button/mobile-button";
import style from '../style/style.module.scss'
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
            <div className="substrate w-full rounded-lg flex flex-col gap-3">
                {!userInfo ? <Loader className="relative"/> : <>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("name")}:</Typography>
                        <Typography variant="h" color="light-green" className="pb-2">{userInfo?.name}</Typography>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("phone_number")}</Typography>
                        <Typography variant="h" color="light-green" className="pb-2">{userInfo?.phone}</Typography>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("email")}:</Typography>
                        <Typography variant="h" color="light-green" className="pb-2">{userInfo?.email}</Typography>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("citizenship")}:</Typography>
                        <Typography variant="h" color="light-green" className="pb-2">{userInfo?.citizenship}</Typography>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("residence_address")}:</Typography>
                        <Typography variant="h" color="light-green" className="pb-2">{userInfo?.address}</Typography>
                        <hr/>
                    </div>
                </>}
                {xl && 
                <div className="flex flex-row gap-3 justify-center min-h-[40px] pt-8">
                    <MobileButton className={style.button} onClick={resetState}>Back</MobileButton>
                </div>}
            </div>
        </MobileWrapper>
    )
}
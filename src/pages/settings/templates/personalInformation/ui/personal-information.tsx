import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import { Typography } from "@/shared/ui/typography/typography"
import { MobileInput } from "@/shared/ui/mobile-input/mobile-input";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import style from '../style/style.module.scss'
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { ChangeEvent, useEffect, useState } from "react";
import { LocalizationMenu } from "@/widgets/header/ui/LocalizationMenu";
import { languageName } from "../model/language";
import { deepCompare } from "../model/deep-compate";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function PersonalInformation() {
    const {md, xl} = useBreakpoints();
    const {details, getAccountDetails} = storeAccountDetails();
    const [userInfo, setUserInfo] = useState<typeof details>(details);
    const {t} = useTranslation()
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log('aaa');
                    
        getAccountDetails();
    }, []);
    useEffect(() => {
        setUserInfo(details);
    }, [details]);

    const changeInfo = ({key, val}: {key: keyof typeof userInfo , val: string}) => {
        setUserInfo({...userInfo, [key]: val})
    };  
    
    
    const resetState = () => {
        navigate('/settings')
    };

    return (
        <MobileWrapper className="w-full">
            <div className="substrate w-full rounded-lg flex flex-col gap-3">
                <div className="w-full flex flex-col min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("name")}:</Typography>
                    <Typography variant="h" color="light-green" className="pb-2">{userInfo?.name}</Typography>
                    <hr/>
                </div>
                <div className="w-full flex flex-col min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={"typography-b2 pb-2"}>{t("phone_number")}:</Typography>
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
                {/* <div className="w-full flex flex-col min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>Language:</Typography>
                    <div className="flex flex-row gap-4">
                        <LocalizationMenu/>
                        <Typography variant="h" color="dark-green" >{languageName()}</Typography>
                    </div>
                </div> */}
                {xl && 
                <div className="flex flex-row gap-3 justify-center min-h-[40px] pt-8">
                    <MobileButton className={style.button} onClick={resetState}>Back</MobileButton>
                </div>}
            </div>
        </MobileWrapper>
    )
}
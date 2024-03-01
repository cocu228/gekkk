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

export function PersonalInformation() {
    const {md} = useBreakpoints();
    const {details, getAccountDetails} = storeAccountDetails();
    const [userInfo, setUserInfo] = useState<typeof details>(details);
    const {t} = useTranslation()
    
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
        setUserInfo(details);
    };

    return (
        <MobileWrapper className="w-full">
            <div className="substrate w-full rounded-lg flex flex-col gap-3">
                <div className="w-full flex flex-row items-center justify-between min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>Name:</Typography>
                    <MobileInput 
                        className=" min-h-[30px]"  
                        placeholder="Input name" 
                        value={userInfo?.name} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => changeInfo({key:"name", val: e.target.value})}
                    />
                </div>
                <div className="w-full flex flex-row items-center justify-between min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>{t("phone_number")}:</Typography>
                    <MobileInput 
                        className=" min-h-[30px]"  
                        placeholder="Input phone number" 
                        value={userInfo?.phone} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => changeInfo({key:"phone", val: e.target.value})}
                    />
                </div>
                <div className="w-full flex flex-row items-center justify-between min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>Email:</Typography>
                    <MobileInput 
                        className=" min-h-[30px]"  
                        placeholder="Input email" 
                        value={userInfo?.email} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => changeInfo({key:"email", val: e.target.value})}
                    />
                </div>
                <div className="w-full flex flex-row items-center justify-between min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>Citizenship:</Typography>
                    <MobileInput 
                        className=" min-h-[30px]"  
                        placeholder="Input citizenship" 
                        value={userInfo?.citizenship} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => changeInfo({key:"citizenship", val: e.target.value})}
                    />
                </div>
                <div className="w-full flex flex-row items-center justify-between min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>Residence adress:</Typography>
                    <MobileInput 
                        className=" min-h-[30px]"  
                        placeholder="Input adress" 
                        value={userInfo?.address} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => changeInfo({key:"name", val: e.target.value})}
                    />
                </div>
                <div className="w-full flex flex-row items-center justify-between min-h-[30px]">
                    <Typography variant="h" color="dark-green" className={md && "w-[66px]"}>Language:</Typography>
                    <div className="flex flex-row gap-4">
                        <LocalizationMenu/>
                        <Typography variant="h" color="dark-green" >{languageName()}</Typography>
                    </div>
                </div>
                <div className="flex flex-row gap-3 justify-center min-h-[40px] pt-8">
                    <MobileButton className={style.button} varitant={deepCompare(details, userInfo) ? "disabeled" : "light"}>Apply</MobileButton>
                    <MobileButton className={style.button} onClick={resetState}>Back</MobileButton>
                </div>
            </div>
        </MobileWrapper>
    )
}
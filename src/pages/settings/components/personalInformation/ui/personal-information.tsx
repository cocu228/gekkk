import {MobileWrapper} from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import styles from '../../../styles.module.scss'
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ClientDetails} from "@/shared/(orval)api/gek/model";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import Button from "@/shared/ui/button/Button";

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
                className={styles.perInfoBody}
            >
                {!userInfo ? <Loader className="relative"/> : <>
                    <div 
                        className={styles.perItem}
                    >
                        <h4 className={styles.perItemTitle}>{t("name")}:</h4>
                        <h4 className={styles.perItemSubtitle}>{userInfo?.name}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={styles.perItemTitle}>{t("phone_number")}:</h4>
                        <h4 className={styles.perItemSubtitle}>{userInfo?.phone}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={styles.perItemTitle}>{t("email")}:</h4>
                        <h4 className={styles.perItemSubtitle}>{userInfo?.email}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={styles.perItemTitle}>{t("citizenship")}:</h4>
                        <h4 className={styles.perItemSubtitle}>{userInfo?.citizenship}</h4>
                        <hr/>
                    </div>
                    <div className="w-full flex flex-col min-h-[30px]">
                        <h4 className={styles.perItemTitle}>{t("residence_address")}:</h4>
                        <h4 className={styles.perItemSubtitle}>{userInfo?.address}</h4>
                        <hr/>
                    </div>
                </>}
                {xl && 
                <div className={styles.downBtnWrap}>
                    <Button
                        color="blue"
                        onClick={resetState}
                    >
                        {t("back")}
                    </Button>
                </div>}
            </div>
        </MobileWrapper>
    )
}
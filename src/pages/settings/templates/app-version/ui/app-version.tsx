import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import { Typography } from "@/shared/ui/typography/typography"
import { MobileInput } from "@/shared/ui/mobile-input/mobile-input";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import s from '../../../styles.module.scss'
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import versions from '@/../versions.json';
import {VersionCard} from "./version-card";
import { useTranslation } from "react-i18next";


export function AppVersion() {
    const {md} = useBreakpoints();
    
    const appVersion = import.meta.env.VITE_APP_VERSION.split("").map((elem:string) => elem.replace('"', '')).join('');

    const {t} = useTranslation()

    console.log(versions);
    

    return (
        <MobileWrapper className="w-full">
            <div className={s.appVersionBlock}>
                <div className={s.versionGroup}>
                    <h4 className={s.versionTitle}>{t("current_app_version")}:</h4>
                    <h4 className={s.versionValue}>{appVersion}</h4>
                </div>
                <div className={s.versionGroup} style={{paddingTop: '2.5rem'}}>
                    <h4 className={s.versionTitle}>{t("current_api_version")}:</h4>
                    <h4 className={s.versionValue}>2.0.3-20231230-1327.5649</h4>
                </div>
            </div>
            <div className="flex flex-col">
                {versions.map((ver) => <VersionCard key={ver.version} date={ver.date} description={ver.description} version={ver.version}/>)}
            </div>
        </MobileWrapper>
    )
}
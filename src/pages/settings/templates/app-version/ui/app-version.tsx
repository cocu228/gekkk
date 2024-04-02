import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import { Typography } from "@/shared/ui/typography/typography"
import { MobileInput } from "@/shared/ui/mobile-input/mobile-input";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import style from '../style/style.module.scss'
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
            <div className="substrate w-full rounded-lg flex flex-col gap-3">
                <div className="flex flex-row gap-5">
                    <Typography variant="h" color="dark-green">{t("current_app_version")}:</Typography>
                    <Typography variant="h" color="light-green">{appVersion}</Typography>
                </div>
                <div className="flex flex-row gap-5 pt-10">
                    <Typography variant="h" color="dark-green">{t("current_api_version")}:</Typography>
                    <Typography variant="h" color="light-green">2.0.3-20231230-1327.5649</Typography>
                </div>
            </div>
            <div className="flex flex-col">
                {versions.map((ver) => <VersionCard key={ver.version} date={ver.date} description={ver.description} version={ver.version}/>)}
            </div>
        </MobileWrapper>
    )
}
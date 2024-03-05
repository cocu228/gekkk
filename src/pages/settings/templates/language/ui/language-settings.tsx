import { useTranslation } from "react-i18next";
import GB from '@/assets/GB.svg?react';
import RU from '@/assets/RU.svg?react';
import DE from '@/assets/DE.svg?react';
import { Typography } from "@/shared/ui/typography/typography";


export function LanguageSettings() {
    const {i18n} = useTranslation();



    return(
        <div className="flex w-full flex-col items-center gap-4">
            <div 
                className="substrate substrate w-full rounded-lg flex flex-row gap-4 h-[80px] items-center"
                onClick={() => i18n.changeLanguage('en')}
            >
                <GB className="w-10"/>
                <Typography variant="h" className="typography-b3">English</Typography>
            </div>
            <div 
                className="substrate substrate w-full rounded-lg flex flex-row gap-4 h-[80px] items-center"
                onClick={() => i18n.changeLanguage('ru')}
            >
                <RU className="w-10"/>
                <div>
                    <Typography variant="h" className="typography-b3-bold">Русский</Typography>
                    <Typography variant="h" className="typography-b3">Russian</Typography>
                </div>
            </div>
            <div 
                className="substrate substrate w-full rounded-lg flex flex-row gap-4 h-[80px] items-center"
                onClick={() => i18n.changeLanguage('de')}
            >
                <DE className="w-10"/>
                <div>
                    <Typography variant="h" className="typography-b3-bold">Deutsch</Typography>
                    <Typography variant="h" className="typography-b3">German</Typography>
                </div>
            </div>
        </div>
    );
}
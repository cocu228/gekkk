import {useTranslation} from "react-i18next";
import {formatForCustomer} from "@/shared/lib/date-helper";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import { Typography } from "@/shared/ui/typography/typography";

interface IVersion {
	date: string;
	version: string;
	description: string;
}


export const VersionCard = ({date, version, description}: IVersion) => {
	const {t} = useTranslation();

	
	return (
		<div className='substrate substrate w-full rounded-lg m-0 mt-5'>
			<Typography variant="h" color="light-green" className="text-gray-400 text-fs14 font-medium mb-[12px]">{t('Version')} {version} ({formatForCustomer(date)})</Typography>
			<Typography variant="p" color="light-green" className='whitespace-pre-wrap'>
				{description}
			</Typography>
		</div>
	)
}

export default VersionCard;
import {useTranslation} from "react-i18next";
import {formatForCustomer} from "@/shared/lib/date-helper";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";

interface IVersion {
	date: string;
	version: string;
	description: string;
}

interface IParams {
	version: IVersion
}

const VersionCard = ({version: ver}: IParams) => {
	const {t} = useTranslation();
	const {
		date,
		version,
		description
	} = ver;
	
	return (
		<div className='substrate mt-5'>
			<SectionTitle>{t('Version')} {version} ({formatForCustomer(date)})</SectionTitle>
			
			<span className='whitespace-pre-wrap'>
				{description}
			</span>
		</div>
	)
}

export default VersionCard;
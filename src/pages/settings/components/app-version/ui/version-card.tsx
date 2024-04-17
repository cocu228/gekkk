import {useTranslation} from "react-i18next";
import {formatForCustomer} from "@/shared/lib/date-helper";
import s from '../../../styles.module.scss'

interface IVersion {
	date: string;
	version: string;
	description: string;
}


export const VersionCard = ({date, version, description}: IVersion) => {
	const {t} = useTranslation();

	
	return (
		<div className={s.versionCard}>
			<h4 className={s.versionCardTitle}>{t('Version')} {version} ({formatForCustomer(date)})</h4>
			<h4 className={s.versionCardText}>{description}</h4>
		</div>
	)
}

export default VersionCard;
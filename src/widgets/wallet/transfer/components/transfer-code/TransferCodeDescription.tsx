import {useTranslation} from "react-i18next";

const TransferCodeDescription = () => {
	const {t} = useTranslation();
	
	return (
		<div className="row mb-9">
			<div className="info-box-description">
				<div className="row mb-4">
					<span className="font-semibold">{t("funds_transfer_code")}</span>
				</div>
				<div className="row">
					<span>{t("create_special_code")}</span>
				</div>
			</div>
		</div>
	);
}

export default TransferCodeDescription;

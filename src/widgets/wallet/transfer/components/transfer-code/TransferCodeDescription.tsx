import {useTranslation} from "react-i18next";

const TransferCodeDescription = () => {
	const {t} = useTranslation();
	
	return (
		<div className="row mb-9 md:mb-[10px]">
			<div className="info-box-description md:bg-[transparent] md:text-[12px] md:text-[var(--gek-additional) md:indent-[5px] md:p-0">
				<div className="row mb-4 md:hidden">
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

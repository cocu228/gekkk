import {useTranslation} from "react-i18next";
import styles from "./style.module.scss"
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const TransferCodeDescription = () => {
	const {t} = useTranslation();
	const {md} = useBreakpoints()

	return (
		<div className={styles.Container}>
			<div className={`${!md && "info-box-description"} ${styles.ContainerSecondary}`}>
				<div className={styles.FundsText}>
					<span className="font-semibold">{t("funds_transfer_code")}</span>
				</div>
				<div>
					<span>{t("create_special_code")}</span>
				</div>
			</div>
		</div>
	);
}

export default TransferCodeDescription;

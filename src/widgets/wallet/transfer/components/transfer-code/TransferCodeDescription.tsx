import {useTranslation} from "react-i18next";
import styles from "./style.module.scss"
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const TransferCodeDescription = () => {
	const {t} = useTranslation();
	const {md} = useBreakpoints()

	return (
		<div className={styles.Container}>
			<div className={`${!md && "info-box-description"} ${styles.ContainerSecondary}`}>
				<span className="text-[12px] text-[#285E69] font-normal">{t("create_special_code")}</span>
			</div>
		</div>
	);
}

export default TransferCodeDescription;

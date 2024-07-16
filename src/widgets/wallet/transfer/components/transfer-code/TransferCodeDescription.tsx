import { useTranslation } from "react-i18next";

import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

import styles from "./style.module.scss";

const TransferCodeDescription = () => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();

  return (
    <div className={styles.Container}>
      <div className={`${!md && "info-box-description"} ${styles.ContainerSecondary}`}>
          <span className={styles.FundsText}>{t("funds_transfer_code")}</span>
        <div>
        <span className={styles.CodeText}>&nbsp;&nbsp;&nbsp;&nbsp;{t("create_special_code")}</span>
        </div>
      </div>
    </div>
  );
};

export default TransferCodeDescription;

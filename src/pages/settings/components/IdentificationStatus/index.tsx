import { useTranslation } from "react-i18next";

import styles from "../../styles.module.scss";
import { AreaWrapper } from "../AreaWrapper";

export function IdentificationStatus() {
  const { t } = useTranslation();

  return (
    <AreaWrapper title='Identification status'>
      <div className={styles.identBody}>
        <span className={styles.identTitle}>{t("REGISTERED")}</span>
        <span className={styles.identTitle}>{t("identification_status_message")}</span>
      </div>
    </AreaWrapper>
  );
}

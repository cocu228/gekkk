import { useTranslation } from "react-i18next";

import { formatForCustomer } from "@/shared/lib/date-helper";

import styles from "../../styles.module.scss";

interface IVersion {
  date: string;
  version: string;
  description: string;
}

export const VersionCard = ({ date, version, description }: IVersion) => {
  const { t } = useTranslation();

  return (
    <div className={styles.versionCard}>
      <h4 className={styles.versionCardTitle}>
        {t("version")} {version} ({formatForCustomer(date)})
      </h4>
      <h4 className={styles.versionCardText}>{description}</h4>
    </div>
  );
};

export default VersionCard;

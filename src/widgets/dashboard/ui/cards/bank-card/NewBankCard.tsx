import { useTranslation } from "react-i18next";

import styles from "./style.module.css";

const NewBankCard = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.BankCard}>
      <div className={`${styles.CardStatus} ${styles.White}`}>{t("no_active_cards")}</div>
    </div>
  );
};

export default NewBankCard;

import { useTranslation } from "react-i18next";

import { CardStatusDescriptions } from "@/shared/store/active-cards/activeCards";

import styles from "./style.module.css";

interface CardData {
  status?: string;
  expiresAt: string;
  cardNumber: string;
  holderName: string;
}

const BankCard = ({ status, expiresAt, cardNumber, holderName }: CardData) => {
  const { t } = useTranslation();

  // const isBlockedByBank = status === "BLOCKED_BY_BANK";

  return (
    <div className={styles.BankCard}>
      <div className={`${styles.CardStatus} ${styles.White}`}>
        {status && status !== "ACTIVE" && t(CardStatusDescriptions[status])}
      </div>
      <div className={`${styles.Text} ${styles.CardNumber}`}>{cardNumber}</div>
      <div className={`${styles.Text} ${styles.CardData}`}>
        {expiresAt}
        <br />
        {holderName}
      </div>
    </div>
  );
};

export default BankCard;

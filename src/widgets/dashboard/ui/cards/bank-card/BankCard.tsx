import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { CardStatusDescriptions } from "@/shared/store/active-cards/activeCards";

interface CardData {
  expiresAt: string;
  cardNumber: string;
  holderName: string;
  className?: string;
  status?: string;
  cardWidth?: number;
}

const BankCard = ({
  cardNumber,
  status,
  expiresAt,
  holderName,
  className,
  cardWidth,
}: CardData) => {
  const { t } = useTranslation();

  return (
    <div className={`flex justify-center ${className}`}>
      {status && status !== "ACTIVE" && (
        <div className="flex absolute w-full h-full items-center justify-center font-bold select-none text-black text-lg">
          <div className="mb-10 rounded-[6px] p-1">
            {t(CardStatusDescriptions[status])}
          </div>
        </div>
      )}
      <div className={styles.BankCard}>
        <img
          src="/img/payment-card/payment-card-background2.jpg"
          className="rounded-[10px]"
        />
        <div
          style={{ maxWidth: `${cardWidth || 220}px` }}
          className={`absolute w-full`}
        >
          <div
            className={styles.CardNumber}
            style={{
              fontSize: `${cardWidth / 16}px`,
              marginLeft: cardWidth >= 300 && "22px",
            }}
          >
            <span className={styles.CardNumberText}>{cardNumber}</span>
          </div>
          <div
            className={styles.CardData}
            style={{
              fontSize: cardWidth > 220 ? "12px" : "10px",
              marginLeft: cardWidth >= 300 && "22px",
            }}
          >
            {expiresAt}
          </div>
          <div
            style={{
              fontSize: cardWidth > 220 ? "12px" : "10px",
              marginLeft: cardWidth >= 300 && "22px",
            }}
            className={styles.CardData + " " + styles.CardHolderName}
          >
            {holderName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankCard;

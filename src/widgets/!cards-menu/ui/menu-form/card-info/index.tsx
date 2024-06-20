import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

import { CardSecretDTO } from "@/shared/(orval)api/gek/model";
import Button from "@/shared/ui/button/Button";
import Loader from "@/shared/ui/loader";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { apiUnmask } from "@/shared/(orval)api";

import styles from "./styles.module.scss";

interface IParams {
  cardId: string;
  onBack: () => void;
}

const CardInfo = ({ cardId, onBack }: IParams) => {
  const { t } = useTranslation();
  const [cardInfo, setCardInfo] = useState<CardSecretDTO>(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      const { data } = await apiUnmask(
        { cardId: cardId },
        {
          cancelToken: cancelTokenSource.token
        }
      );

      if (data.result.pan === null) {
        return;
      }

      setCardInfo(data.result);
    })();

    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  return (
    <div className={styles.Wrapper}>
      {!cardInfo ? (
        <Loader className='relative my-10' />
      ) : (
        <>
          <div className={styles.Warning}>
            <div>
              <IconApp color='#8F123A' size={15} code='t27' />
            </div>
            <h3 className={styles.WarningText}>{t("be_careful")}</h3>
          </div>

          <div className={`${styles.InfoContainerFirst} ${styles.InfoContainer}`}>
            <span>
              **** **
              <b className={styles.InfoData}>{`${cardInfo.pan.slice(0, 2)} ${cardInfo.pan.slice(2)}`}</b> ****
            </span>
          </div>

          <div className='flex flex-row gap-4 mt-2'>
            <div className={`${styles.InfoContainerSecond} ${styles.InfoContainer}`}>
              <span>
                <span className={styles.InfoPlaceholder}>CV/CVV</span>
                <b className={styles.InfoData}> {cardInfo.cvv ?? "-"}</b>
              </span>
            </div>
            <div className={`${styles.InfoContainerSecond} ${styles.InfoContainer}`}>
              <span>
                <span className={styles.InfoPlaceholder}>PIN</span>
                <b className={styles.InfoData}> {cardInfo.pin ?? "-"}</b>
              </span>
            </div>
          </div>
        </>
      )}

      <div className={styles.ButtonContainer}>
        <Button color='blue' onClick={onBack}>
          {t("close")}
        </Button>
      </div>
    </div>
  );
};

export default CardInfo;

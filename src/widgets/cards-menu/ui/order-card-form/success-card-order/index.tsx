import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";
import Success from "@/assets/success.svg?react";

import styles from "./styles.module.scss";
import { useNewCardContext } from "../../new-card/newCardContext";

export function SuccessCardOrder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setStep } = useNewCardContext();
  const [seconds, setSeconds] = useState(10000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setStep("IssueNewCard");
      navigate("/");
    }
  }, [seconds]);

  const secondsToShow = seconds >= 10000 ? "10" : `0${seconds / 1000}`;

  return (
    <>
      <div className={styles.Wrapper}>
        <p className={styles.Title}>{t("card_has_been_ordered")}</p>

        <Success />

        <Button
          skeleton
          color='gray'
          onClick={() => {
            setStep("IssueNewCard");
            navigate("/");
          }}
        >
          {t("back_to_main_page")}
        </Button>

        <p className={styles.Text}>
          {t("you_will_be_automatically_redirected_to_the_main_page_in")}{" "}
          <span className={styles.Counter}>00:{secondsToShow}</span>
        </p>
      </div>
    </>
  );
}

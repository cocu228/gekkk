import { useTranslation } from "react-i18next";

import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";

import styles from "./styles.module.scss";
import ExtendedSelect from "../../selector";
import { useOrderCardContext } from "../../../model/context";

export function IssueNewCard({ closable }: { closable: boolean }) {
  const { t } = useTranslation();
  const { state, close, setStep, setState } = useOrderCardContext();

  return (
    <>
      <div className={styles.DesignContainer}>
        <span className={styles.DesignTitle}>{t("select_card_design")}: </span>
        <BankCard cardNumber='5270 0000 0000 0000' expiresAt='00/00' holderName='CARDHOLDER' />
      </div>

      <ExtendedSelect
        className='mt-4'
        title='Card type:'
        label={t("select_card_type")}
        value={state.cardType}
        onSelect={(v: "VIRTUAL" | "PLASTIC") =>
          setState({
            ...state,
            cardType: v
          })
        }
        options={[
          {
            label: t("virtual"),
            value: "VIRTUAL"
          },
          {
            label: t("plastic"),
            value: "PLASTIC"
          }
        ]}
      >
        <div className={styles.Container}>
          {state.card ? null : (
            <>
              <div>
                <div className={styles.Label}>{t("cardholder_name")}:</div>
                <Input
                  value={state.cardholderName}
                  placeholder={`-${t("enter_name")}-`}
                  onChange={({ target }) =>
                    setState({
                      ...state,
                      cardholderName: target.value
                    })
                  }
                />
              </div>

              <div>
                <div className={styles.Label}>{t("linked_phone_number")}:</div>
                <Input
                  allowDigits
                  value={state.linkedPhone}
                  placeholder={`-${t("enter_phone_number")}-`}
                  onChange={({ target }) =>
                    setState({
                      ...state,
                      linkedPhone: target.value
                    })
                  }
                />
              </div>
            </>
          )}

          <div className={styles.ButtonsContainer}>
            <Button
              className='w-full'
              disabled={!state.cardholderName || !state.linkedPhone || !/^\d+$/.test(state.linkedPhone)}
              // If plastic card or virtual card personalization, we need delivery information
              // Otherwise, we can proceed to card order confirmation
              onClick={() => (state.cardType === "PLASTIC" ? setStep("DeliveryInfo") : setStep("OrderConfirmation"))}
            >
              {t("proceed")}
            </Button>

            {closable && (
              <Button skeleton onClick={close} className='w-full'>
                {t("back")}
              </Button>
            )}
          </div>
        </div>
      </ExtendedSelect>
    </>
  );
}

import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import { actionResSuccess } from "@/shared/lib";
import Button from "@/shared/ui/button/Button";
import { CtxRootData } from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import { Select } from "@/shared/ui/oldVersions/Select";
import Loader from "@/shared/ui/loader";
import { apiPersonalize, apiCreateCard } from "@/shared/(orval)api";
import { Format as CardFormat } from "@/shared/(orval)api/gek/model";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import { deliveryCountriesList } from "@/shared/config/delivery-coutries-list";
import { apiDeliveryOptions, IDeliveryOption } from "@/shared/api/bank/get-delivery-options";
import { getAddressPartOrEmpty } from "@/widgets/!cards-menu/model/helpers";

import { useOrderCardContext } from "../../../model/context";
import styles from "./styles.module.scss";

export function OrderConfirmation() {
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const { mainCard } = storeActiveCards(state => state);
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption>(null);
  const { state, setStep, setState } = useOrderCardContext();

  useEffect(() => {
    console.log(state);
    (async () => {
      if (state.cardType === "PLASTIC") {
        const { data } = await apiDeliveryOptions();
        setDeliveryOption(data.find(o => o.countryCode === state.countryCode));
      }
    })();
  }, []);

  const onConfirm = async () => {
    const response = await (!!state.card
      ? // Personalize virtual card
        apiPersonalize(
          {
            isExpressDelivery: state.isExpressDelivery,
            deliveryAddress: {
              city: state.city,
              countryCode: state.countryCode,
              postalCode: state.postalCode,
              street: state.street,
              streetNumber: state.houseNumber,
              apartmentNumber: state.apartmentNumber,
              recipientName: state.recipientName
            }
          },
          { cardId: state.card.cardId }
        )
      : // Order new card
        apiCreateCard({
          accountId: account.account_id,
          format: CardFormat[state.cardType],
          cardHolderName: state.cardholderName,
          cardHolderPhoneNumber: state.linkedPhone,
          type: mainCard !== null ? "ADDITIONAL" : "MAIN",

          // Plastic card delivery information
          ...(state.cardType === "PLASTIC"
            ? {
                isExpressDelivery: state.isExpressDelivery,
                deliveryAddress: {
                  city: state.city,
                  street: state.street,
                  postalCode: state.postalCode,
                  countryCode: state.countryCode,
                  streetNumber: state.houseNumber,
                  recipientName: state.recipientName,
                  apartmentNumber: state.apartmentNumber
                }
              }
            : {})
        }));

    actionResSuccess(response)
      .success(() => setStep("SuccessCardOrder"))
      .reject(localErrorHunter);
  };

  return state.cardType === "PLASTIC" && !deliveryOption ? (
    <Loader className={"relative mt-20"} />
  ) : (
    <>
      <div className={styles.DesignContainer}>
        {state.card ? (
          <BankCard
            cardNumber={state.card.displayPan}
            holderName={state.card.cardholder}
            expiresAt={state.card.expiryDate}
          />
        ) : (
          <BankCard cardNumber='5270 0000 0000 0000' holderName={state.cardholderName} expiresAt='00/00' />
        )}
      </div>

      <div className={styles.Container}>
        <div className={styles.InfoList}>
          <div className={styles.Row}>
            <span className={styles.RowTitle}>{t("account_owner")}</span>
            <span className={styles.RowValue}>{account.name}</span>
            <hr />
          </div>

          <div className={styles.Row}>
            <span className={styles.RowTitle}>{t("account_number")}</span>
            <span className={styles.RowValue}>{account.number}</span>
            <hr />
          </div>
          <div className={styles.Row}>
            <span className={styles.RowTitle}>{t("card_design")}</span>
            <span className={styles.RowValue}>Standard</span>
            <hr />
          </div>
          <div className={styles.Row}>
            <span className={styles.RowTitle}>{t("cardholder").toLowerCase().capitalize()}</span>
            <span className={styles.RowValue}>{state.cardholderName}</span>
            <hr />
          </div>
          {!state.recipientName ? null : (
            <div className={styles.Row}>
              <span className={styles.RowTitle}>{t("recipient")}</span>
              <span className={styles.RowValue}>{state.recipientName}</span>
              <hr />
            </div>
          )}

          {state.cardType === "PLASTIC" && (
            <>
              <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("delivery_address")}</span>
                <span className={styles.RowValue}>
                  {`
                                ${getAddressPartOrEmpty(
                                  deliveryCountriesList.find(c => c.code === state.countryCode).name
                                )}
                                ${getAddressPartOrEmpty(state.postalCode)}
                                ${getAddressPartOrEmpty(state.city)}
                                ${getAddressPartOrEmpty(state.street)}
                                ${getAddressPartOrEmpty(state.houseNumber)}
                                ${state.apartmentNumber ?? ""}
                            `}
                  <hr />
                </span>
              </div>

              <div className={styles.FeeRow}>
                <span className={styles.RowTitle}>{t("delivery_type")}</span>
                <div className='w-[200px] items-center'>
                  <Select
                    mobile={true}
                    placeholder='Select type...'
                    value={state.isExpressDelivery ? "Express (26 €)" : "Standart (0 €)"}
                    options={[
                      {
                        label: "Standard (0 €)",
                        value: "standard"
                      },
                      {
                        label: `Express (${deliveryOption.cost} €)`,
                        value: "express"
                      }
                    ]}
                    onChange={(e: "Express (26 €)" | "standard") => {
                      console.log("TYYYPE", e);
                      setState({
                        ...state,
                        isExpressDelivery: e === "Express (26 €)"
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.FeeList}>
          <div className={styles.FeeRow}>
            <span className={styles.FeeTitle} style={{ fontWeight: "500" }}>
              {t("card_issuance")}
            </span>
            <span className={styles.FeeValue}>€ 10</span>
          </div>

          <div className={styles.FeeRow}>
            <span className={styles.FeeTitle} style={{ fontWeight: "500" }}>
              {t("card_delivery")}
            </span>
            <span className={styles.FeeValue}>€ {state.isExpressDelivery ? deliveryOption.cost : 0}</span>
          </div>

          <div className={styles.FeeRow}>
            <span className={styles.FeeTitle}>{t("total_fees")}</span>
            <span className={styles.FeeTitle}>€ {10 + (state.isExpressDelivery ? deliveryOption.cost : 0)}</span>
          </div>

          {state.cardType === "PLASTIC" && (
            <div className={`${styles.FeeRow}`}>
              <span className={styles.FeeTitle}>{t("expected_delivery_time")}</span>
              <span className={styles.FeeTitle}>{state.isExpressDelivery ? deliveryOption.deliveryDays : 10} days</span>
            </div>
          )}
        </div>
        <hr />

        {localErrorInfoBox}

        <div className={styles.ButtonsContainer}>
          <Button className='w-full' text={t("order_card")} onClick={onConfirm} />
          <Button
            skeleton
            className='w-full'
            text={t("back")}
            onClick={() => setStep(state.cardType === "PLASTIC" || !!state.card ? "DeliveryInfo" : "IssueNewCard")}
          />
        </div>
      </div>
    </>
  );
}

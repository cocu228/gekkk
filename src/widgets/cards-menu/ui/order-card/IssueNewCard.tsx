import { useNewCardContext } from "./newCardContext";
import Button from "@/shared/ui/button/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ValidateOrderCardState } from "@/widgets/cards-menu/model/helpers";
import { deliveryCountriesList } from "@/shared/config/delivery-coutries-list";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { Switch } from "antd";
import styles from '../style.module.scss'
export const latinPattern = /^[a-zA-Z\s]*$/;

export function IssueNewCard() {
  const { t } = useTranslation();
  const [isValid, validate] = useState<boolean>(false);
  const { state, close, setStep, setState, switchResidenceAddress } =
    useNewCardContext();

  useEffect(() => {
    validate(ValidateOrderCardState(state));
  }, [state]);

  return (
    <div>
      <div className={styles.issueCardTitleBlock} >
        <h3 className={styles.issueCardTitle}>
          {t("issue_new_card")}
        </h3>
        <CloseWindowButton onClick={close} />
      </div>
      <div className={styles.issueCardBody} >
        <div className={`${styles.issueRowItem} ${styles.issueRowItemBorderBottom}`}>
          <div className={styles.rowItemBody}>
            <span className={styles.rowItemTitle}>
              {t("delivery_address")}
            </span>
            <span className={styles.rowItemSubtitle}>
              {t("same_as_the_residence_address")}
            </span>
          </div>
          <Switch
            checked={state.isResidenceAddress}
            onChange={switchResidenceAddress}
          />
        </div>
        <div className={`${styles.issueRowItem} ${styles.issueRowItemBorderBottom}`}>
          <span className={styles.rowItemTitle}>
            {t("country")}
          </span>
          <div className="w-[250px]">
          <SearchSelect
              className="w-full mt-2"
              placeholder={t("select_country")+"..."}
              value={state.countryCode}
              notFoundContent={<span>{t("country_not_found")}</span>}
              options={deliveryCountriesList.map((c) => ({
                label: c.name,
                value: c.code,
              }))}
              onSelect={(code) =>
                setState({
                  ...state,
                  countryCode: code,
                })
              }
            />  
          </div>
        </div>
        <div className={styles.input_block}>
          <span className={styles.input_title}>{t("city")}</span>
          <input
            value={state.city}
            onChange={({ target }) => {
              const inputValue = target.value;

              if (!latinPattern.test(inputValue)) {
                return null;
              } else {
                setState({
                  ...state,
                  city: target.value,
                });
              }
            }}
            className={styles.input}
            placeholder={t("enter_city_name")}
          />
        </div>
        <div className={styles.input_block}>
          <span className={styles.input_title}>{t("post_code")}</span>
          <input
            value={state.postalCode}
            placeholder={t("enter_post_code")}
            onChange={({ target }) =>
              setState({
                ...state,
                postalCode: target.value,
              })
            }
            className={styles.input}
          />
        </div>
        <div className={styles.input_block}>
          <span className={styles.input_title}>{t("street")}</span>
          <input
          value={state.street}
          placeholder={t("enter_street_name")}
          onChange={({ target }) => {
            const ru = /[а-яё]+/i.test(target.value);
            if (ru) {
              return null;
            } else {
              setState({
                ...state,
                street: target.value,
              });
            }
          }}
            className={styles.input}
          />
        </div>
        <div className={styles.input_block}>
          <span className={styles.input_title}>{t("house")}</span>
          <input
            value={state.houseNumber}
            placeholder={t("enter_house_name_or_number_if_available")}
            onChange={({ target }) => {
              const ru = /[а-яё]+/i.test(target.value);
              if (ru) {
                return null;
              } else {
                setState({
                  ...state,
                  houseNumber: target.value,
                });
              }
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.input_block}>
          <span className={styles.input_title}>{t("flat")}</span>
          <input
            value={state.apartmentNumber}
            placeholder={t("enter_flat_name_or_number_if_available")}
            onChange={({ target }) => {
              const ru = /[а-яё]+/i.test(target.value);
              if (ru) {
                return null;
              } else {
                setState({
                  ...state,
                  apartmentNumber: target.value,
                });
              }
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.input_block}>
          <span className={styles.input_title}>{t("recipient")}</span>
          <input
            placeholder={t("enter_recipient_name_if_necessary")}
            value={state.recipientName}
            onChange={({ target }) => {
              const inputValue = target.value;

              if (!latinPattern.test(inputValue)) {
                return null;
              } else {
                setState({
                  ...state,
                  recipientName: target.value,
                });
              }
            }}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.issueFooter} >
        <Button
          className="w-full"
          disabled={!isValid}
          onClick={() => {
            setStep("ConfirmationNewCard");
          }}
        >
          {t("proceed")}
        </Button>
        <Button color='gray' className="w-full" onClick={close}>
          {t("back")}
        </Button>
      </div>
    </div>
  );
}

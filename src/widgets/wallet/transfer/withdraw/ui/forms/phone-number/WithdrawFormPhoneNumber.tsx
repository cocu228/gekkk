import Decimal from "decimal.js";
import styles from "../styles.module.scss";
import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import { MASK_PHONE } from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import {useCallback, useContext, useEffect, useState} from "react";
import WithdrawConfirmPhoneNumber from "./WithdrawConfirmPhoneNumber";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { validateBalance, validateMinimumAmount, } from "@/shared/config/validators";
import { CtxWalletData, CtxWalletNetworks, } from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {Modal} from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import {debounce, formatAsNumber} from "@/shared/lib";
import {CtxRootData} from "@/processes/RootContext";

const WithdrawFormPhoneNumber = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useContext(CtxWalletData);
  const {account} = useContext(CtxRootData);
  const { inputCurr, setInputCurr } = useInputState();
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { onInput: onPhoneNumberInput } = useMask(MASK_PHONE);
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const { networkTypeSelect, tokenNetworks, localErrorInfoBox, setBankRefresh } = useContext(CtxWalletNetworks);
  const { min_withdraw = 0, withdraw_fee } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const [details, setDetails] = useState<PaymentDetails>({
    account: account.account_id,
    phoneNumber: null,
    purpose: null,
    amount: {
      sum: {
        currency: {
          code: currency.$const
        }
      }
    }
  })

  const onInput = ({ target }) => {
    setDetails((prev) => ({
      ...prev,
      [target.name]: target.name === "phoneNumber" ? formatAsNumber(target.value) : target.value
    }));
  };

  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), [],);
  const delayRes = useCallback(
    debounce((details: PaymentDetails) => {
      setBankRefresh(details);
    }, 2500),
    []);

  useEffect(() => {
    if (!Object.values(details).some((val) => !val) && inputCurr.value.number) {
      setLoading(true);
      delayRes(details);
      delayDisplay();
    }
  }, [inputCurr.value.number, details]);

  useEffect(() => {
    setIsValid(() =>
      Object.keys(details).every((i) => {
        if (!details[i]) return false;
        if (i === "phoneNumber") return details[i].length > 7;

        return details[i].length > 0;
      })
    );
  }, [details, inputCurr.value]);

  return (
    <div className="wrapper">
      <div className="row mb-5 w-full">
        <div className="col">
          <InputCurrency.Validator
            value={inputCurr.value.number}
            description={getWithdrawDesc(min_withdraw, currency.$const)}
            onError={setInputCurrValid}
            validators={[
              validateBalance(currency, navigate, t),
              validateMinimumAmount(
                min_withdraw,
                inputCurr.value.number,
                currency.$const,
                t
              )
            ]}
          >
            <InputCurrency.PercentSelector
              currency={currency}
              header={
                <span className={`${styles.TitleColText} ml-[10px]`}>
                  {t("amount")}:
                </span>
              }
              onSelect={setInputCurr}
            >
              <InputCurrency
                placeholder={t("exchange.enter_amount")}
                onChange={setInputCurr}
                value={inputCurr.value.string}
                currency={currency.$const}
              />
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>
      </div>

      <div className="row mb-5 w-full">
        <div className="col">
          <div className="row mb-[3px]">
            <div className="col">
              <span className={`${styles.TitleColText} ml-[10px]`}>
                {t("phone_number")}:
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Input
                allowDigits
                allowSymbols
                name={"phoneNumber"}
                placeholder={t("auth.enter_phone_number")}
                onChange={onInput}
                onInput={onPhoneNumberInput}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row w-full">
        <div className="col">
          <div className="row mb-[3px]">
            <div className="col">
              <span className={`${styles.TitleColText} ml-[10px]`}>
                {t("description")}:
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col flex items-center">
              <Input
                allowDigits
                allowSymbols
                name={"purpose"}
                value={details.purpose}
                onChange={onInput}
                placeholder={t("enter_description")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row w-full flex justify-center">
        <Commissions
          isLoading={loading}
          youWillPay={inputCurr.value.number + withdraw_fee}
          youWillGet={inputCurr.value.number}
          fee={withdraw_fee}
          youWillGetCoin={"EURG"}
        />
      </div>

      <Modal
        placeBottom={window.innerWidth < 768}
        destroyOnClose
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        title={t("confirm_transaction")}
      >
        <WithdrawConfirmPhoneNumber
          details={details}
          handleCancel={handleCancel}
        />
      </Modal>
      <div className="my-2">{localErrorInfoBox}</div>
      <div className={styles.ButtonContainerCenter}>
        <Button
          size="lg"
          onClick={showModal}
          className={styles.Button}
          disabled={
            !!localErrorInfoBox ||
            loading ||
            !isValid ||
            inputCurrValid.value
          }
        >
          <span className={styles.ButtonLabel}>{t("transfer")}</span>
        </Button>
      </div>
    </div>
  );
};

export default WithdrawFormPhoneNumber;

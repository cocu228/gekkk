import styles from "../styles.module.scss";
import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import { MASK_PHONE } from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import { useContext, useEffect, useState } from "react";
import WithdrawConfirmPhoneNumber from "./WithdrawConfirmPhoneNumber";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {
  validateBalance,
  validateMinimumAmount,
} from "@/shared/config/validators";
import {
  CtxWalletData,
  CtxWalletNetworks,
} from "@/widgets/wallet/transfer/model/context";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import TextArea from "@/shared/ui/input/text-area/TextArea";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import {Modal} from "@/shared/ui/modal/Modal";

const WithdrawFormPhoneNumber = () => {
  const {md} = useBreakpoints()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useContext(CtxWalletData);
  const { inputCurr, setInputCurr } = useInputState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { onInput: onPhoneNumberInput } = useMask(MASK_PHONE);
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const { networkTypeSelect, tokenNetworks } = useContext(CtxWalletNetworks);
  const { min_withdraw = 0 } =
    getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const [inputs, setInputs] = useState<{
    comment: string;
    phoneNumber: string;
  }>({
    comment: "",
    phoneNumber: null,
  });

  useEffect(() => {
    setIsValid(() =>
      Object.keys(inputs).every((i) => {
        if (!inputs[i]) return false;
        if (i === "phoneNumber") return inputs[i].length > 7;

        return inputs[i].length > 0;
      })
    );
  }, [inputs, inputCurr.value]);

  const onInputDefault = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

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
              ),
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
                transfers
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
                tranfers={md}
                bordered={!md}
                allowDigits
                allowSymbols
                name={"phoneNumber"}
                placeholder={t("auth.enter_phone_number")}
                onChange={onInputDefault}
                onInput={onPhoneNumberInput}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5 w-full">
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
              {md?
                <Input
                  tranfers
                  bordered={false}
                  allowDigits
                  allowSymbols
                  value={inputs.comment}
                  name={"comment"}
                  onChange={onInputDefault}
                  placeholder={t("enter_description")}
                  style={{
                    minHeight: 100,
                  }}
                />
              :
                <TextArea
                  allowDigits
                  allowSymbols
                  value={inputs.comment}
                  name={"comment"}
                  onChange={onInputDefault}
                  placeholder={t("enter_description")}
                  style={{
                    minHeight: 100,
                  }}
                />
              }
            </div>
          </div>
        </div>
      </div>

      <Modal
        placeBottom={window.innerWidth < 768}
        zIndex
        destroyOnClose
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
                title={t("confirm_transaction")}
      >
        <WithdrawConfirmPhoneNumber
          {...inputs}
          amount={inputCurr.value.number}
          handleCancel={handleCancel}
        />
      </Modal>

      <div className={styles.ButtonContainerCenter}>
        <Button
          size="lg"
          onClick={showModal}
          className={styles.Button}
          disabled={!isValid || inputCurrValid.value}
        >
          <span className={styles.ButtonLabel}>{t("transfer")}</span>
        </Button>
      </div>
    </div>
  );
};

export default WithdrawFormPhoneNumber;

import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import { useContext, useEffect, useState } from "react";
import UniversalTransferConfirm from "./UniversalTransferConfirm";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {
  validateBalance,
  validateMaximumAmount,
  validateMinimumAmount,
} from "@/shared/config/validators";
import {
  CtxWalletData,
  CtxWalletNetworks,
} from "@/widgets/wallet/transfer/model/context";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import styles from "../styles.module.scss";
import TextArea from "@/shared/ui/input/text-area/TextArea";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import {Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";

const UniversalTransferForm = () => {
  const {md} = useBreakpoints()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useContext(CtxWalletData);
  const { inputCurr, setInputCurr } = useInputState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const { networkTypeSelect, tokenNetworks } = useContext(CtxWalletNetworks);

  const [inputs, setInputs] = useState<{
    comment: string;
    requisite: string;
  }>({
    comment: "",
    requisite: null,
  });

  const { min_withdraw = 0, max_withdraw = 0 } =
    getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  useEffect(() => {
    const { requisite } = inputs;

    setIsValid(requisite?.length > 0 && inputCurr.value.string?.length > 0);
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
              validateMaximumAmount(
                max_withdraw,
                inputCurr.value.number,
                currency.$const,
                t
              ),
            ]}
          >
            <InputCurrency.PercentSelector
              currency={currency}
              header={
                <span className={`${styles.TitleColText} m-[0_0_5px_11px]`}>
                  {t("amount")}:
                </span>
              }
              onSelect={setInputCurr}
            >
              <InputCurrency.DisplayBalance currency={currency}>
                <InputCurrency
                  transfers={md}
                  onChange={setInputCurr}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>
      </div>

      <div className="row mb-5 w-full">
        <div className="row mb-[3px]">
          <span className={`${styles.TitleColText} m-[0_0_5px_11px]`}>
            {t('contact')}:
          </span>
        </div>
        <div className="row flex w-full">
          <div className="col basis-[100%]">
            <Input
              allowDigits
              allowSymbols
              name={"requisite"}
              value={inputs.requisite}
              onChange={onInputDefault}
              placeholder={t("enter_phone_or_IBAN")}
            />
          </div>
        </div>
      </div>

      <div className="row mb-5 w-full">
        <div className="row mb-[3px]">
          <div className="col">
            <span className={`${styles.TitleColText} ml-[12px]`}>
              {t("description")}:
            </span>
          </div>
        </div>
        <div className="row w-full">
          <div className="col w-full">
            {md?
              <Input
                allowDigits
                allowSymbols
                name={"comment"}
                value={inputs.comment}
                onChange={onInputDefault}
                placeholder={t("comment_optional")}
              />
            :
              <TextArea
                allowDigits
                allowSymbols
                name={"comment"}
                value={inputs.comment}
                onChange={onInputDefault}
                placeholder={t("comment_optional")}
                style={{
                  minHeight: 100,
                }}
              />
            }
          </div>
        </div>
      </div>
      
      <ModalUi
        placeBottom={window.innerWidth<768}
        destroyOnClose
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        title={t("confirm_transaction")}
      >
        <UniversalTransferConfirm
          {...inputs}
          handleCancel={handleCancel}
          amount={inputCurr.value.number}
        />
      </ModalUi>
      <div className={styles.PayInfo}>
          <div className={styles.PayInfoCol}>
            <div className="row">
              <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
            </div>
            <div className="row">
              <span className={styles.PayInfoText}>{t("you_will_get")}:</span>
            </div>
            <div className="row">
              <span className={styles.PayInfoTextFee}>{t("fee")}:</span>
            </div>
          </div>
          <div className={styles.PayInfoColValue}>
            <div className={styles.PayInfoCol}>
              <div className={styles.PayInfoValueFlex}>
                <span className={styles.PayInfoValueFlexText}>
                  {inputCurr.value.number}
                </span>
              </div>
              <div className={styles.PayInfoValueFlex}>
                <span className={styles.PayInfoValueFlexText}>
                  {inputCurr.value.number}
                </span>
              </div>
              <div className={styles.PayInfoValueFlex}>
                <span className={styles.PayInfoValueFlexTextFee}>-</span>
              </div>
            </div>

            <div className={styles.PayInfoCol}>
              <span className={styles.PayInfoValueFlexTextCurrency}>
                {currency.$const}
              </span>
              <span className={styles.PayInfoValueFlexTextCurrency}>
                {currency.$const}
              </span>
              <span className={styles.PayInfoValueFlexTextFee}>
                {currency.$const}
              </span>
            </div>
          </div>
        </div>
      <div className={styles.ButtonContainerCenter}>
        <Button
          size="lg"
          className={styles.Button}
          onClick={showModal}
          disabled={!isValid || inputCurrValid.value}
        >
          <span className={styles.ButtonLabel}>{t("transfer")}</span>
        </Button>
        <span className="block font-normal text-[#B9B9B5] text-[10px] font-[Inter]">
          {t('fee_is')}
          <span className="uppercase font-bold"> 0 eurg </span>
          {t("per_transaction")}
        </span>
      </div>
    </div>
  );
};

export default UniversalTransferForm;

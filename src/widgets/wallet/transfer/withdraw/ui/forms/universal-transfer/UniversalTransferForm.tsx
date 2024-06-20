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
import {Modal} from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";

const UniversalTransferForm = () => {
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
                <span className={`${styles.TitleColText} md:m-[0_0_-2px_7px] m-[0_0_-3.5px_7px]`}>
                  {t("amount")}:
                </span>
              }
              onSelect={setInputCurr}
            >
              <InputCurrency.DisplayBalance currency={currency}>
                <InputCurrency
                  placeholder={t("exchange.enter_amount")}
                  onChange={setInputCurr}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>
      </div>

      <div className="row mb-5 w-full flex flex-col gap-[3px]">
        <span className={`${styles.TitleColText} m-[0_0_0px_7px]`}>
          {t('contact')}:
        </span>
        <Input
          className="h-[32px]"
              allowDigits
              allowSymbols
              name={"requisite"}
              value={inputs.requisite}
              onChange={onInputDefault}
              placeholder={t("enter_phone_or_IBAN")}
            />
      </div>

      <div className="row mb-5 w-full flex flex-col gap-[3px]">
        <span className={`${styles.TitleColText} ml-[7px]`}>
          {t("description")}:
        </span>
        <Input
         className="h-[32px]"
          allowDigits
          allowSymbols
          name={"comment"}
          value={inputs.comment}
          onChange={onInputDefault}
          placeholder={t("desc_optional")}
        />      
      </div>
      
      <Modal
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
      </Modal>
      <div className='w-full flex justify-center'>
        <Commissions
            youWillPay={inputCurr.value.number}
            youWillGet={inputCurr.value.number}
            fee={"-"}
        />
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

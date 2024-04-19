import Modal from "@/shared/ui/modal/Modal";
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
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

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
      <div className="info-box-description mb-4 p-6 md:text-xs">
        <div className="row">
          <span className="font-semibold">{t("fee_free")}* </span>
          <span>{t("universal_transfer_description")} </span>
          <span className="font-semibold">{t("phone_number_or_IBAN")}</span>
        </div>
      </div>

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
                <span className={styles.TitleColText}>
                  {t("amount")}:
                </span>
              }
              onSelect={setInputCurr}
            >
              <InputCurrency.DisplayBalance currency={currency}>
                <InputCurrency
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
        <div className="row mb-2">
          <span className={styles.TitleColText}>
            IBAN, phone number, crypto wallet:
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
        <div className="row mb-2">
          <div className="col">
            <span className={styles.TitleColText}>
              {t("comment_optional")}:
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col flex items-center">
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
          </div>
        </div>
      </div>
      
      <Modal
        width={450}
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}

      >
        <UniversalTransferConfirm
          {...inputs}
          handleCancel={handleCancel}
          amount={inputCurr.value.number}
        />
      </Modal>

      <div className={styles.ButtonContainerCenter}>
        <Button
          size={"xl"}
          className={styles.Button}
          onClick={showModal}
          disabled={!isValid || inputCurrValid.value}
          variant='greenTransfer'
        >
          <span className={styles.ButtonLabel}>{t("transfer")}</span>
        </Button>
      </div>

      <div className="text-[#B9B9B5] text-[12px] md:text-[10px] my-2 flex justify-center">
        <div className="md:text-[#F8A73E]">
          <span className="font-semibold">*{t("fee_free")}</span>{" "}
          {t("transfers_to_users_by_number_or_IBAN")}.
        </div>
      </div>
    </div>
  );
};

export default UniversalTransferForm;

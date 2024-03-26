import Form from "@/shared/ui/form/Form";
import Modal from "@/shared/ui/modal/Modal";
import { Modal as ModalAnt } from "antd";
import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextArea from "antd/es/input/TextArea";
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
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss";

const UniversalTransferForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useContext(CtxWalletData);
  const { inputCurr, setInputCurr } = useInputState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const { networkTypeSelect, tokenNetworks } = useContext(CtxWalletNetworks);
  const { md } = useBreakpoints();

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

  return !md ? (
    <div className="wrapper">
      <div className="info-box-description mb-4 p-6">
        <div className="row">
          <span className="font-semibold">{t("fee_free")} </span>
          <span>{t("universal_transfer_description")} </span>
          <span className="font-semibold">{t("phone_number_or_IBAN")}</span>
        </div>
      </div>

      <Form>
        <div className="row mb-5 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium text-[16px]">
                  IBAN, phone number, crypto wallet
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  onlyLetters={true}
                  name={"requisite"}
                  value={inputs.requisite}
                  onChange={onInputDefault}
                  placeholder={"Enter requisites"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-8 w-full">
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
                  <span className="text-gray-600 font-medium text-[16px]">
                    {t("amount")}
                  </span>
                }
                onSelect={setInputCurr}
              >
                <InputCurrency
                  onChange={setInputCurr}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                />
              </InputCurrency.PercentSelector>
            </InputCurrency.Validator>
          </div>
        </div>

        <div className="row mb-8 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium text-[16px]">
                  {t("comment_optional")}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col flex items-center">
                <TextArea
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
        </div>
      </Form>

      <Modal
        width={450}
        title={t("transfer_confirmation")}
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <UniversalTransferConfirm
          {...inputs}
          handleCancel={handleCancel}
          amount={inputCurr.value.number}
        />
      </Modal>

      <div className="row w-full">
        <div className="col">
          <Button
            size={"xl"}
            className="w-full self-center"
            onClick={showModal}
            disabled={!isValid || inputCurrValid.value}
          >
            {t("withdraw_title")}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <Form>
        <div className="row mb-8 w-full">
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
                  <span className="text-[#1F3446] text-[12px] font-semibold">
                    {t("amount")}
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
          <div className="flex flex-row justify-between items-center">
            <div className="row min-w-[80px] mb-2 mr-5">
              <div className="col">
                <span className="text-[#1F3446] text-[12px] font-semibold">
                  {t("contact")}:
                </span>
              </div>
            </div>
            <div className="row flex w-full">
              <div className="col basis-[100%]">
                <Input
                  onlyLetters={true}
                  name={"requisite"}
                  value={inputs.requisite}
                  onChange={onInputDefault}
                  placeholder={t("enter_phone_or_IBAN")}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
      <span className="text-[#B9B9B5] text-[10px]">
        <span className="font-bold">*{t("fee_free")}</span>{" "}
        {t("transfers_to_users_by_number_or_IBAN")}.
      </span>

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
            <span className={styles.PayInfoValueFlexTextCurrency}>EUR</span>
            <span className={styles.PayInfoValueFlexTextFee}>
              {currency.$const}
            </span>
          </div>
        </div>
      </div>
      <ModalAnt
        width={450}
        title={
          <span className={styles.MainModalTitle}>
            {t("confirm_transaction")}
          </span>
        }
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UniversalTransferConfirm
          {...inputs}
          handleCancel={handleCancel}
          amount={inputCurr.value.number}
        />
      </ModalAnt>

      <div className={styles.ButtonContainerCenter}>
        <Button
          size={"xl"}
          className="w-full self-center"
          onClick={showModal}
          disabled={!isValid || inputCurrValid.value}
          greenTransfer
        >
          {t("transfer")}
        </Button>
      </div>
      <div className="w-full flex justify-center">
        <span className="text-[#9D9D9D] text-[10px]">
          {t("fee_is_prec")}{" "}
          <span className="font-bold">0 {currency.$const}</span>{" "}
          {t("per_transaction")}
        </span>
      </div>
    </div>
  );
};

export default UniversalTransferForm;

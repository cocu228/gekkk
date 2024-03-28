import Modal from "@/shared/ui/modal/Modal";
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
import Form from "@/shared/ui/form/Form";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import TextArea from "@/shared/ui/input/text-area/TextArea";

const WithdrawFormPhoneNumber = () => {
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
      <Form>
        <div className="row mb-5 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium text-[16px]">
                  {t("phone_number")}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormItem
                  preserve
                  name="phone"
                  label="Phone number"
                  rules={[
                    { required: true, message: "Phone number is required" },
                    { min: 7, message: "Minimum number length is 7 digits" },
                  ]}
                >
                  <Input
                    allowDigits
                    name={"phoneNumber"}
                    onChange={onInputDefault}
                    onInput={onPhoneNumberInput}
                  />
                </FormItem>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-8 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium text-[16px]">{t("comment")}</span>
              </div>
            </div>
            <div className="row">
              <div className="col flex items-center">
                <FormItem
                  preserve
                  name="comment"
                  className="w-full"
                  label={t("comment")}
                  rules={[{ required: true, message: "Comment is required" }]}
                >
                  <TextArea
                    allowDigits
                    allowSymbols
                    value={inputs.comment}
                    name={"comment"}
                    onChange={onInputDefault}
                    placeholder={""}
                    style={{
                      minHeight: 100,
                    }}
                  />
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </Form>
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
            ]}
          >
            <InputCurrency.PercentSelector
              currency={currency}
              header={
                <span className="text-gray-600 font-medium">{t("amount")}</span>
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

      <Modal
        width={450}
        title={t("transfer_confirmation")}
        onCancel={handleCancel}
        open={isModalOpen}
      >
        <WithdrawConfirmPhoneNumber
          {...inputs}
          amount={inputCurr.value.number}
          handleCancel={handleCancel}
        />
      </Modal>

      <div className="row w-full">
        <div className="col">
          <Button
            size={"xl"}
            className="w-full"
            onClick={showModal}
            disabled={!isValid || inputCurrValid.value}
          >
            {t("withdraw_title")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFormPhoneNumber;

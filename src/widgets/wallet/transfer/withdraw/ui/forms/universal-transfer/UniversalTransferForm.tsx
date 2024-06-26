import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import { useContext, useEffect, useState } from "react";
import UniversalTransferConfirm from "./UniversalTransferConfirm";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import {Modal} from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

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
    <div className="bg-[white] rounded-[8px] p-[20px_10px_5px] flex flex-col md:gap-[10px] gap-[15px]">
      {/* Amount Start */}
      <div className="w-full">
        <AmountInput
          value={inputCurr.value.number}
          description={getWithdrawDesc(min_withdraw, currency.$const)}
          currency={currency}
          placeholder={t("exchange.enter_amount")}
          inputValue={inputCurr.value.string}
          validators={[
            validateBalance(currency, navigate, t),
            validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
            validateMaximumAmount(max_withdraw, inputCurr.value.number, currency.$const, t)
          ]}
          onError={setInputCurrValid}
          onSelect={setInputCurr}
          onChange={setInputCurr}
        />
      </div>
      {/* Amount End */}

      {/* Contact Start */}
      <div className="w-full">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
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
      {/* Contact End */}

      {/* Description Start */}
      <div className="w-full">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
          {t('description')}:
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
      {/* Description End */}

      {/* Commissions Start */}
      <div className="w-full flex justify-center">
        <Commissions
          youWillPay={inputCurr.value.number}
          youWillGet={inputCurr.value.number}
          fee={"-"}
        />
      </div>
      {/* Commissions End */}

      {/* Transfer Button Start */}
      <div className="w-full flex justify-center">
        <Button
          size="lg"
          className="w-full md:text-fs14 text-fs16"
          onClick={showModal}
          disabled={!isValid || inputCurrValid.value}
        >
          {t("transfer")}
        </Button>
      </div>
      {/* Transfer Button End */}

      {/* Transaction Information Start */}
      <div className={"w-full md:flex hidden justify-center"}>
          <span className={"text-[var(--gek-mid-grey)] md:text-fs12 text-fs14"}>
            {t('fee_is')}&nbsp;
            <span className="uppercase font-bold"> 0 EURG</span>&nbsp;
            {t("per_transaction")}
          </span>
      </div>
      {/* Transaction Information End */}

      {/* Confirm Start */}
      <Modal
        placeBottom={md}
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
      {/* Confirm End */}
    </div>
  );
};

export default UniversalTransferForm;

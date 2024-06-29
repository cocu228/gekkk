import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {useContext, useEffect, useState} from "react";
import CrossProjectConfirm from "./CrossProjectConfirm";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {Modal} from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";

const CrossProjectForm = () => {
  // Context
  const currency = useContext(CtxWalletData);
  const { networkTypeSelect, tokenNetworks } = useContext(CtxWalletNetworks);

  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { inputCurr, setInputCurr } = useInputState();
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const [inputs, setInputs] = useState<{ comment: string; }>({
    comment: "",
  });

  // Handlers
  const {
    network_type,
    min_withdraw = 0,
    max_withdraw = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const onInputDefault = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  // Effects
  useEffect(() => {
    setIsValid(inputCurr.value.string?.length > 0);
  }, [inputs, inputCurr.value]);

  return (
    <div className="bg-[white] rounded-[8px] md:p-[20px_10px_5px] p-[20px_0px_5px] flex flex-col md:gap-[10px] gap-[15px]">
      {/* Amount Start */}
      <div className="w-full">
        <AmountInput
          value={inputCurr.value.number}
          description={getWithdrawDesc(min_withdraw, currency.$const, t('minimum_amount'))}
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

      {/* Desc Optional Start */}
      <div className="w-full">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px] mb-[3px] block">
          {t('desc_optional')}:
        </span>
        <Input
          className="h-[32px]"
          allowDigits
          allowSymbols
          name={"comment"}
          value={inputs.comment}
          onChange={onInputDefault}
          placeholder={t("description")}
        />
      </div>
      {/* Contact End */}

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

      {/* Confirm Start */}
      <Modal
        destroyOnClose
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        title={t("confirm_transaction")}
      >
        <CrossProjectConfirm
          {...inputs}
          networkType={network_type}
          handleCancel={handleCancel}
          amount={inputCurr.value.number}
        />
      </Modal>
      {/* Confirm End */}
    </div>
  );
};

export default CrossProjectForm;

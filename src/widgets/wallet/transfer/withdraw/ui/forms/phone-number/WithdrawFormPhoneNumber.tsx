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
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { validateBalance, validateMinimumAmount, } from "@/shared/config/validators";
import { CtxFeeNetworks, CtxWalletData, CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {Modal} from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import {debounce, formatAsNumber} from "@/shared/lib";
import {CtxRootData} from "@/processes/RootContext";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";
import FeeInformation from "@/widgets/wallet/transfer/components/fee-information";

const WithdrawFormPhoneNumber = () => {
  // Context
  const {uasToken, getUasToken} = useContext(UasConfirmCtx);
  const currency = useContext(CtxWalletData);
  const {account} = useContext(CtxRootData);
  const { networkTypeSelect, tokenNetworks, } = useContext(CtxWalletNetworks);
  const { localErrorInfoBox, localErrorClear, setBankRefresh } = useContext(CtxFeeNetworks);

  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { inputCurr, setInputCurr } = useInputState();
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { onInput: onPhoneNumberInput } = useMask(MASK_PHONE);
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
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

  // Handlers
  const {
    min_withdraw = 0,
    withdraw_fee = 0,
    percent_fee = 0,
    token_symbol
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const onInput = ({ target }) => {
    setDetails((prev) => ({
      ...prev,
      [target.name]: target.name === "phoneNumber" ? formatAsNumber(target.value) : target.value
    }));
  };

  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);
  const delayRes = useCallback(debounce(setBankRefresh, 2500), []);

  const handleConfirm = async () => {
    if(!uasToken) {
      await getUasToken()
      showModal()
    } else {
      showModal()
    }
  }
  // Effects
  useEffect(() => {
    localErrorClear();
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

  // Helpers
  const isFieldsFill = Object.values(details).every((v) => v !== null && v !== "");
  const isTransferDisabled = !!localErrorInfoBox || loading || !isValid || inputCurrValid.value || !isFieldsFill;
  const youWillPay = inputCurr.value.number + withdraw_fee;
  const youWillGet = inputCurr.value.number;
  const fee = withdraw_fee;

  return (
    <div className="bg-[white] rounded-[8px] p-[20px_10px_5px] flex flex-col md:gap-[10px] gap-[15px]">
      {/* Amount Start */}
      <div className="w-full">
        <AmountInput
          transfers
          value={inputCurr.value.number}
          description={getWithdrawDesc(min_withdraw, currency.$const)}
          placeholder={t("exchange.enter_amount")}
          inputValue={inputCurr.value.string}
          currency={currency}
          validators={[
            validateBalance(currency, navigate, t),
            validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)
          ]}
          onError={setInputCurrValid}
          onSelect={setInputCurr}
          onChange={setInputCurr}
        />
      </div>
      {/* Amount End */}

      {/* To Card Start */}
      <div className="w-full flex flex-col gap-[3px]">
          <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
            {t("phone_number")}:
          </span>
        <Input
          allowDigits
          allowSymbols
          name={"phoneNumber"}
          placeholder={t("auth.enter_phone_number")}
          onChange={onInput}
          value={details.phoneNumber}
          onInput={onPhoneNumberInput}
        />
      </div>
      {/* To Card End */}

      {/* Description Start */}
      <div className="w-full flex flex-col gap-[3px]">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
          {t("description")}:
        </span>
        <Input
          allowDigits
          allowSymbols
          name={"purpose"}
          value={details.purpose}
          onChange={onInput}
          placeholder={t("enter_description")}
        />
      </div>
      {/* Description End */}

      {/* Commissions Start */}
      <div className='w-full flex justify-center'>
        <Commissions
          isLoading={loading}
          youWillPay={youWillPay}
          youWillGet={youWillGet}
          fee={fee}
        />
      </div>
      {/* Commissions End */}

      {/* Transfer Error Start */}
      {localErrorInfoBox}
      {/* Transfer Error Start */}

      {/* Transfer Button Start */}
      <div className="w-full flex justify-center">
        <Button
          size="lg"
          onClick={handleConfirm}
          className="w-full md:text-fs14 text-fs16"
          disabled={isTransferDisabled}
        >
          {t("transfer")}
        </Button>
      </div>
      {/* Transfer Button End */}

      {/* Transaction Information Start */}
      <FeeInformation percent={percent_fee} withdraw={withdraw_fee} coin={token_symbol}>
        {({ fee }) => (
          <>
            {t("fee_is_prec")}&nbsp;
            <span className={"font-semibold"}>{fee}</span>&nbsp;
            {t("per_transaction")}
          </>
        )}
      </FeeInformation>
      {/* Transaction Information End */}

      {/* Confirm Start */}
      <Modal isModalOpen={isModalOpen} title={t("confirm_transaction")} onCancel={handleCancel}>
        <WithdrawConfirmPhoneNumber
          youWillPay={youWillPay}
          youWillGet={youWillGet}
          fee={fee}
          details={details}
          handleCancel={handleCancel}
        />
      </Modal>
      {/* Confirm End */}
    </div>
  );
};

export default WithdrawFormPhoneNumber;

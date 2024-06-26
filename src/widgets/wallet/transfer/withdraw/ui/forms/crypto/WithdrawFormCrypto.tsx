import { useCallback, useContext, useEffect, useState } from "react";
import Input from "@/shared/ui/input/Input";
import { Modal } from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {isDisabledBtnWithdraw} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import Decimal from "decimal.js";
import {getWithdrawDesc} from "../../../model/entitys";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate } from "react-router-dom";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {debounce} from "@/shared/lib";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";
import QRCodeModal from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/ui/qr-code-modal";

export interface IWithdrawFormCryptoState {
  address: null | string;
  recipient: null | string;
  description: null | string;
}

const WithdrawFormCrypto = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const qrCodeModal = useModal();
  const { md } = useBreakpoints();
  const currency = useContext(CtxWalletData);
  const [loading, setLoading] = useState(false);
  const { inputCurr, setInputCurr } = useInputState();
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const {
    setRefresh,
    tokenNetworks,
    localErrorClear,
    networkTypeSelect,
    localErrorInfoBox
  } = useContext(CtxWalletNetworks);


  const [inputs, setInputs] = useState<IWithdrawFormCryptoState>({
    address: null,
    recipient: null,
    description: null,
  });

  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);
  const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);

  const {
    percent_fee = 0,
    withdraw_fee = 0,
    min_withdraw = 0,
    max_withdraw = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const onInput = ({ target }) => {
    if (!!localErrorInfoBox) {
      localErrorClear();
    }

    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    setLoading(true);
    delayRes(inputCurr.value.number);
    delayDisplay();
  }, [inputCurr.value.number]);

  return (
    <div className="wrapper flex flex-col md:gap-[10px] gap-[15px]">
      {/* Amount Start */}
      <div className="w-full">
        <AmountInput
          name="amount"
          value={new Decimal(inputCurr.value.number).plus(withdraw_fee).toNumber()}
          description={getWithdrawDesc(min_withdraw, currency.$const)}
          placeholder={t("exchange.enter_amount")}
          inputValue={inputCurr.value.string}
          currency={currency}
          validators={[
            validateBalance(currency, navigate, t),
            validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
            validateMaximumAmount(max_withdraw, inputCurr.value.number, currency.$const, t),
          ]}
          onError={setInputCurrValid}
          onSelect={setInputCurr}
          onChange={(val) => {
            if (!!localErrorInfoBox) {
              localErrorClear();
            }

            setInputCurr(val);
          }}
        />
      </div>
      {/* Amount End */}

      {/* Address Start */}
      <div className="w-full flex flex-col gap-[3px]">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
          {t("address")}:
        </span>
        <div className="flex">
          <Input
            allowDigits
            allowSymbols
            value={inputs.address}
            onChange={onInput}
            disabled={!networkTypeSelect}
            placeholder={t("enter_withdrawal_address")}
            name={"address"}
          />
          <div className="pl-2 -md:pt-2.5" onClick={qrCodeModal.showModal}>
            <IconApp className="cursor-pointer" color="var(--gek-green)" size={md ? 30 : 40} code="t81" />
          </div>
        </div>
        <QRCodeModal
          isOpen={qrCodeModal.isModalOpen}
          onCancel={qrCodeModal.handleCancel}
          onSuccess={(value: string) => {
            setInputs(prev => ({
              ...prev,
              address: value
            }));

            qrCodeModal.handleCancel();
          }}
        />
      </div>
      {/* Address End */}

      {/* Recipient Start */}
      <div className="w-full flex flex-col gap-[3px]">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
          {t("recipient")}:
        </span>
        <Input
          value={inputs.recipient}
          onChange={onInput}
          disabled={!networkTypeSelect}
          name={"recipient"}
          placeholder={t("enter_recepients_name")}
          caption={t("EW_law")}
        />
      </div>
      {/* Recipient End */}

      {/* Desc Optional Start */}
      <div className="w-full flex flex-col gap-[3px]">
        <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
          {t("desc_optional")}:
        </span>
        <Input
          allowDigits
          allowSymbols
          placeholder={t('enter_description')}
          name={"description"}
          value={inputs.description}
          onChange={onInput}
          disabled={!networkTypeSelect}
        />
      </div>
      {/* Desc Optional End */}

      {/* Commissions Start */}
      <div className='w-full flex justify-center'>
        <Commissions
          isLoading={loading}
          youWillPay={inputCurr.value.number + withdraw_fee}
          youWillGet={inputCurr.value.number}
          fee={withdraw_fee}
        />
      </div>
      {/* Commissions End */}

      {/* Transfer Button Start */}
      <div className="w-full flex justify-center">
        <Button
          size="lg"
          onClick={showModal}
          className="w-full md:text-fs14 text-fs16"
          disabled={isDisabledBtnWithdraw(inputs) || inputCurrValid.value || loading}
        >
          {t("transfer")}
        </Button>
      </div>
      {/* Transfer Button End */}

      {/* Transaction Information Start */}
      {md && (percent_fee > 0 || withdraw_fee > 0) && (
        <div className={"w-full md:flex hidden justify-center"}>
          <span className={"text-[var(--gek-mid-grey)] md:text-fs12 text-fs14"}>
            {t("fee_is_prec")}&nbsp;
            <span className={"font-semibold"}>
              {withdraw_fee === 0 ? `${percent_fee}%` : withdraw_fee}
            </span>&nbsp;
            {t("per_transaction")}
          </span>
        </div>
      )}
      {/* Transaction Information End */}

      {/* Confirm Start */}
      <Modal
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        title={t("confirm_transaction")}
      >
        <WithdrawConfirmCrypto
          {...inputs}
          handleCancel={handleCancel}
          amount={inputCurr.value.number}
        />
      </Modal>
      {/* Confirm End */}
    </div>
  );
};

export default WithdrawFormCrypto;

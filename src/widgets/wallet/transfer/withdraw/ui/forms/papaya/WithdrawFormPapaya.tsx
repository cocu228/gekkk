import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";
import { CtxRootData } from "@/processes/RootContext";
import UseModal from "@/shared/model/hooks/useModal";
import { debounce } from "@/shared/lib/helpers";
import { AccountRights } from "@/shared/config/mask-account-rights";
import { validateBalance, validateMinimumAmount } from "@/shared/config/validators";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { CtxWalletData, CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import { Modal } from "@/shared/ui/modal/Modal";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";
import FeeInformation from "@/widgets/wallet/transfer/components/fee-information";

import styles from "../styles.module.scss";

const WithdrawFormPapaya = () => {
  // Context
  const { account } = useContext(CtxRootData);
  const currency = useContext(CtxWalletData);
  const { tokenNetworks, networkTypeSelect, setRefresh, localErrorClear, localErrorInfoBox } =
    useContext(CtxWalletNetworks);
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { inputCurr, setInputCurr } = useInputState();
  const { isModalOpen, showModal, handleCancel } = UseModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();

  // Handlers
  const delayDisplay = useCallback(
    debounce(() => setLoading(false), 2700),
    []
  );
  const delayRes = useCallback(
    debounce(amount => setRefresh(true, amount), 2000),
    []
  );

  const { min_withdraw = 0, withdraw_fee = 0 } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  // Effects
  useEffect(() => {
    localErrorClear();
    setLoading(true);
    delayRes(inputCurr.value.number);
    delayDisplay();
  }, [inputCurr.value.number]);

  return (
    <div className='bg-[white] rounded-[8px] md:p-[20px_10px_5px] p-[0px_0px_5px] flex flex-col md:gap-[10px] gap-[15px]'>
      {/* Amount Start */}
      <div className='w-full'>
        <AmountInput
          placeholder={t("exchange.enter_amount")}
          value={inputCurr.value.number}
          inputValue={inputCurr.value.string}
          currency={currency}
          description={getWithdrawDesc(min_withdraw, currency.$const, t("minimum_amount"))}
          validators={[
            validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
            validateBalance(currency, navigate, t)
          ]}
          onError={setInputCurrValid}
          onSelect={val => {
            setInputCurr(val.toString());
          }}
          onChange={setInputCurr}
        />
      </div>
      {/* Amount End */}

      {/* Information Start */}
      <div className='w-full'>
        <div className={styles.EURCost}>
          <div className='col'>
            <span className={styles.EURCostValue}>1 EUR = 1 EURG*</span>
          </div>

          <div className={styles.EURCostInfo}>
            <span className={styles.EURCostInfoText}>
              <b className={styles.EURCostInfoTextUppercase}>*{t("note")}</b>:{" "}
              {t("withdraw_fee", { to: "Papaya IBAN" })} <b className={styles.EURCostInfoTextUppercase}>1,5%</b>
              {account.rights[AccountRights.IsJuridical] ? null : (
                <span>
                  {" "}
                  {t("if_you")}{" "}
                  <span
                    className={styles.EURCostInfoTextLink}
                    onClick={() => navigate("/wallet?currency=GKE&tab=no_fee_program")}
                  >
                    {t("freeze_GKE_tokens")}
                  </span>{" "}
                  {t("fee_is")} <b>0%</b>.
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      {/* Information End */}

      {/* Commissions Start */}
      <div className='w-full flex justify-center'>
        <Commissions
          isLoading={loading}
          youWillPay={inputCurr.value.number}
          youWillGet={inputCurr.value.number - withdraw_fee}
          fee={withdraw_fee}
          youWillGetCoin={"EUR"}
        />
      </div>
      {/* Commissions End */}

      {/* Transfer Error Start */}
      {localErrorInfoBox}
      {/* Transfer Error Start */}

      {/* Transfer Button Start */}
      <div className='w-full flex justify-center'>
        <Button
          size='lg'
          className='w-full md:text-fs14 text-fs16'
          onClick={showModal}
          disabled={!inputCurr.value.number || inputCurrValid.value || loading}
        >
          {t("transfer")}
        </Button>
      </div>
      {/* Transfer Button End */}

      {/* Transaction Information Start */}
      <FeeInformation />
      {/* Transaction Information End */}

      {/* Confirm Start */}
      <Modal
        placeBottom={window.innerWidth < 768}
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        title={t("confirm_transaction")}
      >
        <WithdrawConfirmCrypto
          description={""}
          address={account.number}
          recipient={account.name}
          handleCancel={handleCancel}
          amount={inputCurr.value.number - withdraw_fee}
        />
      </Modal>
      {/* Confirm End */}
    </div>
  );
};

export default WithdrawFormPapaya;

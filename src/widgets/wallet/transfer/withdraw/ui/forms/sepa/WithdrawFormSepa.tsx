import { useCallback, useContext, useEffect, useState } from "react";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import WithdrawConfirmSepa from "./WithdrawConfirmSepa";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import {getInitialProps, useTranslation} from "react-i18next";
import styles from "../styles.module.scss"
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import {Modal} from "@/shared/ui/modal/Modal";
import { Select } from '@/shared/ui/oldVersions/Select';
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import { debounce } from "@/shared/lib";
import { PaymentDetails } from "@/shared/(orval)api/gek/model";
import { CtxRootData } from "@/processes/RootContext";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";

const WithdrawFormSepa = () => {
  const {t} = useTranslation();
  const {md} = useBreakpoints();
  const navigate = useNavigate();
  const currency = useContext(CtxWalletData);
  const {initialLanguage} = getInitialProps();
  const {account} = useContext(CtxRootData);
  const {inputCurr, setInputCurr} = useInputState();
  const {isModalOpen, showModal, handleCancel} = useModal();
  const {uasToken, getUasToken} = useContext(UasConfirmCtx)
  const {inputCurrValid, setInputCurrValid} = useInputValidateState();
  const {
    networkTypeSelect,
    tokenNetworks,
    localErrorInfoBox,
    setBankRefresh
  } = useContext(CtxWalletNetworks);
  const {
    min_withdraw = 0,
    withdraw_fee = 0
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const [loading, setLoading] = useState<boolean>(false);
  const [transferDescriptionsTranslated, setTransferDescriptionsTranslated] = useState(null);

  const [details, setDetails] = useState<PaymentDetails>({
    purpose: null,
    iban: null,
    beneficiaryName: null,
    account: account.account_id,
    amount: {
      sum: {
        currency: {
          code: currency.$const,
        },
      },
    },
  })

  const onInput = ({ target }) => {
    setDetails((prev) => ({ ...prev, [target.name]: target.value }))
  };

  const handleOnPurpose = (val: string) => {
    setDetails(prev => ({ ...prev, purpose: val }))
  }

  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), [],);
  const delayRes = useCallback(
    debounce((details: PaymentDetails) => {
      setBankRefresh(details);
      }, 2500),
    []);

  useEffect(() => {
    if (!Object.values(details).some((val) => !val) && inputCurr.value.number) {
      setLoading(true);
      delayRes(details);
      delayDisplay();
    }
  }, [inputCurr.value.number, details]);

  useEffect(() => {
    setTransferDescriptionsTranslated(
      transferDescriptions.map((el) => {
        return {
          value: el.value,
          label: t(el.value.toLocaleLowerCase()),
        };
      }),
    );
  }, [initialLanguage]);

  useEffect(() => {
    if (inputCurr.value.number) {
      setDetails(prev => ({...prev, amount: { sum: { currency: prev.amount.sum.currency, value: inputCurr.value.number } }}))
    }
  }, [inputCurr.value.number]);

  const handleConfirm = async () => {
    if(!uasToken) {
        await getUasToken()
        showModal()
    } else {
        showModal() 
    }
  };

  const isFieldsFill = Object.values(details).every((v) => v !== null && v !== "")
  const isTransferDisabled = !!localErrorInfoBox || loading || !isFieldsFill || inputCurrValid.value;

  return (
    <div className="wrapper">
      {/* Amount Start */}
      <div className="w-full md:mb-[5px] mb-[10px]">
        <AmountInput
          transfers={md}
          value={inputCurr.value.number}
          description={getWithdrawDesc(min_withdraw, currency.$const)}
          currency={currency}
          placeholder={t("exchange.enter_amount")}
          textClassname={`${styles.TitleColText} ml-[7px]`}
          inputValue={inputCurr.value.string}
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

      {/* IBAN Start */}
      <div className="w-full md:mb-[10px] mb-[15px]">
        <div className="mb-[3px]">
          <span className={`${styles.TitleColText} ml-[7px]`}>IBAN:</span>
        </div>
        <Input
          name={"iban"}
          onChange={onInput}
          value={details.iban}
          allowDigits
          placeholder={t("enter_account_number_or_IBAN")}
        />
      </div>
      {/* IBAN End */}

      {/*  Recipient Start */}
      <div className="w-full md:mb-[5px] mb-[10px]">
        <div className="mb-[3px]">
          <span className={`${styles.TitleColText} ml-[7px]`}>
            {t("recipient")}:
          </span>
        </div>
        <Input
          onChange={onInput}
          name={"beneficiaryName"}
          value={details.beneficiaryName}
          placeholder={t("enter_recipient_name")}
          caption={!details.beneficiaryName && t("EW_law")}
        />
      </div>
      {/* Recipient End */}

      {/* Description Start */}
      <div className="w-full md:mb-[10px] mb-[15px]">
        <div className="mb-[3px]">
          <span className={`${styles.TitleColText} ml-[7px]`}>
            {t("description")}:
          </span>
        </div>
        <Select
          value={details.purpose || ""}
          listHeight={170}
          options={transferDescriptionsTranslated}
          placeholder={`-${t("enter_description")}-`}
          onChange={handleOnPurpose}
        />
      </div>
      {/* Description End */}

      {/* Commissions Start */}
      <div className="w-full flex justify-center md:mb-[10px] mb-[15px]">
        <Commissions
          isLoading={loading}
          youWillPay={inputCurr.value.number}
          youWillGet={inputCurr.value.number - withdraw_fee}
          fee={withdraw_fee}
        />
      </div>
      {/* Commissions End */}

      {/* Transfer Error Start */}
      {localErrorInfoBox ? <div className="w-full md:mb-[10px] mb-[15px]">{localErrorInfoBox}</div> : null}
      {/* Transfer Error Start */}

      {/* Transfer Button Start */}
      <div className="w-full flex justify-center md:mb-[10px] mb-[15px]">
        <Button
          size="lg"
          onClick={handleConfirm}
          className={"w-full md:text-fs14 text-fs16"}
          disabled={isTransferDisabled}
        >
          <span className={styles.ButtonLabel}>{t("transfer")}</span>
        </Button>
      </div>
      {/* Transfer Button End */}

      {/* Transaction Information Start */}
      <div className={"w-full md:flex hidden justify-center"}>
          <span className={"text-[var(--gek-mid-grey)] md:text-fs12 text-fs14"}>
            {t("fee_is_prec")}{" "}
            <span className={"font-bold"}>
              {withdraw_fee} EURG
            </span>{" "}
            {t("per_transaction")}
          </span>
      </div>
      {/* Transaction Information End */}

      {/* Confirm Start */}
      <Modal
        destroyOnClose
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        title={t("confirm_transaction")}
      >
        <WithdrawConfirmSepa
          details={details}
          handleCancel={handleCancel}
        />
      </Modal>
      {/* Confirm End */}
    </div>
  );
};

export default WithdrawFormSepa;

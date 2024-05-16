import { useCallback, useContext, useEffect, useState } from "react";
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {
  validateBalance,
  validateMaximumAmount,
  validateMinimumAmount,
} from "@/shared/config/validators";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import {
  getFinalFee,
  isDisabledBtnWithdraw,
} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {
  CtxWalletNetworks,
  CtxWalletData,
} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCrypto from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawConfirmCrypto";
import Decimal from "decimal.js";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { debounce } from "@/shared/lib";
import styles from "../styles.module.scss";
import TextArea from "@/shared/ui/input/text-area/TextArea";
import QrcodeScanner from "@/shared/ui/qrcode-scanner/QrcodeScanner";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";
import { IconApp } from "@/shared/ui/icons/icon-app";

export interface IWithdrawFormCryptoState {
  address: null | string;
  recipient: null | string;
  description: null | string;
}
const WithdrawFormCrypto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const qrCodeModal = useModal();
  const { md } = useBreakpoints();
  const currency = useContext(CtxWalletData);
  const [loading, setLoading] = useState(false);
  const { inputCurr, setInputCurr } = useInputState();
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const { networkTypeSelect, tokenNetworks, setRefresh } = useContext(CtxWalletNetworks);

  const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);
  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);

  const [inputs, setInputs] = useState<IWithdrawFormCryptoState>({
    address: null,
    recipient: null,
    description: null,
  });

  const {
    min_withdraw = 0,
    max_withdraw = 0,
    percent_fee = 0,
    withdraw_fee = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);

  const finalFee = finalFeeEntity.value.number;

  const onInput = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    setLoading(true);
    delayRes(inputCurr.value.number);
    delayDisplay();
  }, [inputCurr.value.number]);

  return Array.isArray(tokenNetworks) && tokenNetworks.length > 0 && (
    <div className="flex flex-col items-center mt-2">
      <div className="flex flex-col gap-4 text-gray-400 w-full text-left">
        <div className="flex flex-col gap-2">
          <InputCurrency.Validator
            value={new Decimal(inputCurr.value.number)
              .plus(finalFee)
              .toNumber()}
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
              header={<span className={styles.TitleColText}>{t("amount")}:</span>}
              onSelect={setInputCurr}
            >
              <InputCurrency.DisplayBalance currency={currency}>
                <InputCurrency
                  transfers={md}
                  name={"amount"}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                  onChange={setInputCurr}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>

        <div className="flex flex-col gap-[3px]">
          <span className={styles.TitleColText}>{t("address")}:</span>
          <Input
            tranfers={md}
            bordered={!md}
            allowDigits
            allowSymbols
            value={inputs.address}
            onChange={onInput}
            disabled={!networkTypeSelect}
            placeholder={t("enter_withdrawal_address")}
            name={"address"}
            suffix={<div onClick={qrCodeModal.showModal}>
              <IconApp size={25} color="#1F3446" code='t34' />
            </div>}
          />
        </div>

        <Modal
          open={qrCodeModal.isModalOpen}
          onCancel={qrCodeModal.handleCancel}
          padding
        >
          <QrcodeScanner
            onSuccess={(value: string) => {
              setInputs(prev => ({
                ...prev,
                address: value
              }));

              qrCodeModal.handleCancel();
            }}
          />
        </Modal>

        <div className="flex flex-col gap-[3px]">
          <span className={styles.TitleColText}>
            {t("recipient")}:
          </span>
          <Input
            tranfers={md}
            bordered={!md}
            value={inputs.recipient}
            onChange={onInput}
            disabled={!networkTypeSelect}
            name={"recipient"}
            placeholder={t("enter_recepients_name")}
          />

          <span className="text-gray-400 text-[var(--gek-orange)] text-[12px] md:text-[10px]">
            {!inputs.recipient && t("EW_law")}
          </span>
        </div>

        <div className="flex flex-col gap-[3px]">
          <span className={styles.TitleColText}>
            {t("desc_optional")}:
          </span>
          {md ?
            <Input
              tranfers={md}
              bordered={!md}
              allowDigits
              allowSymbols
              placeholder={t('enter_description')}
              name={"description"}
              value={inputs.description}
              onChange={onInput}
              disabled={!networkTypeSelect}
            />
          :
            <TextArea
              allowDigits
              allowSymbols
              placeholder={t('enter_description')}
              name={"description"}
              value={inputs.description}
              onChange={onInput}
              disabled={!networkTypeSelect}
            />

          }
        </div>

        <div className={styles.PayInfo}>
          <div className={styles.PayInfoCol}>
            <div className="row">
              <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
            </div>
            <div className="row">
              <span className={styles.PayInfoText}>
                {t("you_will_get")}:
              </span>
            </div>
            <div className="row">
              <span className={styles.PayInfoTextFee}>
                {t( "fee")}:
              </span>
            </div>
          </div>
          <div className={styles.PayInfoColValue}>

            <div className={styles.PayInfoCol}>
              <div className={styles.PayInfoValueFlex}>
                <span
                  className={styles.PayInfoValueFlexText}>{inputCurr.value.number + withdraw_fee}</span>
              </div>
              <div className={styles.PayInfoValueFlex}>
                {loading ? t("loading") + "..." : <span
                  className={styles.PayInfoValueFlexText}>{inputCurr.value.number}</span>}
              </div>
              <div className={styles.PayInfoValueFlex}>
                {loading ? t("loading") + "..." : <span
                  className={styles.PayInfoValueFlexTextFee}>{withdraw_fee}</span>}
              </div>
            </div>

            <div className={styles.PayInfoCol}>
              <span className={styles.PayInfoValueFlexTextCurrency}>
                {currency.$const}
              </span>
              <span className={styles.PayInfoValueFlexTextCurrency}>
              {currency.$const}
              </span>
              <span className={styles.PayInfoValueFlexTextFee}>
                {currency.$const}
              </span>
            </div>
          </div>
        </div>

        <Modal
          width={450}
          closable={false}
          title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
          destroyOnClose
          onCancel={handleCancel}
          open={isModalOpen}
        >
          <WithdrawConfirmCrypto
            {...inputs}
            amount={inputCurr.value.number}
            handleCancel={handleCancel}
          />
        </Modal>

        <div className={styles.Button + 'mb-0'}>
            <div className={styles.ButtonContainerCenter}>
                <Button
                    size="lg"
                    className={'w-full'}
                    onClick={showModal}
                    disabled={isDisabledBtnWithdraw(inputs) || inputCurrValid.value}
                >
                    {t("transfer")}
                </Button>
            </div>
        </div>
      </div>

      {md && (percent_fee > 0 || withdraw_fee > 0) && (
        <div className={styles.BottomFeeInfo + ' mb-2'}>
          <span className={styles.BottomFeeInfoText}>
            {t("fee_is_prec")} <span className={styles.BottomFeeInfoTextBold}>
              {withdraw_fee === 0
                ? `${percent_fee}%`
                : withdraw_fee
              }</span> {t("per_transaction")}
          </span>
        </div>
      )}
    </div>
  );
};

export default WithdrawFormCrypto;

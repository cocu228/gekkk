import { useContext, useState } from "react";
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import { Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
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
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss";
import TextArea from "@/shared/ui/input/text-area/TextArea";
import QrcodeScanner from "@/shared/ui/qrcode-scanner/QrcodeScanner";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

import style from './styles.module.scss'
import InputCurrency from "@/shared/ui/input-currency/ui";
import { PriceInfo } from "./components/PriceInfo";
import Decimal from "decimal.js";
import { getWithdrawDesc } from "../../../model/entitys";
import {
  validateBalance,
  validateMaximumAmount,
  validateMinimumAmount,
} from "@/shared/config/validators";
import { useNavigate } from "react-router-dom";
import { IconApp } from "@/shared/ui/icons/icon-app";

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
  const { inputCurr, setInputCurr } = useInputState();
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();
  const { networkTypeSelect, tokenNetworks } = useContext(CtxWalletNetworks);

  const [inputs, setInputs] = useState<IWithdrawFormCryptoState>({
    address: null,
    recipient: null,
    description: null,
  });

  const {
    percent_fee = 0,
    withdraw_fee = 0,
    min_withdraw = 0,
    max_withdraw = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const onInput = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const finalFee = getFinalFee(withdraw_fee, percent_fee).value.number;

  return tokenNetworks.length > 0 && (
    <div className={style.FormWrap}>
      <div className={style.FormContainer}>
        <div className={style.FormBlock}>
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
                  name={"amount"}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                  onChange={setInputCurr}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>
        <div className={style.InpBlock}>
            <span className={style.TitleColText}>{t('address')}:</span>
            <Input
            allowDigits
            allowSymbols
            value={inputs.address}
            onChange={onInput}
            disabled={!networkTypeSelect}
            placeholder={t("enter_withdrawal_address")}
            name={"address"}
            suffix={<div onClick={qrCodeModal.showModal}>
              <IconApp className="cursor-pointer" size={25} color="#1F3446" code='t34' />
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
        <div className={style.InpBlock}>
            <span className={style.TitleColText}>{t("recipient")}:</span>
            <Input
              value={inputs.recipient}
              onChange={onInput}
              disabled={!networkTypeSelect}
              name={"recipient"}
              placeholder={t("enter_recepients_name")}
            />

          <span className={style.LawText}>
            {!inputs.recipient && t("EW_law")}
          </span>
        </div>   

        <div className={style.InpBlock}>
            <span className={style.TitleColText}>{t("desc_optional")}:</span>
            <TextArea
              allowDigits
              allowSymbols
              placeholder={t('enter_description')}
              name={"description"}
              value={inputs.description}
              onChange={onInput}
              disabled={!networkTypeSelect}
            />
        </div>   
        <PriceInfo
          withdraw_fee={withdraw_fee}
          currencyTitle={currency.$const}
          amount={inputCurr.value.number}
        />

        <ModalUi
          placeBottom
          destroyOnClose
          isModalOpen={isModalOpen}
          onCancel={handleCancel}
          // title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
          title={t("confirm_transaction")}
        >
          <WithdrawConfirmCrypto
            {...inputs}
            handleCancel={handleCancel}
            amount={inputCurr.value.number}
          />
        </ModalUi>

        {/* <Modal
          width={450}
          destroyOnClose
          closable={false}
          open={isModalOpen}
          onCancel={handleCancel}
          title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
        >
          <WithdrawConfirmCrypto
            {...inputs}
            handleCancel={handleCancel}
            amount={inputCurr.value.number}
          />
        </Modal> */}

        <div className={styles.Button + 'mb-0'}>
            <div className={styles.ButtonContainerCenter}>
                <Button
                    size="lg"
                    onClick={showModal}
                    className={'w-full'}
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
              }
              </span> {t("per_transaction")}
          </span>
        </div>
      )}
    </div>
  );
};

export default WithdrawFormCrypto;

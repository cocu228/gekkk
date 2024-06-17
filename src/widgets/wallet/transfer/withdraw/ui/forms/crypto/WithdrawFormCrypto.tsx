import { useCallback, useContext, useEffect, useState } from "react";
import Input from "@/shared/ui/input/Input";
import { Modal } from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import {
  isDisabledBtnWithdraw,
  reponseOfUpdatingTokensNetworks,
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
import QrcodeScanner from "@/shared/ui/qrcode-scanner/QrcodeScanner";
import style from './styles.module.scss'
import InputCurrency from "@/shared/ui/input-currency/ui";
import Decimal from "decimal.js";
import { getWithdrawDesc } from "../../../model/entitys";
import {
  validateBalance,
  validateMaximumAmount,
  validateMinimumAmount,
} from "@/shared/config/validators";
import { useNavigate } from "react-router-dom";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { debounce } from "@/shared/lib";
import useError from "@/shared/model/hooks/useError";

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
  const { networkTypeSelect, tokenNetworks, setRefresh } = useContext(CtxWalletNetworks);
  const [localErrorHunter, localErrorSpan, localErrorInfoBox, localErrorClear] = useError();


  const [inputs, setInputs] = useState<IWithdrawFormCryptoState>({
    address: null,
    recipient: null,
    description: null,
  });

  const delayRes = useCallback(debounce((amount) => { //TODO 1012 refactoring
    setRefresh(true, amount)
    reponseOfUpdatingTokensNetworks(amount, currency.$const).then(res => {
        res?.error              
            ? localErrorHunter(res.error)
            : localErrorClear()
    })     
  }, 2000), []);

  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);

  const {
    percent_fee = 0,
    withdraw_fee = 0,
    min_withdraw = 0,
    max_withdraw = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const onInput = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    setLoading(true);
    delayRes(inputCurr.value.number);
    delayDisplay();
  }, [inputCurr.value.number]);

  return (
    <div className={style.FormWrap}>
      <div className={style.FormContainer}>
        <div className={style.FormBlock}>
          <InputCurrency.Validator
            value={new Decimal(inputCurr.value.number)
              .plus(withdraw_fee)
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
              header={<span className={`${styles.TitleColText} ml-[10px]`}>{t("amount")}:</span>}
              onSelect={setInputCurr}
            >
              <InputCurrency.DisplayBalance currency={currency}>
                <InputCurrency
                  name={"amount"}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                  placeholder={t("exchange.enter_amount")}
                  onChange={setInputCurr}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>
        {localErrorInfoBox && <div className='py-5'>
                {localErrorInfoBox}    
            </div>}
          <div className={style.InpBlock}>
              <span className={`${styles.TitleColText} ml-[10px]`}>{t('address')}:</span>
              <div className='flex'>
                  <Input
                      allowDigits
                      allowSymbols
                      value={inputs.address}
                      onChange={onInput}
                      disabled={!networkTypeSelect}
                      placeholder={t("enter_withdrawal_address")}
                      name={"address"}
                  />
                  {md ?
                        <div className='pl-2' onClick={qrCodeModal.showModal}>
                            <IconApp className="cursor-pointer" size={30} code='t81'/>
                        </div> :
                        <div className='pl-2 pt-2.5' onClick={qrCodeModal.showModal}>
                            <IconApp className="cursor-pointer" size={40} code='t81'/>
                        </div>
                  }
                      </div>
                      </div>
                      <Modal
                      isModalOpen={qrCodeModal.isModalOpen}
                  onCancel={qrCodeModal.handleCancel}
                  title="&nbsp;"
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
            <span className={`${styles.TitleColText} ml-[10px]`}>{t("recipient")}:</span>
            <Input
              value={inputs.recipient}
              onChange={onInput}
              disabled={!networkTypeSelect}
              name={"recipient"}
              placeholder={t("enter_recepients_name")}
              caption={!inputs.recipient && t("EW_law")}
            />
        </div>   

        <div className={style.InpBlock}>
            <span className={`${styles.TitleColText} ml-[10px]`}>{t("desc_optional")}:</span>
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
        <div className='w-full flex justify-center'>
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
                          {t("fee")}:
                      </span>
                  </div>
              </div>
              <div className={styles.PayInfoColValue}>

                  <div className={styles.PayInfoCol}>
                      <div className={styles.PayInfoValueFlex}>
                        {/* Amount, that user pays */}
                        {loading ? t("loading")+"..." : <span className={styles.PayInfoValueFlexText}>{inputCurr.value.number + withdraw_fee}</span>}
                      </div>
                      <div className={styles.PayInfoValueFlex}>
                        {/* Amount, that recipient recieve */}
                        <span className={styles.PayInfoValueFlexText}>{inputCurr.value.number}</span>
                      </div>
                      <div className={styles.PayInfoValueFlex}>
                        {/* Fee amount */}
                          {loading ? t("loading")+"..." : <span className={styles.PayInfoValueFlexTextFee}>{withdraw_fee}</span>}
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
        </div>
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

        <div className={styles.Button + 'mb-0'}>
            <div className={styles.ButtonContainerCenter}>
                <Button
                    size="lg"
                    onClick={showModal}
                    className={'w-full'}
                    disabled={isDisabledBtnWithdraw(inputs) || inputCurrValid.value || loading}
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

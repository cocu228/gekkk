import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import { useContext, useEffect, useState } from "react";
import { MASK_BANK_CARD_NUMBER } from "@/shared/config/mask";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import { formatCardNumber } from "@/widgets/dashboard/model/helpers";
import {
  CtxWalletData,
  CtxWalletNetworks,
} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmCardToCard from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawConfirmCardToCard";
import {
  validateBalance,
  validateMinimumAmount,
} from "@/shared/config/validators";
import { useNavigate } from "react-router-dom";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss";
import { IconApp } from "@/shared/ui/icons/icon-app";
import {Modal} from "@/shared/ui/modal/Modal";
import { Select } from "@/shared/ui/SearchSelect/Select";
import style from './styles.module.scss'

const WithdrawFormCardToCard = () => {
  const currency = useContext(CtxWalletData);
  
  const cards = storeActiveCards((state) => state.activeCards);

  
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { onInput: onCardNumberInput } = useMask(MASK_BANK_CARD_NUMBER);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { md } = useBreakpoints();

  const [inputs, setInputs] = useState<{
    comment: string;
    cardNumber: string;
    selectedCard: string;
    cardholderName: string;
  }>({
    comment: "",
    cardNumber: null,
    selectedCard: null,
    cardholderName: null,
  });

  const { inputCurr, setInputCurr } = useInputState();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();

  const { networkTypeSelect, tokenNetworks } = useContext(CtxWalletNetworks);

  const onInputDefault = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const {
    min_withdraw = 0,
    percent_fee = 0,
    withdraw_fee = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const isValidated = () =>
    Object.keys(inputs).every((i) => {
      if (!inputs[i]) return false;
      if (i === "cardNumber") return inputs[i].length === 19;

      return inputs[i].length > 0;
    });

  useEffect(() => {
    setInputs(() => ({
      ...inputs,
      selectedCard: cards?.find((c) =>
        ["ACTIVE", "PLASTIC_IN_WAY"].includes(c.cardStatus)
      )
        ? cards[0].cardId
        : null,
    }));
  }, [cards]);

  const transformedList = cards.map(item => ({
    id: item.cardId,
    name: formatCardNumber(item.displayPan)
  }));

  return (
    !cards ? (
      <Loader className={"relative"} />
    ) : (
      <div className="wrapper md:mx-[-10px]">
        <div className="row mb-[10px] w-full">
          <div className={style.AmountInputWrap}>
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
                  <span className={`${style.InputTitle} mb-[0]`}>
                    {t("amount")}:
                  </span>
                }
                onSelect={setInputCurr}
              >
                <InputCurrency.DisplayBalance currency={currency}>
                  <InputCurrency
                    className="p-[4px_17px]"
                    transfers
                    onChange={setInputCurr}
                    value={inputCurr.value.string}
                    currency={currency.$const}
                  />
                </InputCurrency.DisplayBalance>
              </InputCurrency.PercentSelector>
            </InputCurrency.Validator>
          </div>
        </div>
        <div className="row mb-[45px] w-full md:mb-[10px]">
            <span className={style.InputTitle}>
              {t("from_card")}:
            </span>
            <div className="w-full relative h-[32px] cursor-pointer flex flex-row">
              <div className="w-full">
                <div className="basis-full">
                  <Select
                      list={transformedList}
                      placeholderText="-select card-"
                      onSelect={(val) => {
                        setInputs(() => ({
                          ...inputs,
                          selectedCard: val,
                        }));
                      }}
                    />
                </div>
              </div>
              <div className={style.FromCardMobArrow}>
                  <IconApp code='t08' color='#fff' size={12} className={"rotate-90"}/>
              </div>
            </div>
        </div>
        <div className="mb-[10px]">
          <span className={style.InputTitle}>
            {t("to_card")}:
          </span>
          <Input
              wrapperClassName={style.CardToCardInput}
              placeholder="-enter description-"
              tranfers
              bordered={false}
              allowDigits
              type={"text"}
              onInput={onCardNumberInput}
              onChange={({ target }) => {
                setInputs(() => ({
                  ...inputs,
                  cardNumber: target.value.replaceAll(" ", ""),
                }));
              }}
            />
        </div>
        <div className="row mb-[10px] w-full">
          <span className={style.InputTitle}>
            {t("cardholder")}:
          </span>
          <Input
              wrapperClassName={style.CardToCardInput}
              tranfers
              bordered={false}
              value={inputs.cardholderName}
              onChange={({ target }) => {
                setInputs(() => ({
                  ...inputs,
                  cardholderName: target.value.toUpperCase(),
                }));
              }}
              placeholder="-enter cardholder name-"
              name={"cardholderName"}
            />
        </div>
        <div className="row w-full">
          <span className={style.InputTitle}>
            {t("description")}:
          </span>
          <Input
              tranfers={md}
              bordered={!md}
              allowDigits
              allowSymbols
              value={inputs.comment}
              name={"comment"}
              onChange={onInputDefault}
              placeholder='-enter description-'
              style={{
                height: 56,
              }}
            />
        </div>   
        <div className={style.PayInfoWrap}>
          <div className={styles.PayInfo}>
            <div className={styles.PayInfoCol}>
              <div className="row">
                <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
              </div>
              <div className="row">
                <span className={styles.PayInfoText}>{t("you_will_get")}:</span>
              </div>
              <div className="row">
                <span className={styles.PayInfoTextFee}>{t("fee")}:</span>
              </div>
            </div>
            <div className={styles.PayInfoColValue}>
              <div className={styles.PayInfoCol}>
                <div className={styles.PayInfoValueFlex}>
                  <span className={styles.PayInfoValueFlexText}>
                    {/* Total amount, that user pays */}
                    {inputCurr.value.number + withdraw_fee}
                  </span>
                </div>
                <div className={styles.PayInfoValueFlex}>
                  <span className={styles.PayInfoValueFlexText}>
                    {/* Amount, that recipient recieve */}
                    {inputCurr.value.number}
                  </span>
                </div>
                <div className={styles.PayInfoValueFlex}>
                  <span className={styles.PayInfoValueFlexTextFee}>
                    {/* Fee amount */}
                    {withdraw_fee}
                  </span>
                </div>
              </div>

              <div className={styles.PayInfoCol}>
                <span className={styles.PayInfoValueFlexTextCurrency}>
                  {currency.$const}
                </span>
                <span className={styles.PayInfoValueFlexTextCurrency}>EURG</span>
                <span className={styles.PayInfoValueFlexTextFee}>
                  {currency.$const}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title={t("confirm_transaction")}
          onCancel={handleCancel}
          isModalOpen={isModalOpen}
        >
          <WithdrawConfirmCardToCard
            {...inputs}
            amount={inputCurr.value.number}
            handleCancel={handleCancel}
          />
        </Modal>

        <div className="row w-full mb-[10px]">
          <div className={styles.ButtonContainerCenter}>
            <Button
              size="lg"
              className="w-full"
              onClick={showModal}
              disabled={!isValidated || inputCurrValid.value}
            >
              {t("transfer")}
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <span className="text-[#9D9D9D] text-[10px]">
            {t("fee_is_prec")}&nbsp;
            <span className="font-bold">
              {withdraw_fee} {currency.$const}{" "}
            </span>{" "}
            {t("after_n_transactions_per_m", { times: 5, period: t("month") })}
          </span>
        </div>
    </div>
    )
  )
};

export default WithdrawFormCardToCard;
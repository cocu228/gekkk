import { Select } from "antd";
import Loader from "@/shared/ui/loader";
import Modal from "@/shared/ui/modal/Modal";
import { Modal as ModalAnt } from "antd";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { useContext, useEffect, useState } from "react";
import { MASK_BANK_CARD_NUMBER } from "@/shared/config/mask";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
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
import Decimal from "decimal.js";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { getWithdrawDesc } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss";
import TextArea from "@/shared/ui/input/text-area/TextArea";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

const { Option } = Select;

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
    // max_withdraw = null,
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

  return !md ? (
    !cards ? (
      <Loader className={"relative"} />
    ) : (
      <div className="wrapper">
        <div className="row mb-8 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium">{t("from_card")}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <SearchSelect
                  value={inputs.selectedCard}
                  notFoundContent={
                    <div className="my-3">{t("no_active_cards")}</div>
                  }
                  placeholder={
                    <span className="font-normal text-gray-400">
                      {t("choose_source_card")}
                    </span>
                  }
                  prefixIcon={
                    inputs.selectedCard ? <IconCoin code={"EUR"} /> : null
                  }
                  onChange={(val: string) => {
                    setInputs(() => ({
                      ...inputs,
                      selectedCard: val,
                    }));
                  }}
                >
                  {cards
                    ?.filter((c) => c.cardStatus === "ACTIVE")
                    .map((c) => (
                      <Option
                        value={c.cardId}
                        label={formatCardNumber(c.displayPan)}
                      >
                        <div>{formatCardNumber(c.displayPan)}</div>
                      </Option>
                    ))}
                </SearchSelect>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-8 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium">{t("card_number_title")}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
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
            </div>
          </div>
        </div>
        <div className="row mb-8 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium">{t("cardholder_name")}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  value={inputs.cardholderName}
                  onChange={({ target }) => {
                    setInputs(() => ({
                      ...inputs,
                      cardholderName: target.value.toUpperCase(),
                    }));
                  }}
                  placeholder={""}
                  name={"cardholderName"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-8 w-full">
          <div className="col">
            <div className="row mb-2">
              <div className="col">
                <span className="font-medium">{t("comment")}</span>
              </div>
            </div>
            <div className="row">
              <div className="col flex items-center">
                <TextArea
                  allowDigits
                  allowSymbols
                  value={inputs.comment}
                  name={"comment"}
                  onChange={onInputDefault}
                  placeholder={""}
                  style={{
                    minHeight: 100,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-8 w-full">
          <div className="col">
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
                  <span className="text-gray-600 font-medium">
                    {t("amount")}:
                  </span>
                }
                onSelect={setInputCurr}
              >
                <InputCurrency
                  onChange={setInputCurr}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                />
              </InputCurrency.PercentSelector>
            </InputCurrency.Validator>
          </div>
        </div>

        <Modal
          width={450}
                closable={false}
                title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
          onCancel={handleCancel}
          open={isModalOpen}
          padding
        >
          <WithdrawConfirmCardToCard
            {...inputs}
            amount={inputCurr.value.number}
            handleCancel={handleCancel}
          />
        </Modal>

        <div className="row w-full">
          <div className="col">
            <Button
              size={"xl"}
              className="w-full"
              onClick={showModal}
              disabled={!isValidated || inputCurrValid.value}
            >
              {t("withdraw_title")}
            </Button>
          </div>
        </div>
      </div>
    )
  ) : !cards ? (
    <Loader className={"relative"} />
  ) : (
    <div className="wrapper">
      <div className="row mb-8 w-full">
        <div className="col">
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
                <span className="text-[#1F3446] text-[12px] font-semibold">
                  {t("amount")}:
                </span>
              }
              onSelect={setInputCurr}
            >
              <InputCurrency.DisplayBalance currency={currency}>
                <InputCurrency
                  onChange={setInputCurr}
                  value={inputCurr.value.string}
                  currency={currency.$const}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>
      </div>
      <div className="row mb-8 w-full">
        <div className="flex flex-col">
          <div className="row min-w-[80px] mb-2 mr-5">
            <div className="col w-full">
              <span className="w-full text-[#1F3446] text-[12px] font-semibold">
                {t("from_card")}:
              </span>
            </div>
          </div>
          <div className="w-full relative h-[32px] cursor-pointer flex flex-row">
            <div className="row w-full relative border-r-[0px] items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-tl-[5px] rounded-bl-[5px] border-solid border-[#DCDCD9]">
              <div className="basis-full">
                <SearchSelect
                  value={inputs.selectedCard}
                  notFoundContent={
                    <div className="my-3">{t("no_active_cards")}</div>
                  }
                  placeholder={
                    <span className="font-normal text-gray-400">
                      {t("choose_source_card")}
                    </span>
                  }
                  onChange={(val: string) => {
                    setInputs(() => ({
                      ...inputs,
                      selectedCard: val,
                    }));
                  }}
                >
                  {cards
                    ?.filter((c) => c.cardStatus === "ACTIVE")
                    .map((c) => (
                      <Option
                        value={c.cardId}
                        label={formatCardNumber(c.displayPan)}
                      >
                        <div>{formatCardNumber(c.displayPan)}</div>
                      </Option>
                    ))}
                </SearchSelect>
              </div>
            </div>
            <div className='rounded-tr-[5px] rounded-br-[5px] h-full min-w-[22px] flex justify-center items-center bg-[#3A5E66]'>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6286 0.5L12 1.8125L6 7.5L0 1.8125L1.37143 0.5L6 4.875L10.6286 0.5Z" fill="white"/>
                </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-8 w-full">
        <div className="flex flex-col">
          <div className="row min-w-[80px] mb-2 mr-5">
            <div className="col">
              <span className="text-[#1F3446] text-[12px] font-semibold">
                {t("to_card")}:
              </span>
            </div>
          </div>
          <div className="row basis-[100%]">
            <div className="col">
              <Input
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
          </div>
        </div>
      </div>
      <div className="row mb-8 w-full">
        <div className="flex flex-col">
          <div className="row min-w-[80px] mb-2 mr-5">
            <div className="col">
              <span className="text-[#1F3446] text-[12px] font-semibold">
                {t("cardholder")}:
              </span>
            </div>
          </div>
          <div className="row basis-[100%]">
            <div className="col">
              <Input
                value={inputs.cardholderName}
                onChange={({ target }) => {
                  setInputs(() => ({
                    ...inputs,
                    cardholderName: target.value.toUpperCase(),
                  }));
                }}
                placeholder={""}
                name={"cardholderName"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-8 w-full">
        <div className="flex flex-col">
          <div className="row min-w-[80px] mb-2 mr-5">
            <div className="col">
              <span className="text-[#1F3446] text-[12px] font-semibold">
                {t("description")}:
              </span>
            </div>
          </div>
          <div className="row w-full">
            <div className="col flex items-center">
              <TextArea
                allowDigits
                allowSymbols
                value={inputs.comment}
                name={"comment"}
                onChange={onInputDefault}
                placeholder={""}
                style={{
                  height: 56,
                }}
              />
            </div>
          </div>
        </div>
      </div>

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
                {inputCurr.value.number + withdraw_fee}
              </span>
            </div>
            <div className={styles.PayInfoValueFlex}>
              <span className={styles.PayInfoValueFlexText}>
                {inputCurr.value.number}
              </span>
            </div>
            <div className={styles.PayInfoValueFlex}>
              <span className={styles.PayInfoValueFlexTextFee}>
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

      <ModalAnt
        width={450}
        title={
          <span className={styles.MainModalTitle}>
            {t("confirm_transaction")}
          </span>
        }
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}
        centered
      >
        <WithdrawConfirmCardToCard
          {...inputs}
          amount={inputCurr.value.number}
          handleCancel={handleCancel}
        />
      </ModalAnt>

      <div className="row w-full mb-[10px]">
        <div className={styles.ButtonContainerCenter}>
          <Button
            greenTransfer
            size={"xl"}
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
          {t("fee_is_prec")}{" "}
          <span className="font-bold">
            {withdraw_fee} {currency.$const}{" "}
          </span>{" "}
          {t("after_n_transactions_per_m", { times: 5, period: t("month") })}
        </span>
      </div>
    </div>
  );
};

export default WithdrawFormCardToCard;

import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {useCallback, useContext, useEffect, useState} from "react";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmCardToCard from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawConfirmCardToCard";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {Modal} from "@/shared/ui/modal/Modal";
import {Select} from "@/shared/ui/oldVersions/SearchSelect/Select";
import style from './styles.module.scss'
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import {PaymentDetails} from "@/shared/(orval)api/gek/model";
import {CtxRootData} from "@/processes/RootContext";
import {debounce} from "@/shared/lib";
import {UasConfirmCtx} from "@/processes/errors-provider-context";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";
import Notice from "@/shared/ui/notice";
import useError from "@/shared/model/hooks/useError";

const WithdrawFormCardToCard = () => {
  const currency = useContext(CtxWalletData);
  const {uasToken, getUasToken} = useContext(UasConfirmCtx)
  const {account} = useContext(CtxRootData);
  const {$const} = useContext(CtxWalletData);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getCards = storeActiveCards((state) => state.getActiveCards);
  // const cards = storeActiveCards((state) => state.activeCards);
  const cards = storeActiveCards((state) => state.activeCards);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const [details, setDetails] = useState<PaymentDetails>({
    account: account.account_id,
    beneficiaryName: null,
    cardNumber: null,
    fromCardId: null,
    purpose: null,
    amount: {
      sum: {
        currency: {
          code: $const
        }
      }
    }
  })


  const { inputCurr, setInputCurr } = useInputState();
  const { inputCurrValid, setInputCurrValid } = useInputValidateState();

  const {
    networkTypeSelect,
    tokenNetworks,
    localErrorInfoBox,
    setBankRefresh,
    localErrorClear,
  } = useContext(CtxWalletNetworks);


  const onInput = ({ target }) => {
    setDetails((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleOnFromCardId = (val: string) => {
    setDetails(prev => ({ ...prev, fromCardId: val }))
  }

  const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), [],);
  const delayRes = useCallback(debounce(setBankRefresh, 2500),[]);

  useEffect(() => {
    if(cards || cards === null) {
      setLoadingPage(false)
    }
  }, [cards])

  useEffect(()=>{
    // console.log(cards)
    if(!cards) {
      (async () => {
        setLoadingPage(true)
        const res = await getCards();
        setLoadingPage(false)
      })();
    } else {
      setLoadingPage(false)
    }
  }, []) 

  const {
    min_withdraw = 0,
    // percent_fee = 0,
    withdraw_fee = 0,
  } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const isValidated = () =>
    Object.keys(details).every((i) => {
      if (!details[i]) return false;
      if (i === "cardNumber") return details[i].length === 19;

      return details[i].length > 0;
    });

  useEffect(() => {
    localErrorClear();
    if (!Object.values(details).some((val) => !val) && inputCurr.value.number) {
      setLoading(true);
      delayRes(details);
      delayDisplay();
    }
  }, [inputCurr.value.number, details]);

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
  }

  const transformedList = cards?.map(item => ({ id: item.cardId, name: formatCardNumber(item.displayPan) }));
  const isFieldsFill = Object.values(details).every((v) => v !== null && v !== "");
  const isTransferDisabled = !!localErrorInfoBox || loading || !isValidated || inputCurrValid.value || isFieldsFill;
  const youWillPay = inputCurr.value.number + withdraw_fee;
  const youWillGet = inputCurr.value.number;
  const fee = withdraw_fee;

  return (
    loadingPage ? (
      <Loader className={"relative"} />
    ) : (
      <div className="bg-[white] rounded-[8px] md:p-[20px_10px_5px] p-[20px_0px_5px] flex flex-col md:gap-[10px] gap-[15px]">
        {/* Amount Start */}
        <div className="w-full">
          <AmountInput
            transfers
            value={inputCurr.value.number}
            description={getWithdrawDesc(min_withdraw, currency.$const, t('minimum_amount'))}
            placeholder={t("exchange.enter_amount")}
            inputValue={inputCurr.value.string}
            currency={currency}
            validators={[
              validateBalance(currency, navigate, t),
              validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t),
            ]}
            onError={setInputCurrValid}
            onSelect={setInputCurr}
            onChange={setInputCurr}
          />
        </div>
        {/* Amount End */}

        {/* From Card Start */}
        <div className="w-full flex flex-col gap-[3px]">
          <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
            {t("from_card")}:
          </span>
          <div className="w-full relative md:h-[32px] cursor-pointer flex flex-row">
            <div className="w-full">
              <div className="basis-full">
                <Select
                  list={transformedList || []}
                  placeholderText={t("select_card")}
                  onSelect={handleOnFromCardId}
                />
              </div>
            </div>
            <div className={style.FromCardMobArrow}>
              <IconApp code="t08" color="#fff" size={12} className={"rotate-90"} />
            </div>
          </div>
        </div>
        {/* From Card End */}

        {/* To Card Start */}
        <div className="w-full flex flex-col gap-[3px]">
          <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
            {t("to_card")}:
          </span>
          <Input
            name={"cardNumber"}
            placeholder={t("enter_description")}
            value={details.cardNumber}
            allowDigits
            type={"text"}
            onChange={onInput}
          />
        </div>
        {/* To Card End */}

        {/* Cardholder Start */}
        <div className="w-full flex flex-col gap-[3px]">
          <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
            {t("cardholder")}:
          </span>
          <Input
            name={"beneficiaryName"}
            value={details.beneficiaryName}
            placeholder={t("enter_cardholder_name")}
            onChange={onInput}
          />
        </div>
        {/* Cardholder End */}

        {/* Description Start */}
        <div className="w-full flex flex-col gap-[3px]">
          <span className="font-semibold text-[#1F3446] md:text-fs12 text-fs14 ml-[7px]">
            {t("description")}:
          </span>
          <Input
              name={"purpose"}
              allowDigits
              allowSymbols
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

        {
          cards === null && <Notice isError text={'Unknown problem'} />
        }

        <div className="w-full flex justify-center">
          <Button
            size="lg"
            onClick={handleConfirm}
            className="w-full md:text-fs14 text-fs16"
            // disabled={isTransferDisabled}
          >
            {t("transfer")}
          </Button>
        </div>
        {/* Transfer Button End */}

        {/* Transaction Information Start */}
        <div className={"w-full md:flex hidden justify-center"}>
          <span className={"text-[var(--gek-mid-grey)] md:text-fs12 text-fs14"}>
            {t("fee_is_prec")}&nbsp;
            <span className={"font-semibold"}>{withdraw_fee} {currency.$const}</span>&nbsp;
            {t("after_n_transactions_per_m", { times: 5, period: t("month") })}
          </span>
        </div>
        {/* Transaction Information End */}

        {/* Confirm Start */}
        <Modal isModalOpen={isModalOpen} title={t("confirm_transaction")} onCancel={handleCancel}>
          <WithdrawConfirmCardToCard
            youWillPay={youWillPay}
            youWillGet={youWillGet}
            fee={fee}
            details={details}
            handleCancel={handleCancel}
          />
        </Modal>
        {/* Confirm End */}
    </div>
    )
  )
};

export default WithdrawFormCardToCard;
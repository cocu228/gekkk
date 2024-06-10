import Button from "@/shared/ui/button/Button";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import CreateCode from "./CreateCode";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from "react-i18next";
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { useNavigate } from "react-router-dom";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useContext, useState } from "react";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { validateBalance } from "@/shared/config/validators";
import { apiCreateTxCode } from "@/shared/(orval)api";
import { actionResSuccess, getRandomInt32 } from "@/shared/lib";
import { storeListTxCode } from "@/shared/store/tx-codes/list-tx-code";
import useError from "@/shared/model/hooks/useError";
import styles from "../styles.module.scss";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Switch } from "@/shared/ui/Switch";
import { Modal } from "@/shared/ui/modal/Modal";
import { CtxRootData } from "@/processes/RootContext";
import Checkbox from "@/shared/ui/checkbox/Checkbox";

const CreateTransferCode = () => {
  const { t } = useTranslation();
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { md } = useBreakpoints();

  const navigate = useNavigate();
  const { inputCurr, setInputCurr } = useInputState();
  const { setInputCurrValid } = useInputValidateState();
  const currency = useContext(CtxWalletData);
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [newCode, setNewCode] = useState("");
  const { setRefresh } = useContext(CtxRootData);

  const getListTxCode = storeListTxCode((state) => state.getListTxCode);
  const [localErrorHunter, , localErrorInfoBox] = useError();

  const [isHelpClicked, setIsHelpClicked] = useState<boolean>(false);

  const onCreateCode = async () => {
    setLoading(true);

    const response = await apiCreateTxCode({
      typeTx: checkbox ? 12 : 11,
      timeLimit: false,
      currency: currency.$const,
      amount: inputCurr.value.number,
      clientNonce: getRandomInt32(),
    });

    actionResSuccess(response)
      .success(async () => {
        setNewCode(response.data.result.code);
        setRefresh();
        await getListTxCode();
        setLoading(false);
      })
      .reject((error) => {
        localErrorHunter(error);
        setLoading(false);
      });
  };

  const switchHandler = () => {
    setCheckbox(!checkbox);
  };

  return !md ? (
    <>
      <div>
      <TransferCodeDescription />

      <div className="row mb-5">
        <Button onClick={showModal} size="lg" className="w-full">
          {t("create_transfer_code")}
        </Button>
        <Modal
          isModalOpen={isModalOpen}
          onCancel={handleCancel}
          title={t('your_transfer_code')}
        >
          <CreateCode inputCurrMobile={inputCurr} />
        </Modal>
      </div>
      <div className="row mb-2">
        <h3 className="text-lg font-bold">{t("unredeemed_codes_info")}</h3>
      </div>
      <div className="row">
        <TransferTableCode isOwner />
      </div>
    </div>
    </>
  ) : (
    <div>
      <div className={styles.MobWrap}>
        <div className={styles.MobWrapBlock}>
        <div className="row">
        <div className="col">
          <div className="wrapper w-full">
            <InputCurrency.Validator
              value={inputCurr.value.number}
              onError={setInputCurrValid}
              validators={[validateBalance(currency, navigate, t)]}
            >
              <InputCurrency.PercentSelector
                onSelect={setInputCurr}
                header={
                  <span className="text-[#1F3446] text-[12px] ml-[12px] font-semibold mb-[5px]">
                    {t("amount")}:
                  </span>
                }
                currency={currency}
              >
                <InputCurrency.DisplayBalance currency={currency}>
                  <InputCurrency
                    transfers
                    value={inputCurr.value.string}
                    currency={currency.$const}
                    onChange={setInputCurr}
                  />
                </InputCurrency.DisplayBalance>
              </InputCurrency.PercentSelector>
            </InputCurrency.Validator>
          </div>
        </div>
      </div>
      <div className="row mb-4 mt-[10px]">
        {!inputCurr.value.number && (
          <span className="text-[10px] text-[var(--gek-orange)] ml-[10px] leading-[12.5px] block">
            *Create a special code with which you can transfer or receive{" "}
            {currency.$const} funds between Gekkoin users with or without your
            confirmation
          </span>
        )}
      </div>
      <div className="row mb-16 md:mb-2">
      <div className="flex flex-row gap-4 ml-[10px]">
            <Switch defaultCheked={checkbox} onChange={switchHandler} />
            <div className="flex items-center">
              <span className="text-[12px] mr-4">{t("use_confirmation")}</span>
              <div
                onClick={() => {
                  setIsHelpClicked(true);
                }}
                className="inline-block relative align-middle w-[14px] ml-1 cursor-help"
              >
                <IconApp code="t27" color="#2BAB72" size={14} />
              </div>
              <Modal
                isModalOpen={isHelpClicked}
                onCancel={() => setIsHelpClicked(false)}
                title={t("use_confirmation")}
              >
                <div className="flex flex-row mt-4 items-center">
                  <IconApp
                    code="t27"
                    className="mr-2"
                    color="#2BAB72"
                    size={14}
                  />
                  <div className="flex items-center">
                    <span>{t("when_using_confirmation_mobile")}</span>
                  </div>
                </div>
                <div className={styles.ButtonContainerCenter}>
                  <Button
                    size="lg"
                    color="blue"
                    className="w-full mt-5"
                    onClick={() => {
                      setIsHelpClicked(false);
                    }}
                  >
                    {t("close")}
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
      </div>
      <div className="flex w-full justify-center">
          <div className="w-full max-w-[200px]">
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
                      {inputCurr.value.number}
                    </span>
                  </div>
                  <div className={styles.PayInfoValueFlex}>
                    <span className={styles.PayInfoValueFlexText}>
                      {inputCurr.value.number}
                    </span>
                  </div>
                  <div className={styles.PayInfoValueFlex}>
                    <span className={styles.PayInfoValueFlexTextFee}>-</span>
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
        </div>
      <div className={styles.ButtonContainerCenter}>
        <Button
          disabled={
            !inputCurr.value.number ||
            !validateBalance(currency, navigate, t)(inputCurr.value.number)
              .validated
          }
          onClick={() => {
            onCreateCode();
            showModal();
          }}
          size="lg"
          className="w-full"
        >
          {t("create_transfer_code")}
        </Button>
        <span className="block mt-[9px] mb-[10px] font-normal text-[#B9B9B5] text-[10px] font-[Inter]">
          {t('fee_is')}
          <span className="uppercase font-bold"> 0 eurg </span>
          {t("per_transaction")}
        </span>
        <Modal
          onCancel={() => {
            handleCancel();
            setNewCode("");
          }}
          title={t("confirm_transaction")}
          isModalOpen={isModalOpen}
        >
          <CreateCode
            onClose={() => {
              handleCancel();
              setNewCode("");
            }}
            inputCurrMobile={inputCurr}
            code={newCode}
          />
        </Modal>
      </div>
        </div>
      </div>
      <div className="row bg-[#F7F7F0] m-[0_-20px] pt-[10px]">
        <TransferTableCode inputCurr={inputCurr} isOwner />
      </div>
    </div>
  );
};

export default CreateTransferCode;

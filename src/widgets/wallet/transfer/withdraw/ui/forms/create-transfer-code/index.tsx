import Button from "@/shared/ui/button/Button";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import CreateCode from "./CreateCode";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from "react-i18next";
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
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
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Switch } from "@/shared/ui/Switch";
import { Modal } from "@/shared/ui/modal/Modal";
import { CtxRootData } from "@/processes/RootContext";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import AmountInput from "@/widgets/wallet/transfer/components/amount-input";
import ConfirmInfo from "@/widgets/wallet/transfer/withdraw/ui/forms/create-transfer-code/ui/confirm-info";

const CreateTransferCode = () => {
  // Hooks
  const { t } = useTranslation();
  const { isModalOpen, showModal, handleCancel } = useModal();
  const { md } = useBreakpoints();
  const navigate = useNavigate();
  const { inputCurr, setInputCurr } = useInputState();
  const { setInputCurrValid } = useInputValidateState();
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [isHelpClicked, setIsHelpClicked] = useState<boolean>(false);

  // Context
  const currency = useContext(CtxWalletData);
  const { setRefresh } = useContext(CtxRootData);

  // Store
  const getListTxCode = storeListTxCode((state) => state.getListTxCode);

  // Handlers
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

  const handleOnToggleConfirmInfo = (isOpen: boolean) => () => {
    setIsHelpClicked(isOpen)
  }

  const handleOnCancelModal = () => {
    handleCancel();
    setNewCode("");
  }

  const handleOnTransfer = () => {
    void onCreateCode();
    showModal();
  }

  // Helpers
  const validated = validateBalance(currency, navigate, t)(inputCurr.value.number).validated;
  const isTransferDisabled = !inputCurr.value.number || !validated;

  if (!md) {
    return (
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
              <CreateCode onClose={handleCancel} inputCurrMobile={inputCurr} />
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
    )
  }

  return (
    <>
      <div className="bg-[white] rounded-[8px] md:p-[20px_10px_5px] p-[20px_0px_5px] flex flex-col md:gap-[10px] gap-[15px]">
        {/* Amount Start */}
        <div className="w-full">
          <AmountInput
            transfers
            placeholder={t("exchange.enter_amount")}
            value={inputCurr.value.number}
            inputValue={inputCurr.value.string}
            currency={currency}
            description={t("create_special_code_currency", { currency: currency.$const })}
            validators={[validateBalance(currency, navigate, t)]}
            onError={setInputCurrValid}
            onSelect={setInputCurr}
            onChange={setInputCurr}
          />
        </div>
        {/* Amount End */}

        {/* Switch Confirm Start */}
        <div className="flex items-center gap-[10px] ml-[10px]">
          <Switch defaultCheked={checkbox} onChange={switchHandler} />
          <span className="text-[#1F3446] md:text-fs12 text-fs14">{t("use_confirmation")}</span>
          <IconApp code="t27" color="#2BAB72" size={14} className={"cursor-help"} onClick={handleOnToggleConfirmInfo(true)} />
          {/* Switch Confirm Modal Start */}
          <ConfirmInfo
            isOpen={isHelpClicked}
            onCancel={handleOnToggleConfirmInfo(false)}
          />
          {/* Switch Confirm Modal End */}
        </div>
        {/* Switch Confirm End */}

        {/* Commissions Start */}
        <div className='w-full flex justify-center'>
          <Commissions
            isLoading={loading}
            youWillPay={inputCurr.value.number}
            youWillGet={inputCurr.value.number}
            fee={"-"}
          />
        </div>
        {/* Commissions End */}

        {/* Transfer Error Start */}
        {localErrorInfoBox}
        {/* Transfer Error Start */}

        {/* Transfer Button Start */}
        <div className="w-full flex justify-center">
          <Button
            size="lg"
            className="w-full md:text-fs14 text-fs16"
            disabled={isTransferDisabled}
            onClick={handleOnTransfer}
          >
            {t("create_transfer_code")}
          </Button>
        </div>
        {/* Transfer Button End */}

        {/* Confirm Start */}
        <Modal isModalOpen={isModalOpen} title={t("confirm_transaction")} onCancel={handleOnCancelModal}>
          <CreateCode
            code={newCode}
            inputCurrMobile={inputCurr}
            onClose={handleOnCancelModal}
          />
        </Modal>
        {/* Confirm End */}
      </div>
      <div className="row bg-[#F7F7F0] md:rounded-[0_0_10px_10px] p-[12px_0]">
        <TransferTableCode inputCurr={inputCurr} isOwner />
      </div>
    </>
  );
};

export default CreateTransferCode;

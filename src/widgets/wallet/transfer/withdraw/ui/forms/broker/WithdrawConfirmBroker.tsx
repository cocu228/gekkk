import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import { CtxRootData } from "@/processes/RootContext";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";
import ConfirmLoading from "@/widgets/wallet/transfer/components/confirm-loading";
import Input from "@/shared/ui/input/Input";
import styles from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/styles.module.scss";
import Form from "@/shared/ui/form/Form";
import useError from "@/shared/model/hooks/useError";
import Timer from "@/shared/model/hooks/useTimer";
import { apiConfirmPaymentToBroker, apiInitiatePaymentToBroker } from "@/shared/(orval)api";
import { actionResSuccess, formatAsNumber } from "@/shared/lib";
import ModalTrxStatusSuccess from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusSuccess";
import { SignTX } from "@/widgets/wallet/transfer/withdraw/model/signTX";
import ModalTrxStatusError from "@/widgets/wallet/transfer/withdraw/ui/modals/ModalTrxStatusError";

import type { PaymentData, PostGekV1BankConfirmPaymentToBrokerParams } from "@/shared/(orval)api/gek/model";

interface IStageConfirm {
  status: number;
  txId: string;
  create_result: string;
  fee: number;
  code: string | null;
}

interface IWithdrawConfirmBrokerProps {
  amount: number;
  handleCancel: () => void;
}

const WithdrawConfirmBroker: FC<IWithdrawConfirmBrokerProps> = ({ amount, handleCancel }) => {
  const initialStageReq: IStageConfirm = {
    code: null,
    fee: 0,
    status: -1,
    txId: "",
    create_result: ""
  };

  const initialPyamentData: PaymentData = {
    amount_decimal: amount,
    description: "Purchase of EURG tokens"
  };

  // Hooks
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stageReq, setStageReq] = useState<IStageConfirm>(initialStageReq);
  const [smsCode, setSmsCode] = useState<string>("");
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();

  // Context
  const { setContent } = useContext(CtxGlobalModalContext);
  const { displayHistory } = useContext(CtxDisplayHistory);
  const { setRefresh } = useContext(CtxRootData);
  const { networkTypeSelect, networksForSelector, tokenNetworks } = useContext(CtxWalletNetworks);
  const { withdraw_fee } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  // Handles
  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    localErrorClear();
    setSmsCode(target.value);
  };

  const handleOnInitialConfirm = async () => {
    setIsLoading(true);

    const response = await apiInitiatePaymentToBroker(initialPyamentData);

    actionResSuccess(response)
      .success(() => {
        const result = response.data?.result;
        const isStageReq = [0, 1, 2].includes(result.confirmationStatusCode);
        if (isStageReq) {
          setStageReq(prev => ({
            ...prev,
            status: result.confirmationStatusCode,
            txId: result.txId,
            fee: result.fee,
            code: result.confirmCode,
            create_result: result.create_result
          }));
        }
        if (result.confirmationStatusCode === 4) {
          handleCancel();
          setRefresh();
          displayHistory();
          setContent({ content: <ModalTrxStatusSuccess /> });
        } else {
          localErrorHunter({ message: "Something went wrong.", code: 1 });
        }
      })
      .reject(err => {
        localErrorHunter(err);
        setSmsCode("");
      });

    setIsLoading(false);
  };

  const handleOnConfirm = async () => {
    setIsLoading(true);

    const paymentData: PaymentData = {
      ...initialPyamentData,
      referenceNumber: stageReq.create_result
    };

    const confirmationCode = stageReq.status === 2 ? stageReq.code : smsCode !== "" ? formatAsNumber(smsCode) : null;

    const params: PostGekV1BankConfirmPaymentToBrokerParams = {
      confirmationTimetick: stageReq.txId,
      confirmationCode
    };

    const options = {
      headers: {
        // В случае когда требуется подпись
        ...(stageReq?.status !== 2
          ? {}
          : {
              "x-signature": await SignTX(`${stageReq.txId}${stageReq.code}`)
            })
      }
    };

    const response = await apiConfirmPaymentToBroker(paymentData, params, options);

    if (response.data.error) {
      setContent({ content: <ModalTrxStatusError /> });
    } else {
      handleCancel();
      setSmsCode("");
      setStageReq(initialStageReq);
      setRefresh();
      displayHistory();
      setContent({ content: <ModalTrxStatusSuccess /> });
    }

    setIsLoading(false);
  };

  const handleOnResetSmsCode = async () => {
    void handleOnInitialConfirm();
  };

  // Effects
  useEffect(() => {
    void handleOnInitialConfirm();
  }, []);

  // Helpers
  const { label } = networksForSelector.find(it => it.value === networkTypeSelect);
  const isConfirmDisabled = !!localErrorInfoBox || (smsCode === "" && (stageReq.status === 0 || stageReq.status === 1));

  return (
    <ConfirmLoading isLoading={isLoading}>
      <Notice text={t("check_your_information_carefully")} />

      <div className='flex flex-col px-[10px] gap-[25px] mb-[30px]'>
        <div className='flex flex-col gap-[10px]'>
          <div>
            <p className='text-[#9D9D9D] md:text-fs12 text-fs14'>{t("type_transaction")}</p>
            <p className='font-semibold text-[#3A5E66] md:text-fs12 text-fs14'>{label}</p>
          </div>
        </div>
        <div className='w-full'>
          <Commissions
            youWillPay={amount + withdraw_fee}
            youWillGet={amount}
            fee={withdraw_fee}
            youWillGetCoin={"EURG"}
          />
        </div>
      </div>

      {/* Transfer Error Start */}
      {localErrorInfoBox}
      {/* Transfer Error Start */}

      <Form wrapperClassName='w-full' onSubmit={handleOnConfirm}>
        {(stageReq.status === 0 || stageReq.status === 1) && (
          <div className='mb-[15px]'>
            <Input
              allowDigits
              size={"sm"}
              type='text'
              value={smsCode}
              className={styles.Input}
              onChange={handleOnChange}
              placeholder={
                stageReq.status === 0
                  ? t("enter_sms_code")
                  : stageReq.status === 1
                  ? t("enter_code")
                  : t("enter_pin_code")
              }
            />
            <Timer onAction={handleOnResetSmsCode} />
          </div>
        )}
        <ConfirmButtons
          isConfirmDisabled={isConfirmDisabled}
          confirmTitle={t(stageReq.status === 2 ? "sign_transfer" : "confirm")}
          confirmType={"submit"}
          onCancel={handleCancel}
        />
      </Form>
    </ConfirmLoading>
  );
};

export default WithdrawConfirmBroker;

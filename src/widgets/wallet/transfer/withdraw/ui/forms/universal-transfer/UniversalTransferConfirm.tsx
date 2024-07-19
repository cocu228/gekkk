import { FC, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Loader from "@/shared/ui/loader";
import { CtxWalletData, CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import { apiInternalTransfer } from "@/shared/(orval)api/gek";
import { actionResSuccess, getRandomInt32, uncoverResponse } from "@/shared/lib/helpers";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import { CtxRootData } from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import { CreateWithdrawOut } from "@/shared/(orval)api/gek/model";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";

import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";

const initStageConfirm = {
  txId: null,
  code: null,
  status: null,
  recipient: null
};

interface IUniversalTransferConfirmProps {
  amount: number;
  comment: string;
  requisite: string;
  handleCancel: () => void;
}

const UniversalTransferConfirm: FC<IUniversalTransferConfirmProps> = ({ amount, comment, requisite, handleCancel }) => {
  const { t } = useTranslation();
  const { $const } = useContext(CtxWalletData);
  const { setRefresh } = useContext(CtxRootData);
  const { setContent } = useContext(CtxGlobalModalContext);
  const [stage, setStage] = useState(initStageConfirm);
  const [loading, setLoading] = useState<boolean>(true);
  const { displayHistory } = useContext(CtxDisplayHistory);
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const { networkTypeSelect, networksForSelector } = useContext(CtxWalletNetworks);
  const { label } = networksForSelector.find(it => it.value === networkTypeSelect);

  const details = useRef({
    tag: comment,
    amount: amount,
    currency: $const,
    recipient: requisite
  });

  useEffect(() => {
    (async () => {
      // TODO: wallet not found error
      const response = await apiInternalTransfer({
        ...details.current,
        client_nonce: getRandomInt32()
      });

      actionResSuccess(response)
        .success(() => {
          const { txId, message, create_result, confirmationStatusCode }: CreateWithdrawOut = uncoverResponse(response);

          if (confirmationStatusCode === 0 || confirmationStatusCode === 1 || confirmationStatusCode === 2) {
            setStage(prev => ({
              ...prev,
              txId: txId,
              code: message,
              recipient: create_result,
              status: confirmationStatusCode
            }));
          } else {
            localErrorHunter({ message: "Something went wrong.", code: 1 });
          }
        })
        .reject(localErrorHunter);

      setLoading(false);
    })();
  }, []);

  const onConfirm = async () => {
    setLoading(true);

    const response = await apiInternalTransfer(
      {
        ...details.current,
        client_nonce: getRandomInt32()
      },
      {
        confirmationCode: stage.code,
        confirmationTimetick: stage.txId
      }
    );

    actionResSuccess(response)
      .success(() => {
        const result: CreateWithdrawOut = uncoverResponse(response);

        if (
          result.confirmationStatusCode === 0 ||
          result.confirmationStatusCode === 1 ||
          result.confirmationStatusCode === 2
        ) {
          setStage(prev => ({
            ...prev,
            status: result.confirmationStatusCode,
            txId: result.txId
          }));
        }
        if (result.confirmationStatusCode === 4) {
          handleCancel();
          setRefresh();
          displayHistory();
          setContent({
            title: "Successfull transaction",
            content: <ModalTrxStatusSuccess />
          });
        } else {
          localErrorHunter({ message: "Something went wrong.", code: 1 });
        }
      })
      .reject(localErrorHunter);

    setLoading(false);
  };

  const universalTransferInfo: { label: string; value: string }[] = [
    { label: t("type_transaction"), value: label },
    { label: "Amount", value: `${amount} ${$const}` },
    { label: t("recipient"), value: requisite },
    { label: t("recipient_name"), value: stage.recipient ?? "-" },
    ...(comment ? [{ label: t("description"), value: comment }] : [])
  ];

  return loading ? (
    <div className="min-h-[100px]">
      <Loader className='relative my-20' />
    </div>
  ) : (
    <div>
      <Notice text={t("check_your_information_carefully")} />

      <div className='flex flex-col px-[10px] gap-[25px] mb-[30px]'>
        <div className='flex flex-col gap-[10px]'>
          {universalTransferInfo.map(({ label, value }) => (
            <div key={value} className='flex flex-col gap-[1.5px]'>
              <p className='text-[#9D9D9D] md:text-fs12 text-fs14'>{label}</p>
              <p className='font-semibold text-[#3A5E66] md:text-fs12 text-fs14 break-words'>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {localErrorInfoBox ? <div className='w-full mb-[30px]'>{localErrorInfoBox}</div> : null}

      <ConfirmButtons onConfirm={onConfirm} onCancel={handleCancel} />
    </div>
  );
};

export default UniversalTransferConfirm;

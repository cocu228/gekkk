import {useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, uncoverResponse} from "@/shared/lib/helpers";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {CreateTransferIn, CreateWithdrawOut} from "@/shared/(orval)api/gek/model";
import {useTranslation} from "react-i18next";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";
import ConfirmLoading from "@/widgets/wallet/transfer/components/confirm-loading";
import Commissions from "@/widgets/wallet/transfer/components/commissions";

const initStageConfirm = {
    txId: null,
    code: null,
    status: null,
    recipient: null
}

const CrossProjectConfirm = ({
    amount,
    comment,
    networkType,
    handleCancel,
}) => {
    // Hooks
    const {t} = useTranslation();
    const [localErrorHunter, ,localErrorInfoBox] = useError();
    const [stage, setStage] = useState(initStageConfirm);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Context
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const {setContent} = useContext(CtxGlobalModalContext);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);

    // Store
    const {getAccountDetails} = storeAccountDetails(state => state);

    // Handlers
    const onConfirm = async () => {
        setIsLoading(true)
        const {phone} = await getAccountDetails();
        const details: CreateTransferIn = {
            tag: comment,
            amount: amount,
            currency: $const,
            recipient: phone,
            client_nonce: getRandomInt32(),
            project: networkType === 232 ? 3 : networkType === 233 ? 1 : 4
        };
        const params = {
            confirmationCode: stage.code,
            confirmationTimetick: stage.txId
        }

        const response = await apiInternalTransfer(details, params);

        actionResSuccess(response)
          .success(() => {
              const result: CreateWithdrawOut = uncoverResponse(response);
              const isStage = [0, 1, 2].includes(result.confirmationStatusCode);
              if (isStage) {
                  setStage(prev => ({
                      ...prev,
                      status: result.confirmationStatusCode,
                      txId: result.txId,
                  }))
              }
              if (result.confirmationStatusCode === 4) {
                  handleCancel();
                  setRefresh();
                  displayHistory();
                  setContent({
                      title: 'Successfully transaction',
                      content: <ModalTrxStatusSuccess/>
                  });
              } else {
                  localErrorHunter({message: "Something went wrong.", code: 1})
              }
          })
          .reject(localErrorHunter);

        setIsLoading(false);
    }

    // Effects
    useEffect(() => {
        (async () => {
            const details = {
                tag: comment,
                amount: amount,
                currency: $const,
            }
            const {phone} = await getAccountDetails();

            const response = await apiInternalTransfer({
                ...details,
                recipient: phone,
                client_nonce: getRandomInt32(),
                project: networkType === 232 ? 3 : networkType === 233 ? 1 : 4
            });
            
            actionResSuccess(response)
                .success(() => {
                    const {
                        txId,
                        message,
                        create_result,
                        confirmationStatusCode
                    }: CreateWithdrawOut = uncoverResponse(response);
                    
                    if (confirmationStatusCode === 0
                        || confirmationStatusCode === 1
                        || confirmationStatusCode === 2) {
                        setStage(prev => ({
                            ...prev,
                            txId: txId,
                            code: message,
                            recipient: create_result,
                            status: confirmationStatusCode
                        }))
                    } else {
                        localErrorHunter({message: "Something went wrong.", code: 1});
                    }
                })
                .reject(localErrorHunter);

            setIsLoading(false);
        })()
    }, []);

    // Helpers
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    const projectConfirmInfo: { label: string, value: string }[] = [
        { label: t("type_transaction"), value: label },
        { label: "Amount", value: `${amount} ${$const}` },
        ...(comment ? [{ label: t("description"), value: comment }] : [])
    ]

    return (
      <ConfirmLoading isLoading={isLoading}>
          <Notice text={t("check_your_information_carefully")} />

              <div className="flex flex-col gap-[25px] mb-[30px]">
                  <div className="flex flex-col gap-[10px]">
                      {projectConfirmInfo.map(({ label, value }) => (
                        <div key={value}>
                            <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{label}</p>
                            <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{value}</p>
                        </div>
                      ))}
                  </div>
              </div>

              {localErrorInfoBox}

              <div className="w-full mb-[20px]">
                <Commissions
                    youWillPay={amount}
                    youWillGet={amount}
                    fee={"-"}
                />
             </div>

              <ConfirmButtons
                onConfirm={onConfirm}
                onCancel={handleCancel}
              />
          <ConfirmButtons onConfirm={onConfirm} onCancel={handleCancel} />  
      </ConfirmLoading>
    )
}

export default CrossProjectConfirm;

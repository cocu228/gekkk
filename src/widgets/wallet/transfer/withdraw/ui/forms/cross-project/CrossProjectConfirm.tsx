import Loader from "@/shared/ui/loader";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiInternalTransfer} from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, uncoverResponse} from "@/shared/lib/helpers";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {CreateWithdrawOut} from "@/shared/(orval)api/gek/model";
import {useTranslation} from "react-i18next";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import {CtxDisplayHistory} from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import ConfirmNotice from "@/widgets/wallet/transfer/components/confirm-notice";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";

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
    const {t} = useTranslation();
    const {$const} = useContext(CtxWalletData);
    const {setRefresh} = useContext(CtxRootData);
    const [stage, setStage] = useState(initStageConfirm);
    const [loading, setLoading] = useState<boolean>(true);
    const {setContent} = useContext(CtxGlobalModalContext);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const [localErrorHunter, ,localErrorInfoBox,] = useError();
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const details = useRef({
        tag: comment,
        amount: amount,
        currency: $const,
    });

    useEffect(() => {
        (async () => {
            const {phone} = await getAccountDetails();

            const response = await apiInternalTransfer({
                ...details.current,
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
                    }
                    else {
                        localErrorHunter({message: "Something went wrong.", code: 1});
                    }
                })
                .reject(localErrorHunter);

            setLoading(false);
        })()
    }, []);
    
    const onConfirm = async () => {
        setLoading(true);

        const {phone} = await getAccountDetails();

        const response = await apiInternalTransfer({
            ...details.current,
            recipient: phone,
            client_nonce: getRandomInt32(),
            project: networkType === 232 ? 3 : networkType === 233 ? 1 : 4
        }, {
            confirmationCode: stage.code,
            confirmationTimetick: stage.txId
        });
        
        actionResSuccess(response)
            .success(() => {
                const result: CreateWithdrawOut = uncoverResponse(response);
                
                if (result.confirmationStatusCode === 0
                    || result.confirmationStatusCode === 1
                    || result.confirmationStatusCode === 2) {
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
                        title: 'Successfull transaction',
                        content: <ModalTrxStatusSuccess/>
                    });
                } else {
                    localErrorHunter({message: "Something went wrong.", code: 1})
                }
            })
            .reject(localErrorHunter);

        setLoading(false);
    }

    const projectConfirmInfo: { label: string, value: string }[] = [
        { label: t("type_transaction"), value: label },
        { label: "Amount", value: `${amount} ${$const}` },
        ...(comment ? [{ label: t("description"), value: comment }] : [])
    ]

    return loading ?
      <Loader className='relative my-20'/> : (
          <div>
              <ConfirmNotice text={t("check_your_information_carefully")} />

              <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
                  <div className="flex flex-col gap-[10px]">
                      {projectConfirmInfo.map(({ label, value }) => (
                        <div key={value}>
                            <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{label}</p>
                            <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{value}</p>
                        </div>
                      ))}
                  </div>
              </div>

              {localErrorInfoBox ? <div className="w-full mb-[30px]">{localErrorInfoBox}</div> : null}

              <ConfirmButtons
                onConfirm={onConfirm}
                onCancel={handleCancel}
              />
          </div>
        )
}

export default CrossProjectConfirm;

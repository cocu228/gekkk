import Button from "@/shared/ui/button/Button";
import {useState} from "react";
import {apiCancelCode} from "@/shared/(orval)api/gek";
import {actionResSuccess} from "@/shared/lib/helpers";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import Loader from "@/shared/ui/loader";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { formatForHistoryMobile, formatForHistoryTimeMobile } from "@/shared/lib/date-helper";
import { modalDateArray } from "./TransferTableCode";
import { Modal } from "@/shared/ui/modal/Modal";
import ConfirmNotice from "@/widgets/wallet/transfer/components/confirm-notice";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";

const CancelContent = ({code, amount, confirm, currency, date = null}) => {
    const {t} = useTranslation();
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)
    const {showModal, isModalOpen, handleCancel} = useModal()
    const {md} = useBreakpoints()

    const onBtnCancel = async () => {
        setLoading(true)
        const response = await apiCancelCode({
            code: code
        });
        
        actionResSuccess(response).success(() => {
            getListTxCode()
        }).reject(() => {
        })
        setLoading(false)
        handleCancel()
    }

    const modalKeys = {
        'code': code,
        'date': `${formatForHistoryMobile(date)} at ${formatForHistoryTimeMobile(date)}`,
        'amount': `${amount} ${currency}`,
    }

    return (
      <>
        <Button size="sm" className="w-full" color="red" skeleton onClick={showModal}><span className='text-[12px]'>{t("cancel")}</span></Button>
        <Modal placeBottom={md} title={t("cancel_code")} isModalOpen={isModalOpen} onCancel={handleCancel}>
            {loading ? (
              <div className="relative min-h-[200px]">
                <Loader/>
              </div>
            ) : (
                 <div>
                     <ConfirmNotice text={t("code_will_be_deleted")} />
                     <div className="flex flex-col px-[10px] gap-[25px] mb-[30px]">
                         <div className="flex flex-col gap-[10px]">
                             {
                                 modalDateArray.map((item) => (
                                   <div key={item.key}>
                                       <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{t(item.titleKey)}</p>
                                       <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">
                                           {modalKeys[item.key]}
                                       </p>
                                   </div>
                                 ))
                             }
                         </div>
                     </div>
                     <ConfirmButtons
                        onConfirm={onBtnCancel}
                        onCancel={handleCancel}
                     />
                </div>
            )}
        </Modal>
    </>
    )
}

export default CancelContent;

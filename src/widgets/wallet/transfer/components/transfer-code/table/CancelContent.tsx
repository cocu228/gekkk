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
import style from './style.module.scss'
import { modalDateArray } from "./TransferTableCode";
import { Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";

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

    return <>
    <Button size="sm" className="w-full" color="red" skeleton onClick={showModal}><span className='text-[12px]'>{t("cancel")}</span></Button>
    <ModalUi
        title={t("cancel_code")} isModalOpen={isModalOpen} onCancel={handleCancel}>
            {loading ? <Loader/> : <div>
            <div className="row w-full py-4 mb-6">
                <p className="text-[13px] sm:text-[12px]">{t("code_will_be_deleted")}</p>
            </div>
            <div className="w-full flex-col mb-6 flex justify-center">
            <div className={style.ModalDateList}>
                {
                    modalDateArray.map((item, ind) => (
                        <div key={ind} className={style.ModalDateListItem}>
                            <span className={style.ModalDateListItemTitleCancel} >{t(item.titleKey)}</span>
                            <span className={style.ModalDateListItemValueCancel}>{modalKeys[item.key]}</span>
                        </div>
                    ))
                }
            </div>
            </div>
            
            <div className="flex flex-row gap-5">
                <Button className="w-full" size="lg" onClick={onBtnCancel}>{t("confirm")}
                </Button>
                <Button skeleton color='blue' className="w-full" size="lg" onClick={handleCancel}>{t("cancel")}
                </Button>
            </div>
        </div>}
    </ModalUi></>
}

export default CancelContent;

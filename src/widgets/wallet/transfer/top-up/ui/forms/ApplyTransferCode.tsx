import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useState} from "react";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import {apiApplyCode} from "@/shared/(orval)api/gek";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import CodeTxInfo from "@/widgets/wallet/transfer/components/transfer-code/CodeTxInfo";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from 'react-i18next';
import {TxCodesOut} from "@/shared/(orval)api/gek/model";
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { validateInput } from "@/shared/ui/input/model/helpers";
import styles from "./style.module.scss"

const ApplyTransferCode = () => {
    const {t} = useTranslation();
    const {showModal, isModalOpen, handleCancel} = useModal()
    const {setRefresh} = useContext(CtxRootData)
    const [input, setInput] = useState("")
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)
    const [infoCode, setInfoCode] = useState<TxCodesOut>(null)
    const {md} = useBreakpoints()

    const [localErrorHunter, , applyTxCodeInfoBox, localErrorClear, localIndicatorError] = useError()

    useEffect(() => {

        if (!!infoCode || localIndicatorError) {
            setInfoCode(null)
        }
    }, [isModalOpen])

    const onBtnApply = async () => {

        setLoading(true)

        const response = await apiApplyCode({
            code: input
        });

        actionResSuccess(response).success(async () => {
            setRefresh()
            handleCancel()
            localErrorClear()
            setInput("")
            await getListTxCode()
        }).reject((error) => {
            // handleCancel()
            localErrorHunter(error)
        })


        setLoading(false)

    }

    return <div>
        <TransferCodeDescription/>
        
        <div className={styles.Code}>
            <div className={styles.CodeInputsWrapper}>
                {!md ? <Input 
                    value={input} 
                    disabled={loading}
                    wrapperClassName={"w-full"}
                    allowDigits
                    onChange={({target}) => setInput(target.value)}
                    placeholder={t("enter_top_up_code")} type={"text"}
                />
                :
                    <div className={styles.CodeInputsMobileWrapper}>
                        <input
                            value={input}
                            disabled={loading}
                            onChange={(event) => {
                                if(validateInput(event, true, false)){
                                    setInput(event.target.value)
                                }
                            }}
                            className={styles.CodeInputsMobile} 
                            placeholder={`-${t("enter_top_up_code").toLowerCase()}-`} 
                            type="text"
                         />
                    </div>
                }
            </div>
            <div className={styles.CodeButtonWrapper}>

                <Button 
                    disabled={input === "" || loading} 
                    onClick={showModal}
                    size={md ? "md" : "lg"}
                    className={styles.CodeButton}
                >
                    {t("apply")}
                </Button>

                <Modal closable={false} padding title={<ModalTitle handleCancel={handleCancel} title={infoCode ? t("code_applied_successfully") : t("transfer_code_info")}/>}
                           onCancel={handleCancel} open={isModalOpen}>

                        {loading ? <Loader/> : !infoCode ?
                            <CodeTxInfo applyTxCodeInfoBox={applyTxCodeInfoBox} code={input} onBtnApply={onBtnApply}/> :
                            <>
                                <div className="row mb-6">
                                    <div className="col">
                                        <p className="text-sm">{t("your_account_has_been_topped")}</p>
                                    </div>
                                </div>
                                <div className="row mb-12">
                                    <div className="col">
                                        <p className="text-xl text-green">{infoCode.amount} {infoCode.currency}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="flex justify-center col">
                                        <Button className="w-full" size="lg" onClick={() => {
                                            handleCancel()
                                        }}>{t("done")}</Button>
                                    </div>
                                </div>
                            </>}
                    </Modal>
            </div>
        </div>
        <div className="row mt-10">
            <TransferTableCode/>
        </div>
    </div>

}

export default ApplyTransferCode

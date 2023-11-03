import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useState} from "react";
import TransferTableCode from "@/widgets/wallet/code-transfer/TransferTableCode";
import {apiApplyCode} from "@/shared/api";
import {storeListTxCode} from "@/widgets/wallet/code-transfer/store/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import CodeTxInfo from "@/widgets/wallet/code-transfer/CodeTxInfo";
import Loader from "@/shared/ui/loader";
import {IResCodeTxInfo} from "@/widgets/wallet/code-transfer/api/code-tx-info";
import {CtxRootData} from "@/processes/RootContext";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from 'react-i18next';

const ApplyCode = () => {

    const {t} = useTranslation();
    const {showModal, isModalOpen, handleCancel} = useModal()
    const {setRefresh} = useContext(CtxRootData)
    const [input, setInput] = useState("")
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)
    const [infoCode, setInfoCode] = useState<IResCodeTxInfo>(null)

    const [localErrorHunter, , applyTxCodeInfoBox, localErrorClear, localIndicatorError] = useError()

    useEffect(() => {

        if (!!infoCode || localIndicatorError) {
            setInfoCode(null)
        }
    }, [isModalOpen])

    const onBtnApply = async () => {

        setLoading(true)

        const response = await apiApplyCode(input)

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

    return <>
        <div className="row flex gap-10">
            <div className="col flex items-center w-3/5">
                <Input value={input} disabled={loading}
                       wrapperClassName={"w-full"}
                       onChange={({target}) => setInput(target.value)}
                       placeholder={t("enter_top_up_code")} type={"text"}/>
            </div>
            <div className="col h-inherit flex items-center w-2/5">
                <Button disabled={input === "" || loading} onClick={showModal}
                        size={"xl"}
                        className={"w-full !h-full !font-medium"}>
                    {t("apply")}
                </Button>

                <Modal title={infoCode ? t("code_applied_successfully") : t("transfer_code_info")}
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
                                    <div className="col">
                                        <Button className="w-full" size={"xl"} onClick={() => {
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
    </>

}

export default ApplyCode

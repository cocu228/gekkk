import {Input} from "antd";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useState} from "react";
import TransferTableCode from "@/widgets/wallet/transfer/TransferTableCode";
import {apiApplyTxCode} from "@/shared/api";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import CodeTxInfo from "@/widgets/wallet/transfer/CodeTxInfo";
import Loader from "@/shared/ui/loader";
import {IResCodeTxInfo} from "@/widgets/wallet/transfer/api/code-tx-info";
import {CtxRootData} from "@/processes/RootContext";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";

const ApplyCode = () => {

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

        const response = await apiApplyTxCode(input)

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
                <Input className={"w-full"} value={input} disabled={loading}
                       onChange={({target}) => setInput(target.value)}
                       placeholder={"Enter top up code"} type={"text"}/>
            </div>
            <div className="col h-inherit flex items-center w-2/5">
                <Button disabled={input === "" || loading} onClick={showModal}
                        size={"xl"}
                        className={"w-full !h-full !font-medium"}>
                    Apply
                    </Button>

                    <Modal title={infoCode ? "The code applied successfully" : "Transfer code info"}
                           onCancel={handleCancel} open={isModalOpen}>

                        {loading ? <Loader/> : !infoCode ?
                            <CodeTxInfo applyTxCodeInfoBox={applyTxCodeInfoBox} code={input} onBtnApply={onBtnApply}/> :
                            <>
                                <div className="row mb-6">
                                    <div className="col">
                                        <p className="text-sm">Your account has been topped up for the amount:</p>
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
                                        }}>Done</Button>
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
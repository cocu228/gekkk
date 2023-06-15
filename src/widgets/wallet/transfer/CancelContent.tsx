import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import React, {useState} from "react";
import {apiCancelTxCode} from "@/widgets/wallet/transfer/api/cancel-code";
import {actionResSuccess} from "@/shared/lib/helpers";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import Loader from "@/shared/ui/loader";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";

const CancelContent = ({code, amount, confirm, currency}) => {

    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)
    const {showModal, isModalOpen, handleCancel} = useModal()

    const onBtnCancel = async () => {
        setLoading(true)
        const response = await apiCancelTxCode(code)

        actionResSuccess(response).success(() => {
            getListTxCode()
        }).reject(() => {
        })
        setLoading(false)
        handleCancel()


    }

    return <>
        <Button onClick={showModal} size={"sm"} gray
                className={"!py-3 !h-[fit-content]"}>Cancel</Button>
        <Modal
            title={"Deleting transfer code"} open={isModalOpen} onCancel={handleCancel}>
            {loading ? <Loader/> : <div>
                <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                    <p>This code will be deleted from the system. It will not be possible to transfer
                        funds using this code.</p>
                </div>
                <div className="row mb-6 flex justify-center">
                    <div
                        className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                        <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                            <ReactQRCode
                                size={120}
                                style={{height: "auto", maxWidth: "100%", width: "100%"}}
                                value={code}
                                viewBox={`0 0 148 148`}
                            />
                        </div>
                    </div>
                </div>
                <div className="row flex justify-center mb-6">
                    <div className="col">
                        <span className="font-medium text-lg">{code}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <div className="col">
                        <div className="row mb-4 w-full flex">
                            <div className="col w-1/2">
                                <div className="row flex">
                                    <div className="col">
                                        <span className="text-gray-400 mr-2">Amount:</span>
                                    </div>
                                    <div className="col">
                                        <span
                                            className="text-green text-right">{amount} {currency}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col w-1/2">
                                <div className="row flex">
                                    <div className="col">
                                        <span className="text-gray-400 mr-2">Confirmation:</span>
                                    </div>
                                    <div className="col">
                                        <span>{confirm ? "used" : "not used"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Button className="w-full" size="xl" onClick={onBtnCancel}>Delete this code
                    </Button>
                </div>
            </div>}
        </Modal></>
}

export default CancelContent
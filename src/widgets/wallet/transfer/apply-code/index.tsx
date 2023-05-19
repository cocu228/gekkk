import {Form, Input} from "antd";
import Button from "@/shared/ui/button/Button";
import {useState} from "react";
import TransferTableCode from "@/widgets/wallet/transfer/TransferTableCode";
import {apiApplyTxCode} from "@/shared/api";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";

const ApplyCode = () => {
    const [input, setInput] = useState("")
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)


    const {showModal, isModalOpen, handleCancel} = useModal()
    // const getDefaultListBalance = storeListAvailableBalance(state => state.getDefaultListBalance)
    // const setSortedListBalance = storeListAvailableBalance(state => state.setSortedListBalance)
    // const getListAllCryptoName = storeListAllCryptoName(state => state.getListAllCryptoName)
    const onBtnApply = async () => {
        setLoading(true)
        const response = await apiApplyTxCode(input)

        if (response.data.error === null) {

        }

        await getListTxCode()

        showModal()
        setLoading(false)
        setInput("")
    }

    return <>
        <Form onFinish={() => null}>
            <div className="row flex gap-10 mb-10">
                <div className="col flex items-center w-3/5">
                    <Input className={"w-full"} value={input} disabled={loading}
                           onChange={({target}) => setInput(target.value)}
                           placeholder={"Enter top up code"} type={"text"}/>
                </div>
                <div className="col h-inherit flex items-center w-2/5">
                    <Button disabled={input === "" || loading} onClick={onBtnApply} htmlType={"submit"}
                            size={"xl"}
                            className={"w-full !h-full !font-medium"}>
                        Apply
                    </Button>
                    <Modal title={"The code applied successfully"} onCancel={handleCancel} open={isModalOpen}>
                        <div className="row mb-6">
                            <div className="col">
                                <p className="text-sm">Your account has been topped up for the amount:</p>
                            </div>
                        </div>
                        <div className="row mb-12">
                            <div className="col">
                                <p className="text-xl text-green">100.00 EURG</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Button className="w-full" size={"xl"} onClick={handleCancel}>Done</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </Form>
        <div className="row">
            <TransferTableCode/>
        </div>
    </>

}

export default ApplyCode
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import InfoBox from "@/widgets/info-box";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";

const UnknownTransactions = () => {
    const {showModal, isModalOpen, handleCancel} = useModal()
    return <>
        <InfoBox>
            <p className="font-medium text-orange">You have unknown incoming transaction. Please enter the sender's name <a className="underline text-blue-400" onClick={showModal} href="javascript:void(0)">here</a></p>
            <Modal title={"Unknown transactions"} open={isModalOpen} onCancel={handleCancel}>
                <Row/>
            </Modal>
        </InfoBox>
    </>
}

const Row = () => {
    return <div className="row font-medium">
        <div className="col">
            <div className="row mb-2 flex justify-between">
                <div className="col">
                    <img width={12} height={12} src="/img/icon/Download.svg" alt="Download"/>
                </div>
                <div className="col">
                    <span>813.04.2023 11.34 AM</span>
                </div>
                <div className="col">
                    <span className="text-green">80.00 USDT</span>
                </div>
            </div>
            <div className="row mb-2 flex gap-3">
                <div className="col">
    <span className="whitespace-nowrap">
        Received from:
    </span>
                </div>
                <div className="col">
                    <span className="break-all">0xb76fc3a09c6c958*****67e49a47cc</span>
                </div>
            </div>
            <div className="row mb-2 flex">
                <div className="col">
                    <span>Sender name:</span>
                </div>
            </div>
            <div className="row flex gap-3">
                <div className="col w-3/5"><Input/></div>
                <div className="col w-2/5"><Button size={"xl"} className="w-full">Apply</Button></div>
            </div>
        </div>
    </div>
}

export default UnknownTransactions
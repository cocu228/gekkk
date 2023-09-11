import Button from "@/shared/ui/button/Button";
import TransferTableCode from "@/widgets/wallet/code-transfer/TransferTableCode";
import Modal from "@/shared/ui/modal/Modal";
import CreateCode from "@/widgets/wallet/code-transfer/create-transfer/CreateCode";
import useModal from "@/shared/model/hooks/useModal";

const CreateTransferCode = () => {

    const {isModalOpen, showModal, handleCancel} = useModal()

    return <>
        <div className="row mb-5">
            <Button onClick={showModal} size={"xl"} className="w-full !font-medium">Create transfer code...</Button>
            <Modal onCancel={handleCancel} title={"Create transfer code"} open={isModalOpen}>
                <CreateCode/>
            </Modal>
        </div>
        <div className="row mb-2">
            <h3 className="text-lg font-bold">
                Unredeemed codes info
            </h3>
        </div>
        <div className="row">
            <TransferTableCode isOwner/>
        </div>
    </>

}

export default CreateTransferCode

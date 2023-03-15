import {Modal} from "antd";

interface IResultDepositModal {
    isModalOpen: boolean,
    handleCancel: () => void
}

const ResultDepositModal = ({isModalOpen, handleCancel}: IResultDepositModal) => {

    return (
        <Modal open={isModalOpen} footer={null} onCancel={handleCancel} width="454px">
            <div className="p-10 pb-44">
                <p className="font-base font-bold text-center">
                    Your request to open a deposit has been successfully added to the queue.
                    It should be open in a minute.
                    If it’s not, please, contact <span className="text-blue">our support</span>
                </p>
            </div>
        </Modal>
    )
}

export default ResultDepositModal
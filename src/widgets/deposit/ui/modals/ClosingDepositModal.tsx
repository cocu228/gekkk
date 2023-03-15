import {Modal, Button} from "antd";

interface IClosingDepositModal {
    isModalOpen: boolean,
    handleCancel: () => void
}

const ClosingDepositModal = ({isModalOpen, handleCancel}: IClosingDepositModal) => {

    return (
        <Modal open={isModalOpen} footer={null} onCancel={handleCancel} width="454px">
            <div className="py-10 px-8 text-gekDarkGray">
                <p className="font-bold text-xl mb-6">Closing your deposit</p>

                <div className="mb-4">
                    <p className="font-medium text-gray mb-1">Deposit:</p>
                    <p className="font-medium">Fixed rate deposit: 0,8% per month</p>
                </div>

                <div className="mb-4 flex justify-between">
                    <div>
                        <p className="font-medium text-gray mb-1">Amount:</p>
                        <p className="font-medium">1000 EURG</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray mb-1">Until:</p>
                        <p className="font-medium">22.02.2024 at 16:04</p>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="font-medium text-gray mb-1">Your balance if you close the deposit now:</p>
                    <p className="font-medium">1000 EURG</p>
                </div>

                <div className="flex gap-5">
                    <Button className="w-full !text-white rounded-b bg-blue-600 disabled:opacity-50" onClick={handleCancel}>Close deposit</Button>
                    <Button className="w-full !text-white rounded-b bg-blue-600 disabled:opacity-50" onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default ClosingDepositModal
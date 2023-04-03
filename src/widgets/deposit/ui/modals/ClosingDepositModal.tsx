import Button from "@/shared/ui/button/Button";
import { ModalProps } from "antd";
import Modal from "@/shared/ui/modal/Modal";

const ClosingDepositModal = ({open, onCancel, ...props}: ModalProps) => {

    return (
        <Modal open={open} onCancel={onCancel} {...props}>
            <p className="font-bold text-xl mb-6 md:text-lg md:mb-5">Closing your deposit</p>
            <div className="mb-4">
                <p className="font-medium text-gray-500 mb-1">Deposit:</p>
                <p className="font-medium">Fixed rate deposit: 0,8% per month</p>
            </div>

            <div className="mb-4 flex justify-between">
                <div>
                    <p className="font-medium text-gray-500 mb-1">Amount:</p>
                    <p className="font-medium">1000 EURG</p>
                </div>
                <div>
                    <p className="font-medium text-gray-500 mb-1">Until:</p>
                    <p className="font-medium">22.02.2024 at 16:04</p>
                </div>
            </div>

            <div className="mb-8 md:mb-4">
                <p className="font-medium text-gray-500 mb-1">Your balance if you close the deposit now:</p>
                <p className="font-medium">1000 EURG</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Button className="w-full flex-1" gray onClick={onCancel as () => void}>Close deposit</Button>
                <Button className="w-full !text-white rounded-b bg-blue-600 disabled:opacity-50" onClick={onCancel as () => void}>Cancel</Button>
            </div>
        </Modal>
    )
}

export default ClosingDepositModal
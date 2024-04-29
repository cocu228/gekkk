import { ModalProps } from "antd";
import Modal from "@/shared/ui/modal/Modal";
import { IconApp } from "@/shared/ui/icons/icon-app";

const ClosingConditionsModal = ({ open, onCancel, ...props }: ModalProps) => {

    return (
        <Modal padding open={open} onCancel={onCancel} {...props}>
            <p className="mb-5 font-medium">Opened deposit can be closed before its closing date by the Client according to the following conditions:</p>

            <div className="mb-10 md:pl-7">
                <p className="mb-4 font-medium">For the fixed rate deposits:</p>
                <div className="relative">
                    <IconApp className="absolute -left-7 top-0" code="t47" size={13} color="#B4C0CD" />
                    <p className="text-gray-500 font-medium">the loss of interest in the current month.</p>
                </div>
            </div>

            <div className="md:pl-7">
                <p className="mb-4 font-medium">For the structured deposits:</p>
                <div className="relative">
                    <IconApp className="absolute -left-7 top-0" code="t47" size={13} color="#B4C0CD" />
                    <p className="text-gray-500 mb-4 font-medium">
                        in case of zero or positive growth
                        of the cryptocurrency rate: the nominal amount of deposit is returned to the Client minus the largest allowed percentage
                        of losses (if strategy allows to lose up to 5%, then 5% will be subtracted from the amount of deposit);
                    </p>
                </div>
                <div className="relative">
                    <IconApp className="absolute -left-7 top-0" code="t47" size={13} color="#B4C0CD" />
                    <p className="text-gray-500 font-medium">
                        in case of negative growth (fall)
                        of the cryptocurrency rate: the nominal amount of deposit is returned to the Client with a correspondent percentage
                        of cryptocurrency rate fall (if the fall is 30% then 30% of deposit amount will be subtracted).
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default ClosingConditionsModal;

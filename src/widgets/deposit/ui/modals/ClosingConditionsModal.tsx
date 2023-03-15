import {Modal} from "antd";

interface IClosingConditionsModal {
    isModalOpen: boolean,
    handleCancel: () => void
}

const ClosingConditionsModal = ({isModalOpen, handleCancel}: IClosingConditionsModal) => {

    return (
        <Modal open={isModalOpen} footer={null} onCancel={handleCancel} width="454px">
            <div className="py-10 px-14 text-gekDarkGray">
                <p className="mb-5 font-medium">Opened deposit can be closed before its closing date by the Client according to the following conditions:</p>

                <div className="mb-10">
                    <p className="mb-4 font-medium">For the fixed rate deposits:</p>
                    <div className="relative">
                        <img className="absolute -left-7 top-0" src="/public/img/icon/CheckMark.svg" width={18} height={16} alt="check"/>
                        <p className="text-gray font-medium">the loss of interest in the current month.</p>
                    </div>
                </div>

                <div>
                    <p className="mb-4 font-medium">For the structured deposits:</p>
                    <div className="relative">
                        <img className="absolute -left-7 top-0" src="/public/img/icon/CheckMark.svg" width={18} height={16} alt="check"/>
                        <p className="text-gray mb-4 font-medium">
                            in case of zero or positive growth
                            of the cryptocurrency rate: the nominal amount of deposit is returned to the Client minus the largest allowed percentage
                            of losses (if strategy allows to lose up to 5%, then 5% will be subtracted from the amount of deposit);
                        </p>
                    </div>
                    <div className="relative">
                        <img className="absolute -left-7 top-0" src="/public/img/icon/CheckMark.svg" width={18} height={16} alt="check"/>
                        <p className="text-gray font-medium">
                            in case of negative growth (fall)
                            of the cryptocurrency rate: the nominal amount of deposit is returned to the Client with a correspondent percentage
                            of cryptocurrency rate fall (if the fall is 30% then 30% of deposit amount will be subtracted).
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ClosingConditionsModal
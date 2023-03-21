import {Modal} from "antd";
import Button from "@/shared/ui/button/Button";
import InlineProperty from "@/shared/ui/inline-property";

interface IParamsDepositModal {
    isModalOpen: boolean,
    handleCancel: () => void
}

const ParamsDepositModal = ({isModalOpen, handleCancel}: IParamsDepositModal) => {

    return (
        <Modal open={isModalOpen} footer={null} onCancel={handleCancel} width="454px">
            <div className="p-10">
                <p className="font-bold text-xl">Your deposit parameters</p>
                <div className="pt-5 pb-8">
                    <InlineProperty left="Deposit" right="Fixed rate deposit: 0,8% per month"/>
                    <InlineProperty left="Opened" right="25.01.2023 at 16:04"/>
                    <InlineProperty left="Deposit amount" right="1000 EURG"/>
                    <InlineProperty left="Payments" right="Every 30 days"/>
                    <InlineProperty left="Term" right="360 days (until 22.02.2024 at 16:04)"/>
                </div>
                <Button className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"} onClick={handleCancel}>Confirm</Button>
            </div>
        </Modal>
    )
}

export default ParamsDepositModal
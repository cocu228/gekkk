import {ModalProps} from "antd";
import Button from "@/shared/ui/button/Button";
import InlineProperty from "@/shared/ui/inline-property";
import Modal from "@/shared/ui/modal/Modal";

interface IOpenDepositModal extends ModalProps {
    depositParams: {
        deposit: string,
        opened: string,
        amount: string,
        term: string,
        startingRate?: string,
        payments?: string,
    }
}

const OpenDepositModal = ({open, onCancel, depositParams, ...props}: IOpenDepositModal) => {

    return (
        <Modal open={open} onCancel={onCancel} {...props}>
            <p className="font-bold text-xl">Your deposit parameters</p>
            
            <div className="pt-5 pb-8">
                <InlineProperty left="Deposit" right={depositParams.deposit}/>
                <InlineProperty left="Opened" right={depositParams.opened}/>
                <InlineProperty left="Deposit amount" right={depositParams.amount}/>
                {depositParams?.payments && <InlineProperty left="Payments" right={depositParams.payments}/>}
                {depositParams?.startingRate && <InlineProperty left="Starting rate" right={depositParams.startingRate}/>}
                <InlineProperty left="Term" right={depositParams.term}/>
            </div>
            <Button className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"} onClick={onCancel as () => void}>Confirm</Button>
        </Modal>
    )
}

export default OpenDepositModal
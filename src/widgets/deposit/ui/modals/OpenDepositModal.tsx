import {ModalProps} from "antd";
import Button from "@/shared/ui/button/Button";
import InlineProperty from "@/shared/ui/inline-property";
import Modal from "@/shared/ui/modal/Modal";

interface IOpenDepositModal extends ModalProps {
    depositParams: {
        deposit: string,
        opened: string,
        amount: number,
        term: string,
        startingRate?: string,
        payments?: string,
    }
}

const OpenDepositModal = ({open, onCancel, depositParams, ...props}: IOpenDepositModal) => {

    if (!depositParams) return null;

    const {
        term,
        opened,
        amount,
        deposit,
        payments,
        startingRate
    } = depositParams

    return (
        <Modal open={open} onCancel={onCancel} {...props}>
            <p className="font-bold text-xl">Your deposit parameters</p>
            
            <div className="flex flex-col gap-3 md:gap-2 pt-5 pb-8">
                <InlineProperty left="Deposit" right={deposit}/>
                <InlineProperty left="Opened" right={opened}/>
                <InlineProperty left="Deposit amount" right={`${amount} EURG`}/>
                {payments && <InlineProperty left="Payments" right={payments}/>}
                {startingRate && <InlineProperty left="Starting rate" right={startingRate}/>}
                <InlineProperty left="Term" right={term}/>
            </div>
            <Button
                className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"}
                onClick={onCancel as () => void}
            >
                Confirm
            </Button>
        </Modal>
    )
}

export default OpenDepositModal;

import useModal from "@/shared/model/hooks/useModal";
import {formatForCustomer} from "@/shared/lib/date-helper";
import Modal from "@/shared/ui/modal/Modal";
import {InfoConfirmPartner} from "@/widgets/history/ui/InfoConfirmPartner";
import InfoContent from "@/widgets/history/ui/InfoContent";
import {IResHistoryTransactions} from "@/shared/api";

const TransactionInfo = (props: IResHistoryTransactions) => {

    const {isModalOpen, showModal, handleCancel} = useModal();
    const dataCustomer = formatForCustomer(props.datetime);

    return <>
        <a className="underline cursor-pointer" onClick={showModal}>{dataCustomer}</a>
        <Modal width={450} title="Transaction info" onCancel={handleCancel}
               open={isModalOpen}>
                <InfoContent handleCancel={handleCancel} {...props}/>
        </Modal>
    </>
}

export default TransactionInfo
import useModal from "@/shared/model/hooks/useModal";
import React from "react";
import Modal from "@/shared/ui/modal/Modal";
import InfoContent from "@/widgets/history/ui/InfoContent";
import {IResHistoryTransactions} from "@/shared/api";


type TypeProps = {
    children: React.ReactNode,
    infoList: IResHistoryTransactions
}
const TransactionInfo = ({children, infoList}: TypeProps) => {

    const {isModalOpen, showModal, handleCancel} = useModal();

    return <>
        {children}
        <Modal width={450} title="Transaction info" onCancel={handleCancel}
               open={isModalOpen}>
            <InfoContent handleCancel={handleCancel} {...infoList}/>
        </Modal>
        <a className="absolute top-0 bottom-0 w-full left-0 cursor-pointer" onClick={showModal}> </a>
    </>
}

export default TransactionInfo
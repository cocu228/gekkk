import React, {memo, useState} from "react";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";

export default memo(function ({children}: { children: React.ReactNode }): JSX.Element | null {

    const {showModal, isModalOpen, handleCancel} = useModal()
    const [state, setState] = useState({
        title: null,
        content: null
    })

    const setContent = (content: JSX.Element, title = "Transaction information") => {
        setState({
            title,
            content
        })
        showModal()
    }

    const closeContent = () => {
        handleCancel()
        setState({
            title: null,
            content: null
        })
    }

    return <CtxModalTrxInfo.Provider value={
        setContent
    }>
        {children}
        <Modal
            width={450}
            open={isModalOpen}
            onCancel={closeContent}
            title={state.title}
        >
            {state.content}
        </Modal>
    </CtxModalTrxInfo.Provider>
})

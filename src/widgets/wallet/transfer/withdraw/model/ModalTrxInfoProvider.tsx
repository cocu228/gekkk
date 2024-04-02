import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import React, {memo, useCallback, useState} from "react";
import {CtxModalTrxResult, ITrxResultModalInfo} from "@/widgets/wallet/transfer/withdraw/model/context";

export default memo(function ({children}: { children: React.ReactNode }): JSX.Element | null {
    const {showModal, isModalOpen, handleCancel} = useModal();
    const [state, setState] = useState({
        title: 'Transaction status',
        content: null
    });

    const setContent = useCallback((config: ITrxResultModalInfo) => {
        setState({
            title: config.title,
            content: config.content
        });
        showModal();
    }, []);

    const closeContent = () => {
        handleCancel();
        setState({
            title: null,
            content: null
        });
    }

    return <CtxModalTrxResult.Provider value={{
        handleCancel: closeContent,
        setContent: setContent,
    }}>
        {children}
        <Modal
            width={450}
            open={isModalOpen}
            title={state.title}
            onCancel={closeContent}
        >
            {state.content}
        </Modal>
    </CtxModalTrxResult.Provider>
});

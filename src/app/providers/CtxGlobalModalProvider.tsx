import { FC, memo, PropsWithChildren, useCallback, useMemo, useState, createContext } from "react";

import useModal from "@/shared/model/hooks/useModal";
import { Modal } from "@/shared/ui/modal/Modal";

export interface ITrxResultModalInfo {
  title?: string;
  content: JSX.Element;
}

export interface ITrxResultContext {
  handleCancel: () => void;
  setContent: (config: ITrxResultModalInfo) => void;
}

export const CtxGlobalModalContext = createContext<ITrxResultContext>(null);

const CtxGlobalModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { showModal, isModalOpen, handleCancel } = useModal();
  const [state, setState] = useState({
    title: "Transaction status",
    content: null
  });

  const setContent = useCallback((config: ITrxResultModalInfo) => {
    setState({
      title: config.title,
      content: config.content
    });
    showModal();
  }, []);

  const closeContent = useCallback(() => {
    handleCancel();
    setState({
      title: null,
      content: null
    });
  }, []);

  const value = useMemo(
    () => ({
      handleCancel: closeContent,
      setContent: setContent
    }),
    []
  );

  return (
    <CtxGlobalModalContext.Provider value={value}>
      {children}
      <Modal isModalOpen={isModalOpen} title={state.title} onCancel={closeContent} noneHeader={true}>
        {state.content}
      </Modal>
    </CtxGlobalModalContext.Provider>
  );
};

export default memo(CtxGlobalModalProvider);

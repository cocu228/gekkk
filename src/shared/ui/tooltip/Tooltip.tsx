import { useContext } from "react";

import useModal from "@/shared/model/hooks/useModal";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

import { Modal } from "../modal/Modal";
import styles from "./style.module.scss";

type TooltipParams = {
  children?: JSX.Element | never[];
  text: string | JSX.Element;
};

const Tooltip = ({ children, text }: TooltipParams) => {
  const tooltipModal = useModal();
  const { xl } = useContext(BreakpointsContext);

  return (
    <div
      className={`inline-block absolute`}
      onClick={() => {
        if (xl && !tooltipModal.isModalOpen) tooltipModal.showModal();
      }}
    >
      <div className={`${styles.Child}`}>{children}</div>

      <div
        className={`${styles.TooltipContent} xl:hidden absolute z-20 invisible w-[300px] ease-out duration-500 bg-white text-gray-400 text-left p-[10px] border-r-[4px] shadow-md whitespace-pre-line text-sm`}
      >
        {text}
      </div>

      {!xl ? null : (
        <Modal
          title='Increased rate program'
          isModalOpen={tooltipModal.isModalOpen}
          onCancel={tooltipModal.handleCancel}
        >
          <div className='mb-10'>{text}</div>
        </Modal>
      )}
    </div>
  );
};

export default Tooltip;

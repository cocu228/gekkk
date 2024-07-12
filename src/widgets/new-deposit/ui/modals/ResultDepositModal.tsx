import { Modal } from "@/shared/ui/modal/Modal";

type IParams = {
  open: boolean;
  onCancel: () => void;
};

const ResultDepositModal = ({ open, onCancel }: IParams) => (
  <Modal isModalOpen={open} onCancel={onCancel} title='&nbsp;'>
    <p className='font-bold text-center mb-40 md:mb-30 md:text-base'>
      Your request to open a deposit has been successfully added to the queue. It should be open in a minute. If it’s
      not, please, contact <span className='text-blue-300'>our support</span>
    </p>
  </Modal>
);

export default ResultDepositModal;

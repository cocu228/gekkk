import Modal from '@/shared/ui/modal/Modal';
import { ModalProps} from 'antd';
import AssetsTable from '@/features/assets-table/ui/AssetsTable';
import {AssetTableKeys} from '@/features/assets-table/model/types';

const ChooseTokenModal = ({ open, onCancel, ...props }: ModalProps) => {
  return (
    <Modal width={450} title="Select a token" open={open} onCancel={onCancel} {...props}>
      <AssetsTable
        className='-mx-4 -mt-8 min-h-[500px]'
        modal={true}
        columnKeys={[
          AssetTableKeys.NAME,
          AssetTableKeys.PRICE
        ]}
      />
    </Modal>
  );
};

export default ChooseTokenModal;

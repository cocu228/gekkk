import { Modal } from "@/shared/ui/modal/Modal";
import AssetsTable from "@/features/assets-table/ui/AssetsTable";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { AssetTableKeys } from "@/features/assets-table/model/types";

type IParams = {
  onSelect: (value: string) => void;
  open: boolean;
  onCancel: () => void;
};

const ChooseTokenModal = ({ open, onSelect, onCancel }: IParams) => (
  <Modal title='Select a token' isModalOpen={open} onCancel={onCancel}>
    <AssetsTable
      className='-mx-4'
      onSelect={onSelect}
      modal={true}
      allowedFlags={[CurrencyFlags.StructInvestAvailable]}
      columnKeys={[AssetTableKeys.NAME, AssetTableKeys.PRICE]}
    />
  </Modal>
);

export default ChooseTokenModal;

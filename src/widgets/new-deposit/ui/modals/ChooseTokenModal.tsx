import { ModalProps } from 'antd';
import Modal from '@/shared/ui/modal/Modal';
import AssetsTable from '@/features/assets-table/ui/AssetsTable';
import { AssetTableKeys } from '@/features/assets-table/model/types';
import { CurrencyFlags } from '@/shared/config/mask-currency-flags';
import { useTranslation } from 'react-i18next';

type IParams = ModalProps & {
    onSelect: (value: string) => void;
}

const ChooseTokenModal = ({ open, onSelect, onCancel, ...props }: IParams) => {

    const {t} = useTranslation()

    return (
        <Modal width={450} title={t("select_a_token")} open={open} onCancel={onCancel} {...props}>
            <AssetsTable
                className='-mx-4 -mt-8'
                onSelect={onSelect}
                modal={true}
                allowedFlags={[
                    CurrencyFlags.StructInvestAvailable
                ]}
                columnKeys={[
                    AssetTableKeys.NAME,
                    AssetTableKeys.PRICE
                ]}
            />
        </Modal>
    );
};

export default ChooseTokenModal;

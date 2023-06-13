import { ModalProps } from 'antd';
import Modal from '@/shared/ui/modal/Modal';
// import { IResMarketAsset } from '@/shared/api';
// import { CurrencyFlags } from '@/shared/config/mask-currency-flags';

type IParams = ModalProps & {
    onSelect: (value: string) => void;
}

const ChooseTokenModal = ({ open, onSelect, onCancel, ...props }: IParams) => {
    return (
        <Modal width={450} title="Select a token" open={open} onCancel={onCancel} {...props}>
            {/*<AssetsTable*/}
            {/*    className='-mx-4 -mt-8'*/}
            {/*    onSelect={onSelect}*/}
            {/*    modal={true}*/}
            {/*    allowedFlags={[*/}
            {/*        CurrencyFlags.StructInvestAvailable*/}
            {/*    ]}*/}
            {/*    columnKeys={[*/}
            {/*        AssetTableKeys.NAME,*/}
            {/*        AssetTableKeys.PRICE*/}
            {/*    ]}*/}
            {/*/>*/}
        </Modal>
    );
};

export default ChooseTokenModal;

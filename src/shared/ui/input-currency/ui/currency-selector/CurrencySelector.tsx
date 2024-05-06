import styles from '../style.module.scss';
import React, {FC, useState} from "react";
import Modal from "@/shared/ui/modal/Modal";
import AssetsTable from "@/features/assets-table/ui/AssetsTable";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import {AssetTableKeys} from "@/features/assets-table/model/types";
import { useTranslation } from 'react-i18next';
import ModalTitle from '@/shared/ui/modal/modal-title/ModalTitle';

interface IParams {
    disabled?: boolean;
    className?: string;
    balanceFilter?: boolean;
    children?: React.ReactNode;
    excludedCurrencies?: Array<string>;
    allowedFlags?: null | Array<CurrencyFlags>;
    onSelect?: (value: string) => void;
}

const CurrencySelector: FC<IParams> = ({
    disabled,
    children,
    className,
    allowedFlags,
    balanceFilter,
    excludedCurrencies,
    onSelect
}: IParams) => {
    const [tokenSelectOpen, setTokenSelectOpen] = useState<boolean>(false);

    const {t} = useTranslation()

    const handleOpenTokenSelect = () => {
        setTokenSelectOpen(true);
    };

    const handleCloseTokenSelect = () => {
        setTokenSelectOpen(false);
    };

    return ( <>
        <div className="flex relative">
            <div className="w-full">
                {children}
            </div>
            <button
                disabled={disabled}
                className={`${styles.FieldSelectBtn} ${className} ${disabled ? 'hidden' : ''}`}
                onClick={handleOpenTokenSelect}>
            </button>
        </div>

        <Modal 
            className='max-h-[450px]' 
            width={450}
            closable={false}
            title={<ModalTitle handleCancel={handleCloseTokenSelect} title={t("select_a_token")}/>} 
            open={tokenSelectOpen} 
            onCancel={handleCloseTokenSelect}
            padding
        >
            <AssetsTable
                modal
                className='-mx-4 -mt-8 min-h-[500px]'
                balanceFilter={balanceFilter}
                onSelect={($const: string) => {
                    onSelect($const);
                    handleCloseTokenSelect();
                }}
                blockedCurrencies={excludedCurrencies}
                allowedFlags={allowedFlags}
                columnKeys={[
                    AssetTableKeys.NAME,
                    AssetTableKeys.BALANCE
                ]}
            />
        </Modal>
    </>)
}

export default CurrencySelector;

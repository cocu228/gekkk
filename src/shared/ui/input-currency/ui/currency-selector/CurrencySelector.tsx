import styles from '../style.module.scss';
import React, {FC, useState} from "react";
import AssetsTable from "@/features/assets-table/ui/AssetsTable";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import {AssetTableKeys} from "@/features/assets-table/model/types";
import { useTranslation } from 'react-i18next';
import { Modal } from "@/shared/ui/modal/Modal";

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
            title={t("select_a_token")}
            isModalOpen={tokenSelectOpen} 
            onCancel={handleCloseTokenSelect}
        >
            <div className='mt-[50px]'>
                <AssetsTable
                    border
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
            </div>
        </Modal>
    </>)
}

export default CurrencySelector;

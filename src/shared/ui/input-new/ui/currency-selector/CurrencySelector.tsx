import {useState} from "react";
import styles from '../style.module.scss';
import Modal from "@/shared/ui/modal/Modal";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {ICtxCurrencyData} from "@/processes/RootContext";
import AssetsTable from "@/features/assets-table/ui/AssetsTable";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import IconDoubleArrows from "@/shared/ui/icons/IconDoubleArrows";
import {AssetTableKeys} from "@/features/assets-table/model/types";

interface IParams {
    disabled?: boolean;
    balanceFilter?: boolean;
    currencySelector?: boolean;
    excludedCurrencies?: Array<string>;
    currencyData?: ICtxCurrencyData | null;
    allowedFlags?: null | Array<CurrencyFlags>;
    onCurrencyChange?: (currency: string) => void;
}

export default ({
    disabled,
    currencyData,
    allowedFlags,
    balanceFilter,
    currencySelector,
    excludedCurrencies,
    onCurrencyChange
}: IParams) => {
    const [tokenSelectOpen, setTokenSelectOpen] = useState<boolean>(false);

    const handleOpenTokenSelect = () => {
        setTokenSelectOpen(true);
    };

    const handleCloseTokenSelect = () => {
        setTokenSelectOpen(false);
    };

    return ( <>
        <button
            disabled={disabled || !currencySelector}
            className={styles.FieldSelectBtn + ' text-gray-600 select-none'}
            onClick={handleOpenTokenSelect}
            >
            {(!currencySelector || currencyData) && <>
                <IconCoin width={34} height={34} code={currencyData.currency}/>
            </>}

            <span className={"text-sm font-medium " + (currencySelector ? '' : 'mr-[17px]')}>
                {currencySelector && !currencyData ? 'Select token' : currencyData.currency}
            </span>    

            {currencySelector && <IconDoubleArrows/>}
        </button>

        <Modal width={450} title="Select a token" open={tokenSelectOpen} onCancel={handleCloseTokenSelect}>
            <AssetsTable
                className='-mx-4 -mt-8 min-h-[500px]'
                modal={true}
                balanceFilter={balanceFilter}
                onSelect={(currency: string) => {
                    onCurrencyChange(currency);
                    handleCloseTokenSelect();
                }}
                blockedCurrencies={excludedCurrencies}
                allowedFlags={allowedFlags}
                columnKeys={[
                    AssetTableKeys.NAME,
                    AssetTableKeys.CURRENCY
                ]}
            />
        </Modal>
    </>)
}

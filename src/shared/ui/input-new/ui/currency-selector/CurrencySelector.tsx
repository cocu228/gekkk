import styles from '../style.module.scss';
import Modal from "@/shared/ui/modal/Modal";
import {FC, useContext, useState} from "react";
import {CtxSelectorCurrency} from "../../model/context";
import AssetsTable from "@/features/assets-table/ui/AssetsTable";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import IconDoubleArrows from "@/shared/ui/icons/IconDoubleArrows";
import {AssetTableKeys} from "@/features/assets-table/model/types";
import {CtxRootData, ICtxCurrencyData} from "@/processes/RootContext";

interface IParams {
    balanceFilter?: boolean;
    children?: React.ReactNode;
    excludedCurrencies?: Array<string>;
    allowedFlags?: null | Array<CurrencyFlags>;
}

const CurrencySelector: FC<IParams> = ({
    children,
    allowedFlags,
    balanceFilter,
    excludedCurrencies
}: IParams) => {
    const {currencies} = useContext(CtxRootData);
    const [currency, setCurrency] = useState<ICtxCurrencyData>(null);
    const [tokenSelectOpen, setTokenSelectOpen] = useState<boolean>(false);

    const handleOpenTokenSelect = () => {
        setTokenSelectOpen(true);
    };

    const handleCloseTokenSelect = () => {
        setTokenSelectOpen(false);
    };

    return ( <>
        <div className="flex">
            <div className="w-full">
                <CtxSelectorCurrency.Provider value={currency}>
                    {children}
                </CtxSelectorCurrency.Provider>
            </div>

            <button className={styles.FieldSelectBtn} onClick={handleOpenTokenSelect}>
                <div className="mr-3">
                    <IconDoubleArrows/>
                </div>
            </button>
        </div>

        <Modal width={450} title="Select a token" open={tokenSelectOpen} onCancel={handleCloseTokenSelect}>
            <AssetsTable
                className='-mx-4 -mt-8 min-h-[500px]'
                modal={true}
                balanceFilter={balanceFilter}
                onSelect={(currency: string) => {
                    setCurrency(currencies.get(currency));
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

export default CurrencySelector;

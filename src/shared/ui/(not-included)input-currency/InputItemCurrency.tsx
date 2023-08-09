import {useContext, useEffect, useState} from "react";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import {Input as InputAnt} from "antd";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxInputCurrencyOptions} from "@/shared/ui/input-percents/model/context";
import {TypeInputCurrency} from "@/shared/ui/input-percents/model/types";
import {inputCurrencyValidation} from "@/shared/ui/input-currency/model/helpers";
import styles from './style.module.scss';
import IconDoubleArrows from "../icons/IconDoubleArrows";
import Modal from "../modal/Modal";
import AssetsTable from "@/features/assets-table/ui/AssetsTable";
import { AssetTableKeys } from "@/features/assets-table/model/types";
import Decimal from "decimal.js";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";

export default ({
    value,
    minValue = new Decimal(0),
    currency,
    allowedFlags,
    currencySelector,
    excludedCurrencies,
    disabled = false,
    balanceFilter = false,
    validateBalance = true,
    onChange,
    onCurrencyChange
}: TypeInputCurrency) => {
    const [tokenSelectOpen, setTokenSelectOpen] = useState<boolean>(false);

    const handleOpenTokenSelect = () => {
        setTokenSelectOpen(true);
    };

    const handleCloseTokenSelect = () => {
        setTokenSelectOpen(false);
    };

    const n = useContext(CtxInputCurrencyOptions)

    useEffect(() => {
        if (n) {onChange(n.toString())}
    }, [n])

    return <FormItem 
                className="relative"
                extra={(!currencySelector || currency) && inputCurrencyValidation(
                    !currency || !currency.availableBalance ? new Decimal(0) : currency.availableBalance,
                    value,
                    new Decimal(currencySelector && minValue ? minValue : 0),
                    validateBalance
                )}
            >
        <InputAnt
            onChange={({target}) => onChange(formatAsNumberAndDot(target.value.toString()))}
            disabled={disabled || !currency}
            value={value}
            placeholder={"Enter amount"}
            suffix={
                <>
                    <button
                        disabled={disabled || !currencySelector}
                        className={styles.FieldSelectBtn + ' text-gray-600 select-none'}
                        onClick={handleOpenTokenSelect}
                    >
                        {(!currencySelector || currency) && <>
                            <IconCoin width={34} height={34} code={currency.currency}/>
                        </>}

                        <span className="text-sm font-medium">
                            {currencySelector && !currency ? 'Select token' : currency.currency}
                        </span>    
                        
                        {currencySelector && <IconDoubleArrows/>}
                    </button>
                </>
            }
        />
        {!currency ? null : (
            <p className="text-xs text-gray-400 absolute top-11 left-3 z-10 select-none">
                Balance: {!currency.availableBalance ? 0 :
                    currency.availableBalance.toString()
                } {currency.currency}
            </p>
        )}

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
    </FormItem>
}

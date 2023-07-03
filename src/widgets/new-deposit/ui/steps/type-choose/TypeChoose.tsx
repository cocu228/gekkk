import {useContext} from 'react';
import Radio from '@/shared/ui/radio';
import {CtxNewDeposit} from '../../../model/context';
import $const from '@/shared/config/coins/constants';
import InputCurrencyPercented from '@/shared/ui/input-currency';
import {DepositType} from '@/shared/config/deposits/types';
import TypeDescriptions from '@/shared/config/deposits/deposit-type';
import { CtxRootData } from '@/app/RootContext';
import Decimal from 'decimal.js';

const TypeChoose = () => {
    const {
        type,
        amount,
        minAmount,
        onAmountChange,
        onDepositTypeChange
    } = useContext(CtxNewDeposit);

    const {currencies} = useContext(CtxRootData);
    const eurgWallet = currencies.get('EURG');

    return (
        <div className="px-10 mt-10 md:mt-4 md:px-4">
            <p className="text-base font-medium text-gray-400 mb-6 md:text-sm md:mb-4">
                Choose deposit types
            </p>

            <div className="wrapper grid grid-cols-2 gap-6 mb-8 w-full xxl:justify-between md:mb-4">
                {Object.values(DepositType).map((depositType) => (
                    <Radio
                        key={depositType}
                        title={depositType !== DepositType.FIXED ? "Structured" : "Fixed rate"}
                        subtitle={depositType !== DepositType.FIXED ? "Crypto investments with customizable risk/profit" :
                            <>
                                <span className="font-bold">9,6%</span> per annum (
                                <span className="font-bold">0,8%</span> per month)
                            </>
                        }
                        checked={type === depositType}
                        onChange={() => onDepositTypeChange(depositType)}
                        name="deposit-fixed"
                    />
                ))}
            </div>

            <div className="wrapper mb-5 hidden xl:block md:mb-5">
                {TypeDescriptions[type]}
            </div>

            <div className="wrapper w-full">
                <InputCurrencyPercented
                    value={amount}
                    minValue={minAmount}
                    currencyData={eurgWallet ? eurgWallet : {
                        currency: $const.EURG,
                        availableBalance: new Decimal(0),
                        id: null,
                        name: null,
                        flags: null,
                        minOrder: null,
                        roundPrec: null,
                        ordersPrec: null,
                        lockOrders: null,
                        decimalPrec: null,
                        lockInBalance: null,
                        lockOutBalance: null,
                        defaultTokenNetworkIn: null,
                        defaultTokenNetworkOut: null,
                    }}
                    onChange={(target) => {
                        onAmountChange(target);
                    }}
                    header={(
                        <p className="text-gray-400 font-medium text-base md:text-sm sm:text-xs">
                            Enter deposit amount
                        </p>
                    )}
                />
            </div>
        </div>
    );
};

export default TypeChoose;

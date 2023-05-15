import {useContext} from 'react';
import Radio from '@/shared/ui/radio';
import {CtxNewDeposit} from '../../../model/context';
import $const from '@/shared/config/coins/constants';
import InputCurrency from '@/shared/ui/input-currency';
import {DepositType} from '@/shared/config/deposits/types';
import TypeDescriptions from '@/shared/config/deposits/deposit-type';
import {storeListAvailableBalance} from '@/shared/store/crypto-assets';

const TypeChoose = () => {
    const {
        type,
        amount,
        minAmount,
        onAmountChange,
        onDepositTypeChange
    } = useContext(CtxNewDeposit);

    const eurgWallet = storeListAvailableBalance(state =>
        state.defaultListBalance
    )?.find(w => w.currency === $const.EURG);

    return (
        <div className="px-10 pt-10 pb-3 xxl:py-3 xxl:px-4">
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

            <div className="wrapper mb-8 hidden xl:block md:mb-5">
                {TypeDescriptions[type]}
            </div>

            <div className="wrapper w-full mb-5 xl:mb-4 md:mb-0">
                <InputCurrency
                    onChange={(target) => {
                        onAmountChange(+target);
                    }}
                    value={amount}
                    currency={{
                        const: $const.EURG,
                        availableBalance: eurgWallet.free_balance ?? 0,
                        minAmount: minAmount
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

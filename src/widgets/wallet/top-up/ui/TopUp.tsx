import {memo, useContext, useState} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import InputCurrency from '@/shared/ui/input-new/ui';
import {CtxRootData, ICtxCurrencyData} from '@/processes/RootContext';


const TopUp = memo(() => {

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const {currency} = useContext(CtxWalletData),
        // isEURG = currency === "EURG",
        formBank = Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3

    const [value, setValue] = useState<string>();
    const {currencies} = useContext(CtxRootData);
    const [cur, setCur] = useState<ICtxCurrencyData>(null);

    const validator = (value: string) => {
        switch (true) {
            case value === '':
                return <span className="text-green md:text-xs">
                    The minimum amount is 1000 EURG
                </span>

            case +value < 1000:
                return <span className="text-red-main md:text-xs">
                    The minimum amount is 1000 EURG
                </span>

            case +value > 2500:
                return <span className="text-red-main md:text-xs">
                    The maximun amount is 2500 EURG
                </span>
    
            default:
                return <span className="text-green md:text-xs">
                    The minimum amount is 1000 EURG
                </span>
        }
    }

    return (<div className="wrapper">
        {loading ? <Loader/> :
            <>
                <div className='mb-20'>
                    <InputCurrency.CurrencySelector
                        onCurrencyChange={(cur: string) => {
                            setCur(currencies.get(cur));
                        }}
                    >
                        <InputCurrency.Validator
                            value={value}
                            validator={validator}
                        >
                            <InputCurrency.PercentSelector
                                onSelect={setValue}
                                header={"Input"}
                                currencyData={cur}
                            >
                                <InputCurrency.Balance currencyData={cur}>
                                    <InputCurrency
                                        value={value}
                                        currencyData={cur}
                                        onChange={value =>
                                            setValue(value)
                                        }
                                    />
                                </InputCurrency.Balance>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </InputCurrency.CurrencySelector>
                </div>

                <ChoseNetwork/>
                <>{formBank ? <GekkardAccount/> :
                    <TopUpQR/>
                }</>
            </>
        }
    </div>)

})

export default TopUp;

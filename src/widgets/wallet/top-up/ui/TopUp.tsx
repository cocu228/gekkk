import {memo, useContext, useState} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import InputCurrency from '@/shared/ui/input-new/ui';
import {CtxRootData, ICtxCurrencyData} from '@/processes/RootContext';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import {Between, GreatherThan, LowerThan} from '@/shared/config/validators';


const TopUp = memo(() => {

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const {currency} = useContext(CtxWalletData),
        // isEURG = currency === "EURG",
        formBank = Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3

    const [value, setValue] = useState<string>();
    const {currencies} = useContext(CtxRootData);
    const [cur, setCur] = useState<ICtxCurrencyData>(null);

    return (<div className="wrapper">
        {loading ? <Loader/> :
            <>
                <div className='mb-20'>
                    <InputCurrency.CurrencySelector
                        allowedFlags={[
                            CurrencyFlags.AccountAvailable
                        ]}
                        onCurrencyChange={(cur: string) => {
                            setCur(currencies.get(cur));
                        }}
                    >
                        <InputCurrency.Validator
                            value={value}
                            description='The minimum amount is 1000 EURG'
                            validators={[
                                Between(0, 100)
                                // ALTERNATIVE VARIANT
                                //LowerThan(100),
                                //GreatherThan(0),
                            ]}
                        >
                            <InputCurrency.PercentSelector
                                onSelect={setValue}
                                header={"Input"}
                                currencyData={cur}
                            >
                                <InputCurrency.Balance currencyData={cur}>
                                    <InputCurrency
                                        disabled={!cur}
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

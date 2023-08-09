import {memo, SetStateAction, useContext, useState} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import InputCurrency from '@/shared/ui/input-new/ui';
import {CtxRootData, ICtxCurrencyData} from '@/processes/RootContext';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import {MaximumAmount, MinimumAmount, ValidateBalance} from '@/shared/config/validators';


const TopUp = memo(() => {

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletData),
        formBank = Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3

    const [value, setValue] = useState<string>("");

    return (<div className="wrapper">
        {loading ? <Loader/> :
            <>
                <div className='mb-20'>
                    <InputCurrency.Validator
                        value={value}>
                        <InputCurrency.PercentSelector onSelect={setValue}
                                                       header={"Input"}
                                                       currency={currency}>

                            <InputCurrency.DisplayBalance currency={currency}>
                                <InputCurrency
                                    value={value}
                                    currency={currency.$const}
                                    onChange={v =>
                                            setValue(v)
                                        }
                                    />
                                </InputCurrency.DisplayBalance>

                        </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
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

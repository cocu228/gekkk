import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from './WithdrawForm';
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks} from '../../model/context';
import {formTypeSelect, getNetworkForChose} from "@/widgets/wallet/model/helpers";
import FiatFormWithdraw from "@/widgets/wallet/fiat-currency/FiatFormWithdraw";

const Withdraw = () => {
    // const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const formType = formTypeSelect(getNetworkForChose(networksDefault, networkIdSelect)?.network_type)

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>

                {formType === "interior" ?
                    <GekkardAccount withdraw/>

                    : formType === "crypto" ?
                        <WithdrawForm/> :
                        <FiatFormWithdraw/>}

            </>}
        </div>
    );
};

export default Withdraw;

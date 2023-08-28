import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from '../../top-up-withdraw-forms/ui/withdraw-token-form/WithdrawForm';
import GekkardAccountForm from "@/widgets/wallet/top-up-withdraw-forms/ui/gekkard-account-form/GekkardAccountForm";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks} from '../../model/context';
import {formTypeSelect, getNetworkForChose} from "@/widgets/wallet/model/helpers";
import FiatFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-fiat-form/FiatFormWithdraw";

const Withdraw = () => {
    // const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const formType = formTypeSelect(getNetworkForChose(networksDefault, networkIdSelect)?.network_type)

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>

                {formType === "interior" ?
                    <GekkardAccountForm withdraw/>

                    : formType === "crypto" ?
                        <WithdrawForm/> :
                        <FiatFormWithdraw/>}

            </>}
        </div>
    );
};

export default Withdraw;
